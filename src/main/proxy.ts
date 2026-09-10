/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2026 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import * as dgram from "dgram";
import { app, session } from "electron";
import { Server as NetServer, Socket as NetSocket } from "net";

import { Settings } from "./settings";

const PROXY_PORT = 3128;
const SOCKS5_PORT = 3129;

// Fragmentation profiles
const FRAG_PROFILES = {
    FragA: {
        // First TLS record split: [6, 98, 1] with 0ms delay
        // Subsequent packets: [114, 1] with 1ms delay
        firstChunks: [6, 98, 1],
        subsequentChunks: [114, 1],
        firstDelay: 0,
        subsequentDelay: 1
    },
    FragB: {
        // First TLS record split: [0, 104, 1] with 0ms delay
        // Subsequent packets: [114, 1] with 1ms delay
        firstChunks: [0, 104, 1],
        subsequentChunks: [114, 1],
        firstDelay: 0,
        subsequentDelay: 1
    }
};

interface FragmentationState {
    isFirstWrite: boolean;
    profile: typeof FRAG_PROFILES.FragA | typeof FRAG_PROFILES.FragB;
}

/**
 * Apply TCP fragmentation to outgoing data
 * This splits the TLS ClientHello into specific chunk sizes to bypass DPI
 */
async function applyFragmentation(socket: NetSocket, data: Buffer, state: FragmentationState): Promise<void> {
    const { profile, isFirstWrite } = state;

    if (!isFirstWrite) {
        // For subsequent writes, just pass through normally after initial fragmentation
        socket.write(data);
        return;
    }

    state.isFirstWrite = false;

    // Determine which chunk pattern to use based on whether this is the first TLS record
    const chunks = isFirstWrite ? profile.firstChunks : profile.subsequentChunks;
    const baseDelay = isFirstWrite ? profile.firstDelay : profile.subsequentDelay;

    let offset = 0;

    for (let i = 0; i < chunks.length; i++) {
        const chunkSize = chunks[i];

        if (chunkSize === 0) {
            // Zero-length chunk - send empty buffer to trigger TCP ACK
            socket.write(Buffer.alloc(0));
        } else {
            const end = Math.min(offset + chunkSize, data.length);
            if (offset < data.length) {
                const chunk = data.slice(offset, end);
                socket.write(chunk);
                offset = end;
            }
        }

        // Apply delay between chunks to ensure separate TCP packets
        if (i < chunks.length - 1 && baseDelay > 0) {
            await new Promise(resolve => setTimeout(resolve, baseDelay));
        }
    }

    // Send any remaining data that didn't fit in the fragmentation pattern
    if (offset < data.length) {
        socket.write(data.slice(offset));
    }
}

/**
 * Resolve hostname using Vesktop's existing DoH settings
 * Falls back to system DNS if DoH is disabled
 */
async function resolveHostname(hostname: string): Promise<string> {
    // Check if DoH is enabled in settings
    const dohEnabled = Settings.store.enableDoh;
    const { dohUrl } = Settings.store;

    if (dohEnabled && dohUrl) {
        try {
            // Use Electron's built-in DNS resolution which respects DoH settings
            // The app.configureHostResolver already sets up DoH at the app level
            const addresses = await net.lookup(hostname);
            if (addresses && typeof addresses === "object" && "address" in addresses) {
                return addresses.address as string;
            }
        } catch (err) {
            console.error("[VesktopProxy] DoH resolution failed, falling back to system DNS:", err);
        }
    }

    // Fallback to system DNS
    return hostname;
}

/**
 * Create HTTP CONNECT proxy server for TCP traffic
 * This intercepts HTTPS/WSS connections and applies fragmentation to TLS handshakes
 */
