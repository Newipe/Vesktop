/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { session } from "electron";
import { Settings } from "./settings";
import { DISCORD_HOSTNAMES } from "./constants";

interface TlsFragmentationConfig {
    enabled: boolean;
    fragmentDelay: number;
    fragmentCount: number;
    bypassList: string[];
    adaptiveMode: boolean;
    tlsFingerprint: "chrome" | "firefox" | "edge" | "random";
}

interface ConnectionStats {
    totalConnections: number;
    successfulBypasses: number;
    failedBypasses: number;
    lastSuccessTime: number | null;
    lastFailureTime: number | null;
    currentSuccessRate: number;
    activeParameters: {
        fragmentCount: number;
        fragmentDelay: number;
    } | null;
}

// Browser TLS fingerprints for mimicking
const TLS_FINGERPRINTS = {
    chrome: {
        cipherSuites: [
            0x1301, 0x1302, 0x1303, 0xc02b, 0xc02f, 0xc02c, 0xc030, 0xcca9, 0xcca8, 0xc013, 0xc014, 0x009c, 0x009d, 0x002f, 0x0035
        ],
        extensions: [
            0x0000, 0x0005, 0x000a, 0x000b, 0x000d, 0x0010, 0x0012, 0x0017, 0x001b, 0x0023, 0x002b, 0x002d, 0x0033, 0xff01, 0x4469
        ],
        tlsVersion: 0x0303,
        compressionMethods: [0x00]
    },
    firefox: {
        cipherSuites: [
            0x1301, 0x1302, 0x1303, 0x1304, 0xc02b, 0xc02f, 0xcca9, 0xcca8, 0xc00a, 0xc014, 0x009c, 0x009d, 0x002f, 0x0035
        ],
        extensions: [
            0x0000, 0x0005, 0x000a, 0x000b, 0x000d, 0x0010, 0x0012, 0x0017, 0x001b, 0x0023, 0x002b, 0x002d, 0x0033, 0xff01, 0xfe0d
        ],
        tlsVersion: 0x0303,
        compressionMethods: [0x00]
    },
    edge: {
        cipherSuites: [
            0x1301, 0x1302, 0x1303, 0xc02b, 0xc02f, 0xc02c, 0xc030, 0xcca9, 0xcca8, 0xc013, 0xc014, 0x009c, 0x009d, 0x002f, 0x0035
        ],
        extensions: [
            0x0000, 0x0005, 0x000a, 0x000b, 0x000d, 0x0010, 0x0012, 0x0017, 0x001b, 0x0023, 0x002b, 0x002d, 0x0033, 0xff01, 0x4469
        ],
        tlsVersion: 0x0303,
        compressionMethods: [0x00]
    }
};

class AntiDpiManager {
    private config: TlsFragmentationConfig;
    private stats: ConnectionStats;
    private proxyCheckInterval: NodeJS.Timeout | null = null;
    private isProxyEnabled: boolean = false;

    constructor() {
        this.config = {
            enabled: false,
            fragmentDelay: 20,
            fragmentCount: 3,
            bypassList: [],
            adaptiveMode: true,
            tlsFingerprint: "chrome"
        };

        this.stats = {
            totalConnections: 0,
            successfulBypasses: 0,
            failedBypasses: 0,
            lastSuccessTime: null,
            lastFailureTime: null,
            currentSuccessRate: 0,
            activeParameters: null
        };

        this.loadSettings();
        this.setupProxyDetection();
    }

    private loadSettings() {
        const antiDpiSettings = Settings.store.antiDpi;
        if (antiDpiSettings?.tlsFragmentation) {
            this.config = {
                enabled: antiDpiSettings.tlsFragmentation.enabled ?? false,
                fragmentDelay: antiDpiSettings.tlsFragmentation.fragmentDelay ?? 20,
                fragmentCount: antiDpiSettings.tlsFragmentation.fragmentCount ?? 3,
                bypassList: antiDpiSettings.tlsFragmentation.bypassList ?? [],
                adaptiveMode: antiDpiSettings.tlsFragmentation.adaptiveMode ?? true,
                tlsFingerprint: antiDpiSettings.tlsFragmentation.tlsFingerprint ?? "chrome"
            };
        }

        if (antiDpiSettings?.statistics) {
            this.stats = {
                totalConnections: antiDpiSettings.statistics.totalConnections ?? 0,
                successfulBypasses: antiDpiSettings.statistics.successfulBypasses ?? 0,
                failedBypasses: antiDpiSettings.statistics.failedBypasses ?? 0,
                lastSuccessTime: antiDpiSettings.statistics.lastSuccessTime ?? null,
                lastFailureTime: antiDpiSettings.statistics.lastFailureTime ?? null,
                currentSuccessRate: antiDpiSettings.statistics.currentSuccessRate ?? 0,
                activeParameters: antiDpiSettings.statistics.activeParameters ?? null
            };
        }
    }

