/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { net } from "electron";
import * as fs from "fs";
import * as netModule from "net";
import * as tls from "tls";

/**
 * Parse a fragment length configuration string.
 * Accepts formats like "50" or "50-100".
 * Returns [min, max] where min <= max.
 */
export function parseFragmentLength(config: string): [number, number] {
    const trimmed = config.trim();
    if (!/^\d+(-\d+)?$/.test(trimmed)) {
        throw new Error(`Invalid fragment length format: ${config}`);
    }

    const parts = trimmed.split("-").map(Number);
    if (parts.length === 1) {
        return [parts[0], parts[0]];
    }

    const [min, max] = parts;
    if (min > max) {
        throw new Error(`Invalid fragment length range: ${min}-${max} (min > max)`);
    }
    if (min < 1 || max > 65535) {
        throw new Error(`Fragment length out of valid range (1-65535): ${config}`);
    }

    return [min, max];
}

/**
 * Parse a fragment interval configuration string.
 * Accepts formats like "10" or "10-20".
 * Returns [min, max] in milliseconds.
 */
export function parseFragmentInterval(config: string): [number, number] {
    const trimmed = config.trim();
    if (!/^\d+(-\d+)?$/.test(trimmed)) {
        throw new Error(`Invalid fragment interval format: ${config}`);
    }

    const parts = trimmed.split("-").map(Number);
    if (parts.length === 1) {
        return [parts[0], parts[0]];
    }

    const [min, max] = parts;
    if (min > max) {
        throw new Error(`Invalid fragment interval range: ${min}-${max} (min > max)`);
    }
    if (min < 0 || max > 10000) {
        throw new Error(`Fragment interval out of valid range (0-10000ms): ${config}`);
    }

    return [min, max];
}

/**
 * Validate TLS Fragmentation configuration.
 * Returns true if valid, throws error with message if invalid.
 */
export function validateTlsFragmentConfig(config: {
    enabled: boolean;
    packets: string;
    length: string;
    interval: string;
}): void {
    if (!config.enabled) return;

    if (config.packets !== "tlshello") {
        throw new Error(`Invalid packets type: ${config.packets}. Must be "tlshello"`);
    }

    // Validate length
    parseFragmentLength(config.length);

    // Validate interval
    parseFragmentInterval(config.interval);
}

/**
 * Random integer between min and max (inclusive).
 */
