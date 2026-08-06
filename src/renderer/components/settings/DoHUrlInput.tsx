/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Heading, Margins, Paragraph } from "@vencord/types/components";
import { TextInput } from "@vencord/types/webpack/common";

import { SimpleErrorBoundary } from "../SimpleErrorBoundary";
import { SettingsComponent } from "./Settings";

export const DoHUrlInput: SettingsComponent = ({ settings }) => {
    return (
        <SimpleErrorBoundary>
            <div>
                <Heading tag="h5">DNS over HTTPS (DoH) URL</Heading>
                <Paragraph className={Margins.bottom8}>
                    Enter your custom DoH provider URL. Leave empty to use the system default. Example:
                    https://newipe.qd.je/dns-query (Iran only)
                </Paragraph>
                <TextInput
                    value={settings.dohUrl || ""}
                    placeholder="https://newipe.qd.je/dns-query"
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
