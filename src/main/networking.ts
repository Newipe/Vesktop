/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import * as dns from "dns";
import { app, net, session } from "electron";
import * as netModule from "net";
import { promisify } from "util";

import { Settings } from "./settings";
import { createConnectionWithFragmentation, parseFragmentInterval, parseFragmentLength } from "./tlsFragmentation";

const resolveDns = promisify(dns.resolve);
const resolveDns4 = promisify(dns.resolve4);
const resolveDns6 = promisify(dns.resolve6);

interface DohResponse {
    Answer?: Array<{
        data: string;
        type: number;
        TTL?: number;
    }>;
    Question?: Array<{
        name: string;
        type: number;
    }>;
    Status: number;
}

/**
 * Check if a system proxy is configured in Electron's session.
 * Returns true if a proxy is actively configured.
 */
export async function isSystemProxyConfigured(): Promise<boolean> {
    try {
        const ses = session.defaultSession;
        // Try to get proxy configuration - if there's a pac script or proxy rules, return true
        const proxyConfig = await ses.resolveProxy("https://discord.com");
        // If proxy returns something other than "DIRECT", a proxy is configured
        return proxyConfig !== "DIRECT";
    } catch (e) {
        // If we can't determine, assume no proxy for safety
        console.log("[Networking] Could not determine proxy status, assuming no proxy:", e);
        return false;
    }
}

/**
 * Resolve a hostname using DNS over HTTPS.
 * Returns the resolved IP addresses or null on failure.
 */
export async function resolveThroughDoH(hostname: string): Promise<string[] | null> {
    const { dohUrl } = Settings.store;
    if (!Settings.store.enableDoh || !dohUrl) {
        return null;
    }

    try {
        const url = `${dohUrl}?name=${encodeURIComponent(hostname)}&type=A`;
        const response = await net.fetch(url, {
            headers: {
                Accept: "application/dns-json"
            }
        });

        if (!response.ok) {
            console.log(`[Networking] DoH query failed with status ${response.status}`);
            return null;
        }

        const data: DohResponse = await response.json();

        if (data.Status !== 0) {
            console.log(`[Networking] DoH returned error status: ${data.Status}`);
            return null;
        }

        const answers = data.Answer?.filter(a => a.type === 1) || []; // Type 1 = A record
        const ips = answers.map(a => a.data);

        if (ips.length === 0) {
            // Try AAAA records for IPv6
            const url6 = `${dohUrl}?name=${encodeURIComponent(hostname)}&type=AAAA`;
            const response6 = await net.fetch(url6, {
                headers: {
                    Accept: "application/dns-json"
                }
            });

            if (response6.ok) {
                const data6: DohResponse = await response6.json();
                const answers6 = data6.Answer?.filter(a => a.type === 28) || []; // Type 28 = AAAA record
                return answers6.map(a => a.data);
            }
            return null;
        }

        return ips;
    } catch (e) {
        console.log(`[Networking] DoH resolution failed:`, e);
        return null;
    }
}

/**
 * Get connection settings for Discord based on current configuration.
 * Returns information about how to establish the connection.
 */
export interface ConnectionSettings {
    useSystemProxy: boolean;
    useDoH: boolean;
    useTlsFragmentation: boolean;
    resolvedAddress: string | null;
    tlsFragmentConfig?: {
        length: string;
        interval: string;
    };
}

export async function getConnectionSettings(hostname: string): Promise<ConnectionSettings> {
    const systemProxyActive = await isSystemProxyConfigured();

    if (systemProxyActive) {
        console.log("[Networking] System proxy detected, using proxy path");
        return {
            useSystemProxy: true,
            useDoH: false,
            useTlsFragmentation: false,
            resolvedAddress: null
        };
    }

    const dohEnabled = Settings.store.enableDoh && Settings.store.dohUrl;
    const tlsFragEnabled = Settings.store.tlsFragmentation?.enabled;

    let resolvedAddress: string | null = null;

    if (dohEnabled) {
        const ips = await resolveThroughDoH(hostname);
        if (ips && ips.length > 0) {
            resolvedAddress = ips[0];
            console.log(`[Networking] DoH resolved ${hostname} -> ${resolvedAddress}`);
        } else {
            console.log(`[Networking] DoH failed, will use normal resolution`);
        }
    }

    let useTlsFragmentation = false;
    let tlsFragmentConfig: { length: string; interval: string } | undefined;

    if (tlsFragEnabled && !systemProxyActive) {
        try {
            const config = Settings.store.tlsFragmentation;
            if (config) {
                // Validate the configuration
                parseFragmentLength(config.length);
                parseFragmentInterval(config.interval);
                useTlsFragmentation = true;
                tlsFragmentConfig = {
                    length: config.length,
                    interval: config.interval
                };
                console.log("[Networking] TLS fragmentation enabled");
            }
        } catch (e) {
            console.log("[Networking] TLS fragmentation config invalid, disabling:", e);
        }
    }

    return {
        useSystemProxy: false,
        useDoH: !!dohEnabled && resolvedAddress !== null,
        useTlsFragmentation,
        resolvedAddress,
        tlsFragmentConfig
    };
}

/**
 * Create a TCP connection to Discord with appropriate settings.
 * This handles DoH resolution and TLS fragmentation.
 */
export async function createDiscordConnection(hostname: string, port: number = 443): Promise<netModule.Socket | null> {
    const settings = await getConnectionSettings(hostname);

    if (settings.useSystemProxy) {
        // System proxy is active - don't create direct connection
        // The Electron session will handle this through its proxy
        console.log("[Networking] Skipping direct connection due to system proxy");
        return null;
    }

    try {
        const socket = await createConnectionWithFragmentation(
            hostname,
            port,
            settings.resolvedAddress,
            settings.useTlsFragmentation,
            settings.tlsFragmentConfig || { length: "50-100", interval: "10-20" },
            IS_DEV ? msg => console.log(`[TLS Frag] ${msg}`) : undefined
        );

        return socket;
    } catch (e) {
        console.log("[Networking] Failed to create connection:", e);
        return null;
    }
}

/**
 * Initialize networking features (DoH, etc.)
 */
export function initNetworking() {
    applyDohSettings();

    // Set up change listeners
    Settings.addChangeListener("enableDoh", applyDohSettings);
    Settings.addChangeListener("dohUrl", applyDohSettings);
}

/**
 * Apply DoH settings to Electron's host resolver.
 */
function applyDohSettings() {
    if (!app.isReady()) return;

    if (Settings.store.enableDoh && Settings.store.dohUrl) {
        app.configureHostResolver({
            secureDnsMode: "secure",
            secureDnsServers: [Settings.store.dohUrl]
        });
        console.log("[Networking] DoH enabled:", Settings.store.dohUrl);
    } else {
        app.configureHostResolver({
            secureDnsMode: "automatic"
        });
        console.log("[Networking] DoH disabled, using automatic mode");
    }
}
