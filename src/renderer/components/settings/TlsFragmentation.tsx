/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Heading, Margins, Paragraph } from "@vencord/types/components";
import { TextInput } from "@vencord/types/webpack/common";

import { SimpleErrorBoundary } from "../SimpleErrorBoundary";
import { SettingsComponent } from "./Settings";

export const TlsFragmentation: SettingsComponent = ({ settings }) => {
    const tlsFrag = settings.tlsFragmentation || {
        enabled: false,
        packets: "tlshello",
        length: "50-100",
        interval: "10-20"
    };

    const handleLengthChange = (value: string) => {
        if (!settings.tlsFragmentation) {
            settings.tlsFragmentation = {
                enabled: false,
                packets: "tlshello",
                length: value.trim(),
                interval: "10-20"
            };
        } else {
            settings.tlsFragmentation.length = value.trim();
        }
    };

    const handleIntervalChange = (value: string) => {
        if (!settings.tlsFragmentation) {
            settings.tlsFragmentation = {
                enabled: false,
                packets: "tlshello",
                length: "50-100",
                interval: value.trim()
            };
        } else {
            settings.tlsFragmentation.interval = value.trim();
        }
    };

    return (
        <SimpleErrorBoundary>
            <div style={{ marginTop: "16px" }}>
                <div style={{ marginBottom: "8px" }}>
                    <Heading tag="h5">TLS ClientHello Fragmentation</Heading>
                </div>
                <Paragraph className={Margins.bottom8}>
                    Fragment the initial TLS ClientHello packet to bypass DPI-based blocking. Modeled after v2rayN/Xray
                    behavior. Only applies to direct connections (not through system proxy).
                </Paragraph>

                <div style={{ marginBottom: "8px" }}>
                    <TextInput
                        value={tlsFrag.length}
                        placeholder="50-100"
                        onChange={handleLengthChange}
                        style={{ marginBottom: "8px" }}
                    />
                    <Paragraph style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        Fragment length in bytes. Use a single value (e.g., "50") or a range (e.g., "50-100").
                    </Paragraph>
                </div>

                <div style={{ marginBottom: "8px" }}>
                    <TextInput
                        value={tlsFrag.interval}
                        placeholder="10-20"
                        onChange={handleIntervalChange}
                        style={{ marginBottom: "8px" }}
                    />
                    <Paragraph style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        Delay between fragments in milliseconds. Use a single value (e.g., "10") or a range (e.g.,
                        "10-20").
                    </Paragraph>
                </div>

                <Paragraph style={{ fontSize: "12px", color: "var(--text-warning)" }}>
                    Note: This feature only works on direct connections. If a system proxy is configured, it will be
                    used instead and TLS fragmentation will be disabled.
                </Paragraph>
            </div>
        </SimpleErrorBoundary>
    );
};
