/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Divider, Heading, Margins, Paragraph } from "@vencord/types/components";
import { Forms, Select, SliderInput, TextInput } from "@vencord/types/webpack/common";
import { useEffect, useState } from "react";

import { SimpleErrorBoundary } from "../SimpleErrorBoundary";
import { cl, SettingsComponent } from "./Settings";

interface AntiDpiConfig {
    enabled: boolean;
    fragmentDelay: number;
    fragmentCount: number;
    bypassList: string[];
    adaptiveMode: boolean;
    tlsFingerprint: "chrome" | "firefox" | "edge" | "random";
}

interface AntiDpiStatistics {
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

interface AntiDpiData {
    config: AntiDpiConfig;
    statistics: AntiDpiStatistics;
    isProxyActive: boolean;
}

const TLS_FINGERPRINT_OPTIONS = [
    { label: "Chrome", value: "chrome" },
    { label: "Firefox", value: "firefox" },
    { label: "Edge", value: "edge" },
    { label: "Random (Rotate)", value: "random" }
];

const FRAGMENT_COUNT_OPTIONS = [
    { label: "2 fragments", value: "2" },
    { label: "3 fragments", value: "3" },
    { label: "4 fragments", value: "4" },
    { label: "5 fragments", value: "5" }
];

export const AntiDpi: SettingsComponent = () => {
    const [data, setData] = useState<AntiDpiData | null>(null);
    const [bypassListText, setBypassListText] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        try {
            const result = VesktopNative.antiDpi.getConfig();
            setData(result);
            if (result.config.bypassList) {
                setBypassListText(result.config.bypassList.join("\n"));
            }
        } catch (error) {
            console.error("Failed to load Anti-DPI config:", error);
        }
    };

    const updateConfig = (updates: Partial<AntiDpiConfig>) => {
        if (!data) return;

        try {
            VesktopNative.antiDpi.updateConfig(updates);
            loadData();
        } catch (error) {
            console.error("Failed to update Anti-DPI config:", error);
        }
    };

    const resetStatistics = () => {
        try {
            VesktopNative.antiDpi.resetStatistics();
            loadData();
        } catch (error) {
            console.error("Failed to reset statistics:", error);
        }
    };

    const handleBypassListChange = (value: string) => {
        setBypassListText(value);
    };

    const handleBypassListBlur = () => {
        const domains = bypassListText
            .split("\n")
            .map(d => d.trim())
            .filter(d => d.length > 0);
        updateConfig({ bypassList: domains });
    };

    if (!data) {
        return (
            <div className={cl("category")}>
                <Heading tag="h5">Loading...</Heading>
            </div>
        );
    }

    const { config, statistics, isProxyActive } = data;