export function createHttpProxy(): NetServer {
    const server = net.createServer();

    server.on("connection", (clientSocket: NetSocket) => {
        let remoteSocket: NetSocket | null = null;
        let fragmentationState: FragmentationState | null = null;
        let targetHost = "";

        clientSocket.setNoDelay(true);

        const cleanup = () => {
            if (remoteSocket) {
                remoteSocket.destroy();
                remoteSocket = null;
            }
            clientSocket.destroy();
        };

        clientSocket.once("data", async (data: Buffer) => {
            const requestStr = data.toString("utf8");
            const lines = requestStr.split("\r\n");
            const firstLine = lines[0];

            // Parse HTTP CONNECT request
            const connectMatch = firstLine.match(/^CONNECT\s+([^\s]+):(\d+)\s+HTTP\/1\.[01]$/i);

            if (!connectMatch) {
                clientSocket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
                return;
            }

            targetHost = connectMatch[1];
            const targetPort = parseInt(connectMatch[2], 10);

            // Send 200 OK response to client
            clientSocket.write("HTTP/1.1 200 Connection Established\r\n\r\n");

            try {
                // Resolve hostname using DoH if enabled
                const resolvedHost = await resolveHostname(targetHost);

                // Create connection to remote server
                remoteSocket = net.createConnection({
                    host: resolvedHost,
                    port: targetPort
                });

                remoteSocket.setNoDelay(true);

                // Initialize fragmentation state for this connection
                const fragProfile = Settings.store.fragProfile || "FragA";
                fragmentationState = {
                    isFirstWrite: true,
                    profile: FRAG_PROFILES[fragProfile as keyof typeof FRAG_PROFILES] || FRAG_PROFILES.FragA
                };

                remoteSocket.on("error", (err: any) => {
                    console.error("[VesktopProxy] Remote socket error:", err.message);
                    cleanup();
                });

                remoteSocket.on("close", () => {
                    cleanup();
                });

                // Forward data from remote to client
                remoteSocket.on("data", (remoteData: Buffer) => {
                    if (!clientSocket.destroyed) {
                        clientSocket.write(remoteData);
                    }
                });

                // Forward data from client to remote with fragmentation
                clientSocket.on("data", async (clientData: Buffer) => {
                    if (!remoteSocket || remoteSocket.destroyed) return;

                    // Only apply fragmentation if enabled and this is a TLS connection (port 443)
                    if (Settings.store.enableFragmentation && targetPort === 443 && fragmentationState) {
                        try {
                            await applyFragmentation(remoteSocket, clientData, fragmentationState);
                        } catch (err) {
                            console.error("[VesktopProxy] Fragmentation error:", err);
                            remoteSocket.write(clientData);
                        }
                    } else {
                        remoteSocket.write(clientData);
                    }
                });

                clientSocket.on("error", (err: any) => {
                    if (err.code !== "ECONNRESET" && err.code !== "EPIPE") {
                        console.error("[VesktopProxy] Client socket error:", err.message);
                    }
                    cleanup();
                });

                clientSocket.on("close", () => {
                    cleanup();
                });
            } catch (err) {
                console.error("[VesktopProxy] Connection error:", err);
                clientSocket.end("HTTP/1.1 502 Bad Gateway\r\n\r\n");
            }
        });

        clientSocket.on("error", (err: any) => {
            if (err.code !== "ECONNRESET" && err.code !== "EPIPE") {
                console.error("[VesktopProxy] Initial socket error:", err.message);
            }
            cleanup();
        });

        clientSocket.on("timeout", () => {
            cleanup();
        });
    });

    server.on("error", (err: any) => {
        console.error("[VesktopProxy] Proxy server error:", err);
    });

    return server;
}

/**
 * UDP Noise Generator for WebRTC/Voice traffic
 * Sends dummy UDP packets to bypass UDP-based filtering
 */
class UdpNoiseGenerator {
    private client: dgram.Socket;
    private isActive = false;
    private readonly packetSizeMin = 1200;
    private readonly packetSizeMax = 1230;
    private readonly packetCount = 24;
    private readonly packetDelay = 10;

    constructor() {
        this.client = dgram.createSocket("udp4");
        this.client.on("error", err => {
            console.error("[VesktopProxy] UDP noise error:", err);
        });
    }

    /**
     * Generate random payload for UDP noise packet
     */
    private generateRandomPayload(): Buffer {
        const size = Math.floor(Math.random() * (this.packetSizeMax - this.packetSizeMin + 1)) + this.packetSizeMin;
        return Buffer.alloc(size, 0, "hex"); // Random hex data
    }

