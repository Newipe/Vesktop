/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Heading, Margins, Paragraph } from "@vencord/types/components";
import { Select, TextInput } from "@vencord/types/webpack/common";

import { SimpleErrorBoundary } from "../SimpleErrorBoundary";
import { SettingsComponent } from "./Settings";

const DOH_PROVIDERS = [
    { label: "Off (Disabled)", value: "off" },
    { label: "Cloudflare (1.1.1.1)", value: "cloudflare" },
    { label: "Google (dns.google)", value: "google" },
    { label: "Newipe (newipe.qd.je) - Iran only", value: "newipe" },
    { label: "Quad9 (dns.quad9.net)", value: "quad9" },
    { label: "OpenDNS (doh.opendns.com)", value: "opendns" },
    { label: "Custom", value: "custom" }
];

const DOH_URLS: Record<string, string> = {
    cloudflare: "https://cloudflare-dns.com/dns-query",
    google: "https://dns.google/dns-query",
    newipe: "https://newipe.qd.je/dns-query",
    quad9: "https://dns.quad9.net/dns-query",
    opendns: "https://doh.opendns.com/dns-query"
};

export const DoH: SettingsComponent = ({ settings }) => {
    let currentProvider = "off";
    if (settings.enableDoh) {
        const predefined = DOH_PROVIDERS.find(p => DOH_URLS[p.value] === settings.dohUrl);
        currentProvider = predefined ? predefined.value : "custom";
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
            settings.dohUrl = DOH_URLS[value];
        }
    };

    return (
        <SimpleErrorBoundary>
            <div>
                <div style={{ marginBottom: "8px" }}>
                    <Heading tag="h5">DNS over HTTPS (DoH)</Heading>
                </div>
                <Paragraph className={Margins.bottom8}>
                    Choose a secure DNS provider to encrypt your DNS queries and bypass restrictions.
                </Paragraph>

                <div style={{ marginBottom: currentProvider === "custom" ? "8px" : "0" }}>
                    <Select
                        placeholder="Off (Disabled)"
                        options={DOH_PROVIDERS}
                        closeOnSelect={true}
                        select={(v: string) => handleProviderChange(v)}
                        isSelected={(v: string) => v === currentProvider}
                        serialize={(s: string) => s}
                    />
                </div>

                {currentProvider === "custom" && (
                    <TextInput
                        value={settings.dohUrl || ""}
                        placeholder="https://example.com/dns-query"
                        onChange={(value: string) => {
                            settings.dohUrl = value.trim() || undefined;
                        }}
                    />
                )}
            </div>
        </SimpleErrorBoundary>
    );
};