    return (
        <SimpleErrorBoundary>
            <div>
                <div style={{ marginBottom: "8px" }}>
                    <Heading tag="h5">TLS Fragmentation (Anti-DPI)</Heading>
                </div>
                <Paragraph className={Margins.bottom8}>
                    Split TLS Client Hello packets to bypass Deep Packet Inspection (DPI). This feature helps bypass
                    SNI filtering and other censorship techniques.
                </Paragraph>

                {isProxyActive && (
                    <Forms.FormNotice
                        styleType="warning"
                        title="System Proxy Active"
                        body="Fragmentation is automatically disabled when a system proxy is detected. Traffic will go through the proxy normally."
                    />
                )}

                <div style={{ marginBottom: "16px" }}>
                    <Forms.FormSwitch
                        title="Enable TLS Fragmentation"
                        note={
                            isProxyActive
                                ? "Currently disabled due to active system proxy"
                                : "Split TLS handshake packets to evade DPI detection"
                        }
                        value={config.enabled && !isProxyActive}
                        onChange={(value: boolean) => updateConfig({ enabled: value })}
                        disabled={isProxyActive}
                    />
                </div>

                <Divider />

                <div style={{ marginTop: "16px", marginBottom: "16px" }}>
                    <Heading tag="h6" style={{ marginBottom: "8px" }}>
                        Fragmentation Settings
                    </Heading>

                    <div style={{ marginBottom: "12px" }}>
                        <Forms.FormTitle tag="label">Fragment Count</Forms.FormTitle>
                        <Select
                            placeholder="3 fragments"
                            options={FRAGMENT_COUNT_OPTIONS}
                            closeOnSelect={true}
                            select={(v: string) => updateConfig({ fragmentCount: parseInt(v) })}
                            isSelected={(v: string) => v === String(config.fragmentCount)}
                            serialize={(s: string) => s}
                        />
                        <Paragraph className={Margins.top4} style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                            Number of fragments to split each TLS Client Hello into (2-5)
                        </Paragraph>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        <Forms.FormTitle tag="label">
                            Fragment Delay: {config.fragmentDelay}ms
                        </Forms.FormTitle>
                        <SliderInput
                            markers={[1, 20, 40, 60, 80, 100]}
                            stickToMarkers={false}
                            initialValue={config.fragmentDelay}
                            onValueRender={(v: number) => `${v}ms`}
                            onSliderEnd={(v: number) => updateConfig({ fragmentDelay: Math.round(v) })}
                            minValue={1}
                            maxValue={100}
                        />
                        <Paragraph className={Margins.top4} style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                            Delay between fragments in milliseconds (1-100ms)
                        </Paragraph>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        <Forms.FormTitle tag="label">TLS Fingerprint</Forms.FormTitle>
                        <Select
                            placeholder="Chrome"
                            options={TLS_FINGERPRINT_OPTIONS}
                            closeOnSelect={true}
                            select={(v: string) => updateConfig({ tlsFingerprint: v as any })}
                            isSelected={(v: string) => v === config.tlsFingerprint}
                            serialize={(s: string) => s}
                        />
                        <Paragraph className={Margins.top4} style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                            Browser fingerprint to mimic for TLS handshake
                        </Paragraph>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        <Forms.FormSwitch
                            title="Adaptive Mode"
                            note="Automatically adjust fragmentation parameters based on connection success rates"
                            value={config.adaptiveMode}
                            onChange={(value: boolean) => updateConfig({ adaptiveMode: value })}
                        />
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        <Forms.FormTitle tag="label">Bypass List</Forms.FormTitle>
                        <TextInput
                            value={bypassListText}
                            placeholder="example.com&#10;subdomain.example.org"
                            onChange={handleBypassListChange}
                            onBlur={handleBypassListBlur}
                            style={{ minHeight: "100px", fontFamily: "monospace" }}
                        />
                        <Paragraph className={Margins.top4} style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                            Domains to exclude from fragmentation (one per line)
                        </Paragraph>
                    </div>
                </div>

                <Divider />

                <div style={{ marginTop: "16px" }}>
                    <Heading tag="h6" style={{ marginBottom: "8px" }}>
                        Statistics
                    </Heading>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "8px",
                            marginBottom: "12px"
                        }}
                    >
                        <div
                            style={{
                                background: "var(--background-secondary)",
                                padding: "8px",
                                borderRadius: "4px"
                            }}
                        >
                            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Total Connections</div>
                            <div style={{ fontSize: "20px", fontWeight: "bold" }}>{statistics.totalConnections}</div>
                        </div>

                        <div
                            style={{
                                background: "var(--background-secondary)",
                                padding: "8px",
                                borderRadius: "4px"
                            }}
                        >
                            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Success Rate</div>
                            <div
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color:
                                        statistics.currentSuccessRate >= 90
                                            ? "var(--green-360)"
                                            : statistics.currentSuccessRate >= 70
                                              ? "var(--yellow-360)"
                                              : "var(--red-360)"
                                }}
                            >
                                {statistics.currentSuccessRate.toFixed(1)}%
                            </div>
                        </div>

                        <div
                            style={{
                                background: "var(--background-secondary)",
                                padding: "8px",
                                borderRadius: "4px"
                            }}
                        >
                            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Successful</div>
                            <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--green-360)" }}>
                                {statistics.successfulBypasses}
                            </div>
                        </div>

                        <div
                            style={{
                                background: "var(--background-secondary)",
                                padding: "8px",
                                borderRadius: "4px"
                            }}
                        >
                            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Failed</div>
                            <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--red-360)" }}>
                                {statistics.failedBypasses}
                            </div>
                        </div>
                    </div>

                    {statistics.activeParameters && (
                        <div
                            style={{
                                background: "var(--background-secondary)",
                                padding: "8px",
                                borderRadius: "4px",
                                marginBottom: "12px"
                            }}
                        >
                            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Active Parameters</div>
                            <div style={{ fontSize: "14px" }}>
                                Fragments: {statistics.activeParameters.fragmentCount}, Delay:{" "}
                                {statistics.activeParameters.fragmentDelay}ms
                            </div>
                        </div>
                    )}

                    <button
                        className="button_e7d3f8 buttonColor_e7d3f8 buttonSize_e7d3f8"
                        onClick={resetStatistics}
                        style={{ marginTop: "8px" }}
                    >
                        Reset Statistics
                    </button>
                </div>
            </div>
        </SimpleErrorBoundary>
    );
};