    /**
     * Send noise packets before actual UDP traffic
     */
    async sendNoise(targetHost: string, targetPort: number): Promise<void> {
        if (!Settings.store.enableUdpNoise) {
            return;
        }

        if (this.isActive) {
            return; // Prevent concurrent noise generation
        }

        this.isActive = true;

        try {
            const resolvedHost = await resolveHostname(targetHost);

            for (let i = 0; i < this.packetCount; i++) {
                const payload = this.generateRandomPayload();

                await new Promise<void>((resolve, reject) => {
                    this.client.send(payload, targetPort, resolvedHost, err => {
                        if (err) reject(err);
                        else resolve();
                    });
                });

                // Delay between packets
                if (i < this.packetCount - 1) {
                    await new Promise(resolve => setTimeout(resolve, this.packetDelay));
                }
            }

            console.log("[VesktopProxy] UDP noise sent to", targetHost, ":", targetPort);
        } catch (err) {
            console.error("[VesktopProxy] UDP noise generation failed:", err);
        } finally {
            this.isActive = false;
        }
    }

    destroy() {
        this.client.close();
    }
}

/**
 * Create SOCKS5 proxy server for UDP ASSOCIATE support
 * This handles WebRTC UDP traffic and applies noise generation
 */
export function createSocks5Proxy(): NetServer {
    const udpNoise = new UdpNoiseGenerator();
    const server = net.createServer();

    server.on("connection", (clientSocket: NetSocket) => {
        let udpSocket: dgram.Socket | null = null;
        let stage = 0; // 0: greeting, 1: request, 2: connected

        clientSocket.setNoDelay(true);

        const cleanup = () => {
            if (udpSocket) {
                udpSocket.close();
                udpSocket = null;
            }
            clientSocket.destroy();
        };

        clientSocket.on("data", async (data: Buffer) => {
            try {
                if (stage === 0) {
                    // SOCKS5 greeting
                    if (data[0] !== 0x05) {
                        clientSocket.end();
                        return;
                    }

                    const methodsCount = data[1];
                    const methods = data.slice(2, 2 + methodsCount);

                    // Accept no authentication (0x00)
                    clientSocket.write(Buffer.from([0x05, 0x00]));
                    stage = 1;
                } else if (stage === 1) {
                    // SOCKS5 request
                    if (data[0] !== 0x05) {
                        clientSocket.end();
                        return;
                    }

                    const cmd = data[1];
                    const addrType = data[3];

                    let host: string;
                    let offset = 4;

                    // Parse address based on type
                    if (addrType === 0x01) {
                        // IPv4
                        host = `${data[offset]}.${data[offset + 1]}.${data[offset + 2]}.${data[offset + 3]}`;
                        offset += 4;
                    } else if (addrType === 0x03) {
                        // Domain name
                        const domainLen = data[offset];
                        host = data.slice(offset + 1, offset + 1 + domainLen).toString("ascii");
                        offset += 1 + domainLen;
                    } else if (addrType === 0x04) {
                        // IPv6
                        const parts: number[] = [];
                        for (let i = 0; i < 16; i++) {
                            parts.push(data[offset + i]);
                        }
                        host = parts
                            .map((b, i) => (i % 2 === 0 ? b.toString(16) : b.toString(16).padStart(2, "0")))
                            .join(":");
                        offset += 16;
                    } else {
                        clientSocket.end();
                        return;
                    }

                    const port = (data[offset] << 8) | data[offset + 1];

                    if (cmd === 0x01) {
                        // CONNECT
                        // TCP connection - not handled here, would need additional logic
                        clientSocket.end();
                    } else if (cmd === 0x03) {
                        // UDP ASSOCIATE
                        // Create UDP association
                        udpSocket = dgram.createSocket("udp4");

                        udpSocket.on("listening", () => {
                            const address = udpSocket!.address();
                            const reply = Buffer.from([
                                0x05,
                                0x00,
                                0x00, // Version, success, reserved
                                0x01, // IPv4
                                0x00,
                                0x00,
                                0x00,
                                0x00, // Bind address (0.0.0.0)
                                (address.port >> 8) & 0xff, // Port high byte
                                address.port & 0xff // Port low byte
                            ]);
                            clientSocket.write(reply);
                        });

                        udpSocket.on("message", (msg, rinfo) => {
                            // Forward UDP data to target
                            // Apply noise before first packet if enabled
                            if (Settings.store.enableUdpNoise && Settings.store.enableFragmentation) {
                                udpNoise.sendNoise(host, port).then(() => {
                                    udpSocket!.send(msg, port, host);
                                });
                            } else {
                                udpSocket!.send(msg, port, host);
                            }
                        });

                        udpSocket.on("error", (err: any) => {
                            console.error("[VesktopProxy] UDP association error:", err);
                            cleanup();
                        });

                        // Client will send UDP data to the bound address
                        stage = 2;
                    } else {
                        clientSocket.end();
                    }
                } else if (stage === 2) {
                    // Already in UDP ASSOCIATE mode, ignore further TCP data
                    // UDP data goes through the UDP socket
                }
            } catch (err: any) {
                console.error("[VesktopProxy] SOCKS5 handling error:", err);
                cleanup();
            }
        });

        clientSocket.on("error", (err: any) => {
            if (err.code !== "ECONNRESET" && err.code !== "EPIPE") {
                console.error("[VesktopProxy] SOCKS5 client error:", err.message);
            }
            cleanup();
        });

        clientSocket.on("close", () => {
            cleanup();
        });

        clientSocket.on("timeout", () => {
            cleanup();
        });
    });

    server.on("error", err => {
        console.error("[VesktopProxy] SOCKS5 server error:", err);
    });

    server.on("close", () => {
        udpNoise.destroy();
    });

    return server;
}

