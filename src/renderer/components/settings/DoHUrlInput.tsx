/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Forms, Margins } from "@vencord/types/utils";
import { TextInput } from "@vencord/types/webpack/common";

import { SimpleErrorBoundary } from "../SimpleErrorBoundary";
import { SettingsComponent } from "./Settings";

export const DoHUrlInput: SettingsComponent = ({ settings }) => {
    return (
        <SimpleErrorBoundary>
            <div className={Margins.bottom16}>
                <Forms.FormTitle>DNS over HTTPS (DoH) URL</Forms.FormTitle>
                <Forms.FormText type={Forms.FormText.Types.DESCRIPTION} className={Margins.bottom8}>
                    Enter your custom DoH provider URL. Leave empty to use the system default. Example:
                    https://cloudflare-dns.com/dns-query
                </Forms.FormText>
                <TextInput
                    value={settings.dohUrl || ""}
                    placeholder="https://cloudflare-dns.com/dns-query"
                    onChange={(value: string) => {
                        const trimmed = value.trim();
                        if (trimmed === "") {
                            settings.enableDoh = false;
                            settings.dohUrl = undefined;
                        } else {
                            settings.enableDoh = true;
                            settings.dohUrl = trimmed;
                        }
                    }}
                />
            </div>
        </SimpleErrorBoundary>
    );
};