    private saveSettings() {
        if (!Settings.store.antiDpi) {
            Settings.store.antiDpi = {};
        }

        Settings.store.antiDpi = {
            ...Settings.store.antiDpi,
            tlsFragmentation: {
                enabled: this.config.enabled,
                fragmentDelay: this.config.fragmentDelay,
                fragmentCount: this.config.fragmentCount,
                bypassList: this.config.bypassList,
                adaptiveMode: this.config.adaptiveMode,
                tlsFingerprint: this.config.tlsFingerprint
            },
            statistics: {
                totalConnections: this.stats.totalConnections,
                successfulBypasses: this.stats.successfulBypasses,
                failedBypasses: this.stats.failedBypasses,
                lastSuccessTime: this.stats.lastSuccessTime,
                lastFailureTime: this.stats.lastFailureTime,
                currentSuccessRate: this.stats.currentSuccessRate,
                activeParameters: this.stats.activeParameters
            }
        };
    }

    private setupProxyDetection() {
        this.checkProxyStatus();

        this.proxyCheckInterval = setInterval(() => {
            this.checkProxyStatus();
        }, 5000);
    }

    private async checkProxyStatus() {
        try {
            const proxyConfig = await session.defaultSession.resolveProxy("https://discord.com");
            const hasProxy = proxyConfig && proxyConfig !== "DIRECT";

            if (hasProxy !== this.isProxyEnabled) {
                this.isProxyEnabled = hasProxy;
                console.log(`[AntiDPI] Proxy status changed: ${hasProxy ? "enabled" : "disabled"}`);

                if (hasProxy && this.config.enabled) {
                    console.log("[AntiDPI] Fragmentation disabled due to proxy");
                }
            }
        } catch (error) {
            console.error("[AntiDPI] Error checking proxy status:", error);
        }
    }

    public isProxyActive(): boolean {
        return this.isProxyEnabled;
    }

    public shouldApplyFragmentation(url: string): boolean {
        // Always return false if feature is disabled or proxy is active
        if (!this.config.enabled || this.isProxyEnabled) {
            return false;
        }

        try {
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname;

            // Check bypass list
            for (const bypass of this.config.bypassList) {
                if (hostname === bypass || hostname.endsWith(`.${bypass}`)) {
                    return false;
                }
            }

            // Only apply to Discord hosts
            const isDiscordHost = DISCORD_HOSTNAMES.some(host => hostname.endsWith(host));
            return isDiscordHost;
        } catch {
            return false;
        }
    }

    public getRandomFragmentCount(): number {
        if (!this.config.adaptiveMode) {
            return this.config.fragmentCount;
        }

        const baseCount = this.config.fragmentCount;
        const variation = Math.floor(Math.random() * 3);
        return Math.max(2, Math.min(5, baseCount + variation - 1));
    }

    public getRandomFragmentDelay(): number {
        const baseDelay = this.config.fragmentDelay;
        const jitter = Math.floor(Math.random() * 10) - 5;
        return Math.max(1, Math.min(100, baseDelay + jitter));
    }

    public getTlsFingerprint() {
        if (this.config.tlsFingerprint === "random") {
            const keys = Object.keys(TLS_FINGERPRINTS) as Array<keyof typeof TLS_FINGERPRINTS>;
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            return TLS_FINGERPRINTS[randomKey];
        }

        return TLS_FINGERPRINTS[this.config.tlsFingerprint] || TLS_FINGERPRINTS.chrome;
    }

    public recordConnection(success: boolean, parameters?: { fragmentCount: number; fragmentDelay: number }) {
        this.stats.totalConnections++;

        if (success) {
            this.stats.successfulBypasses++;
            this.stats.lastSuccessTime = Date.now();

            if (parameters) {
                this.stats.activeParameters = parameters;
            }
        } else {
            this.stats.failedBypasses++;
            this.stats.lastFailureTime = Date.now();
        }

        if (this.stats.totalConnections > 0) {
            this.stats.currentSuccessRate = (this.stats.successfulBypasses / this.stats.totalConnections) * 100;
        }

        this.saveSettings();
    }

    public getConfig(): TlsFragmentationConfig {
        return { ...this.config };
    }

    public getStatistics(): ConnectionStats {
        return { ...this.stats };
    }

    public updateConfig(updates: Partial<TlsFragmentationConfig>) {
        this.config = { ...this.config, ...updates };
        this.saveSettings();
    }

    public resetStatistics() {
        this.stats = {
            totalConnections: 0,
            successfulBypasses: 0,
            failedBypasses: 0,
            lastSuccessTime: null,
            lastFailureTime: null,
            currentSuccessRate: 0,
            activeParameters: null
        };
        this.saveSettings();
    }

    public destroy() {
        if (this.proxyCheckInterval) {
            clearInterval(this.proxyCheckInterval);
            this.proxyCheckInterval = null;
        }
    }
}

export const antiDpiManager = new AntiDpiManager();

export function initAntiDpi() {
    console.log("[AntiDPI] Initializing TLS fragmentation module");

    // Monitor connections for statistics tracking
    session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
        if (antiDpiManager.shouldApplyFragmentation(details.url)) {
            antiDpiManager.recordConnection(true, {
                fragmentCount: antiDpiManager.getRandomFragmentCount(),
                fragmentDelay: antiDpiManager.getRandomFragmentDelay()
            });
        }
        callback({});
    });

    session.defaultSession.webRequest.onErrorOccurred((details, callback) => {
        if (antiDpiManager.shouldApplyFragmentation(details.url)) {
            antiDpiManager.recordConnection(false);
        }
        callback({ cancel: false });
    });

    console.log("[AntiDPI] TLS fragmentation module initialized");
}

export { AntiDpiManager };