/**
 * Start the local proxy servers
 * Called during app initialization
 */
let httpProxyServer: NetServer | null = null;
let socks5ProxyServer: NetServer | null = null;

export function startProxy() {
    // Clean up any existing servers
    stopProxy();

    // Start HTTP CONNECT proxy for TCP traffic with fragmentation
    httpProxyServer = createHttpProxy();
    httpProxyServer.listen(PROXY_PORT, "127.0.0.1", () => {
        console.log(`[VesktopProxy] HTTP CONNECT proxy started on port ${PROXY_PORT}`);
    });

    // Start SOCKS5 proxy for UDP traffic with noise generation
    socks5ProxyServer = createSocks5Proxy();
    socks5ProxyServer.listen(SOCKS5_PORT, "127.0.0.1", () => {
        console.log(`[VesktopProxy] SOCKS5 proxy started on port ${SOCKS5_PORT}`);
    });
}

/**
 * Stop the local proxy servers
 * Called during app shutdown
 */
export function stopProxy() {
    if (httpProxyServer) {
        httpProxyServer.close();
        httpProxyServer = null;
    }
    if (socks5ProxyServer) {
        socks5ProxyServer.close();
        socks5ProxyServer = null;
    }
}

/**
 * Get the proxy URL for Electron's session configuration
 */
export function getProxyUrl(): string {
    if (Settings.store.enableFragmentation || Settings.store.enableUdpNoise) {
        return `http://127.0.0.1:${PROXY_PORT}`;
    }
    return "";
}

/**
 * Apply proxy settings to Electron session
 * This routes all traffic through our local proxy when fragmentation/noise is enabled
 */
export function applyProxySettings() {
    if (!app.isReady()) return;

    const proxyUrl = getProxyUrl();

    if (proxyUrl) {
        // Set proxy for default session
        const ses = session.defaultSession;
        ses.setProxy({ proxyRules: proxyUrl })
            .then(() => {
                console.log("[VesktopProxy] Proxy applied to Electron session");
            })
            .catch(err => {
                console.error("[VesktopProxy] Failed to apply proxy:", err);
            });
    } else {
        // Remove proxy if disabled
        const ses = session.defaultSession;
        ses.setProxy({ proxyRules: "" })
            .then(() => {
                console.log("[VesktopProxy] Proxy removed from Electron session");
            })
            .catch(err => {
                console.error("[VesktopProxy] Failed to remove proxy:", err);
            });
    }
}

// Listen for settings changes
if (typeof Settings.addChangeListener === "function") {
    Settings.addChangeListener("enableFragmentation", () => {
        applyProxySettings();
    });
    Settings.addChangeListener("enableUdpNoise", () => {
        applyProxySettings();
    });
    Settings.addChangeListener("fragProfile", () => {
        // Profile change doesn't require proxy restart, it's applied per-connection
    });
}