function randomInt(min: number, max: number): number {
    if (min === max) return min;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Check if buffer looks like a TLS ClientHello record.
 * TLS record structure:
 *   - Byte 0: Content type (0x16 = Handshake)
 *   - Bytes 1-2: Version (0x0301 for TLS 1.0+, typically 0x0303 for TLS 1.2)
 *   - Bytes 3-4: Length
 *   - Byte 5: Handshake type (0x01 = ClientHello)
 */
function isTlsClientHello(buffer: Buffer): boolean {
    if (buffer.length < 5) return false;

    const contentType = buffer[0];
    const handshakeType = buffer[5];

    // Content type 0x16 = Handshake protocol
    // Handshake type 0x01 = ClientHello
    return contentType === 0x16 && handshakeType === 0x01;
}

/**
 * Get the full length of the TLS ClientHello record from the buffer.
 * Returns -1 if not a valid ClientHello or if we don't have enough data yet.
 */
function getTlsClientHelloLength(buffer: Buffer): number {
    if (buffer.length < 5) return -1;

    const contentType = buffer[0];
    if (contentType !== 0x16) return -1; // Not a handshake record

    // Read record length (bytes 3-4, big-endian)
    const recordLength = (buffer[3] << 8) | buffer[4];

    // Total record size = header (5 bytes) + record payload
    return 5 + recordLength;
}

interface TlsFragmentConfig {
    lengthMin: number;
    lengthMax: number;
    intervalMin: number;
    intervalMax: number;
}

/**
 * Send TLS ClientHello with fragmentation.
 * Buffers incoming data until we have a complete ClientHello,
 * then sends it in fragments according to the configuration.
 * After the ClientHello is sent, switches to normal streaming.
 *
 * @param socket The TCP socket to write to
 * @param config Fragmentation configuration
 * @param logger Optional logging function for debug output
 * @returns A duplex stream that handles the fragmentation
 */
export function createTlsHelloFragmentStream(
    socket: netModule.Socket,
    config: TlsFragmentConfig,
    logger?: (msg: string) => void
): netModule.Socket {
    const log = logger || (() => {});

    const clientSocket = new netModule.Socket();
    let helloBuffer: Buffer | null = null;
    let expectedHelloLength = -1;
    let isFragmenting = true;
    let hasSwitchedToNormal = false;

    // Handle data from the "client" side (application)
    clientSocket.on("data", (chunk: Buffer) => {
        if (!isFragmenting) {
            // Normal streaming mode - just forward everything
            socket.write(chunk);
            return;
        }

        // Buffer the incoming data
        if (helloBuffer === null) {
            helloBuffer = chunk;
        } else {
            helloBuffer = Buffer.concat([helloBuffer, chunk]);
        }

        // Check if we now have a complete ClientHello
        if (expectedHelloLength < 0 && isTlsClientHello(helloBuffer)) {
            expectedHelloLength = getTlsClientHelloLength(helloBuffer);
            log(`TLS ClientHello detected, expected length: ${expectedHelloLength} bytes`);
        }

        // If we have the complete ClientHello, fragment and send it
        if (expectedHelloLength > 0 && helloBuffer.length >= expectedHelloLength) {
            log(`TLS fragmentation enabled, fragmenting ClientHello...`);

            const helloData = helloBuffer.slice(0, expectedHelloLength);
            const remainingData = helloBuffer.length > expectedHelloLength ? helloBuffer.slice(expectedHelloLength) : null;

            // Fragment the ClientHello
            fragmentAndSend(helloData, socket, config, log, () => {
                log(`TLS fragmentation completed`);
                isFragmenting = false;
                hasSwitchedToNormal = true;

                // Send any remaining data that came after the ClientHello
                if (remainingData && remainingData.length > 0) {
                    socket.write(remainingData);
                }
            });

            helloBuffer = null;
            expectedHelloLength = -1;
        }
    });

    // Forward data from server to client
    socket.on("data", (chunk: Buffer) => {
        if (clientSocket.writable) {
            clientSocket.write(chunk);
        }
    });

    // Handle connection events
    socket.on("close", () => {
        if (!clientSocket.destroyed) {
            clientSocket.destroy();
        }
    });

    socket.on("error", (err) => {
        clientSocket.destroy(err);
    });

    clientSocket.on("error", (err) => {
        socket.destroy(err);
    });

    socket.on("end", () => {
        if (!clientSocket.destroyed) {
            clientSocket.push(null);
        }
    });

    clientSocket.on("end", () => {
        if (!socket.destroyed) {
            socket.end();
        }
    });

    return clientSocket;
}

/**
 * Fragment and send the ClientHello buffer.
 */
async function fragmentAndSend(
    data: Buffer,
    socket: netModule.Socket,
    config: TlsFragmentConfig,
    log: (msg: string) => void,
    onComplete: () => void
): Promise<void> {
    let offset = 0;

    while (offset < data.length) {
        const fragmentSize = randomInt(config.lengthMin, config.lengthMax);
        const fragment = data.slice(offset, offset + fragmentSize);

        log(`Sending fragment ${offset}/${data.length}, size=${fragment.length}`);

        try {
            const written = socket.write(fragment);

            // If the buffer is full, wait for drain
            if (!written) {
                await new Promise<void>((resolve) => {
                    socket.once("drain", resolve);
                });
            }

            offset += fragment.length;

            // Add delay between fragments (but not after the last one)
            if (offset < data.length) {
                const delay = randomInt(config.intervalMin, config.intervalMax);
                if (delay > 0) {
                    await sleep(delay);
                }
            }
        } catch (err) {
            log(`Error sending fragment: ${err}`);
            throw err;
        }
    }

    onComplete();
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create a TCP connection with optional TLS ClientHello fragmentation.
 * This is the main entry point for establishing connections.
 *
 * @param host The hostname to connect to (for SNI/TLS identity)
 * @param port The port to connect to
 * @param resolvedAddress The IP address resolved through DoH (or null for normal resolution)
 * @param useFragmentation Whether to apply TLS ClientHello fragmentation
 * @param fragmentConfig The fragmentation configuration
 * @param logger Optional logging function
 * @returns A socket-like object for communication
 */
export async function createConnectionWithFragmentation(
    host: string,
    port: number,
    resolvedAddress: string | null,
    useFragmentation: boolean,
    fragmentConfig: { length: string; interval: string },
    logger?: (msg: string) => void
): Promise<netModule.Socket> {
    const log = logger || (() => {});

    return new Promise((resolve, reject) => {
        const connectHost = resolvedAddress || host;
        log(`Connecting to ${connectHost}:${port} (host: ${host})`);

        const socket = new netModule.Socket();

        socket.connect({
            host: connectHost,
            port: port
        }, () => {
            log(`TCP connection established to ${connectHost}:${port}`);

            if (useFragmentation) {
                try {
                    const [lengthMin, lengthMax] = parseFragmentLength(fragmentConfig.length);
                    const [intervalMin, intervalMax] = parseFragmentInterval(fragmentConfig.interval);

                    const config: TlsFragmentConfig = {
                        lengthMin,
                        lengthMax,
                        intervalMin,
                        intervalMax
                    };

                    const fragmentStream = createTlsHelloFragmentStream(socket, config, log);
                    resolve(fragmentStream);
                } catch (err) {
                    log(`Failed to set up TLS fragmentation: ${err}`);
                    // Fall back to normal socket on error
                    resolve(socket);
                }
            } else {
                resolve(socket);
            }
        });

        socket.on("error", reject);

        // Timeout after 30 seconds
        socket.setTimeout(30000);
        socket.on("timeout", () => {
            socket.destroy(new Error("Connection timeout"));
            reject(new Error("Connection timeout"));
        });
    });
}
