/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2026 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Divider, SwitchItem } from "@vencord/types/components";
import { React, Select, useEffect, useState } from "@vencord/types/webpack/common";

import { DEFAULT_DOH_RESOLVERS, parseDohResolvers, REMOTE_DOH_RESOLVERS_URL } from "../../../shared/doh";
import { cl, SettingsComponent } from "./Settings";

export const NetworkPrivacy: SettingsComponent = ({ settings }) => {
    const [resolvers, setResolvers] = useState(DEFAULT_DOH_RESOLVERS);

    useEffect(() => {
        fetch(REMOTE_DOH_RESOLVERS_URL)
            .then(response => response.json())
            .then(value => {
                const remoteResolvers = parseDohResolvers(value);
                if (remoteResolvers) setResolvers(remoteResolvers);
            })
            .catch(() => {});
    }, []);

    const providers = [
        { label: "Off (Disabled)", value: "off" },
        ...resolvers.map(resolver => ({ label: resolver.label, value: resolver.url })),
        { label: "Custom", value: "custom" }
    ];

    let currentProvider = "off";
    if (settings.enableDoh) {
        const predefined = resolvers.find(resolver => resolver.url === settings.dohUrl);
        currentProvider = predefined ? predefined.url : "custom";
    }

    const handleProviderChange = (value: string) => {
        if (value === "off") {
            settings.enableDoh = false;
            settings.dohUrl = undefined;
        } else if (value === "custom") {
            settings.enableDoh = true;
            settings.dohUrl = "";
        } else {
            settings.enableDoh = true;
            settings.dohUrl = value;
        }
    };

    return (
        <div className={cl("network-privacy")}>
                {/* Fragmentation Toggle */}
                <SwitchItem
                    note="Enable TCP SNI fragmentation to bypass DPI-based blocking. This splits TLS handshakes into smaller packets."
                    value={settings.enableFragmentation ?? false}
                    onChange={(value: boolean) => {
                        settings.enableFragmentation = value;
                    }}
                >
                    Fragmentation (DPI Bypass)
                </SwitchItem>

                {/* Fragmentation Profile Dropdown - Only shown when fragmentation is enabled */}
                {settings.enableFragmentation && (
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <Select
                            placeholder="FragA (Standard DPI)"
                            options={[
                                { label: "FragA (Standard DPI)", value: "FragA" },
                                { label: "FragB (Aggressive DPI)", value: "FragB" }
                            ]}
                            closeOnSelect={true}
                            select={(v: string) => {
                                settings.fragProfile = v as "FragA" | "FragB";
                            }}
                            isSelected={(v: string) => v === (settings.fragProfile ?? "FragA")}
                            serialize={(s: string) => s}
                        />
                    </div>
                )}

                <Divider className={cl("category-divider")} style={{ margin: "12px 0" }} />

                {/* UDP Noise Toggle */}
                <SwitchItem
                    note="Generate dummy UDP packets to bypass WebRTC/Voice filtering. Sends 24 noise packets before actual voice data."
                    value={settings.enableUdpNoise ?? false}
                    onChange={(value: boolean) => {
                        settings.enableUdpNoise = value;
                    }}
                >
                    UDP Noise Generation
                </SwitchItem>

                <Divider className={cl("category-divider")} style={{ margin: "12px 0" }} />

                {/* DNS over HTTPS (DoH) */}
                <div>
                    <div style={{ marginBottom: "8px" }}>
                        <h5 style={{ margin: 0 }}>DNS over HTTPS (DoH)</h5>
                    </div>
                    <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "var(--text-muted)" }}>
                        Choose a secure DNS provider to encrypt your DNS queries and bypass restrictions.
                    </p>

                    <div style={{ marginBottom: currentProvider === "custom" ? "8px" : "0" }}>
                        <Select
                            placeholder="Off (Disabled)"
                            options={providers}
                            closeOnSelect={true}
                            select={(v: string) => handleProviderChange(v)}
                            isSelected={(v: string) => v === currentProvider}
                            serialize={(s: string) => s}
                        />
                    </div>

                    {currentProvider === "custom" && (
                        <input
                            type="text"
                            value={settings.dohUrl || ""}
                            placeholder="https://example.com/dns-query"
                            onChange={e => {
                                settings.dohUrl = e.currentTarget.value.trim() || undefined;
                            }}
                            style={{
                                width: "100%",
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid var(--background-modifier-accent)",
                                backgroundColor: "var(--background-secondary-alt)",
                                color: "var(--text-normal)"
                            }}
                        />
                    )}
                </div>

                {/* Info text */}
                <div style={{ marginTop: "16px" }}>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0 }}>
                        These settings work together to provide comprehensive DPI bypass. Enable Fragmentation and UDP
                        Noise for TCP/UDP traffic shaping, and DoH for encrypted DNS resolution.
                    </p>
                </div>
            </div>
        </div>
    );
};
