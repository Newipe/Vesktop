/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Heading, Margins, Paragraph } from "@vencord/types/components";
import { Select, TextInput, useEffect, useState } from "@vencord/types/webpack/common";

import { DEFAULT_DOH_RESOLVERS, parseDohResolvers, REMOTE_DOH_RESOLVERS_URL } from "../../../shared/doh";
import { SimpleErrorBoundary } from "../SimpleErrorBoundary";
import { SettingsComponent } from "./Settings";

export const DoH: SettingsComponent = ({ settings }) => {
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
                        options={providers}
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
