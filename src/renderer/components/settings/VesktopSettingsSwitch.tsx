/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2025 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { FormSwitch } from "@vencord/types/components";
import type { ComponentProps } from "react";

import { cl } from "./Settings";

export function VesktopSettingsSwitch(props: ComponentProps<typeof FormSwitch>) {
    return <FormSwitch {...props} hideBorder className={cl("switch")} />;
}

/**
 * A switch component that also accepts nested setting paths like "tlsFragmentation.enabled"
 */
export function VesktopNestedSwitch(
    props: Omit<ComponentProps<typeof FormSwitch>, "value" | "onChange"> & {
        settings: any;
        path: string;
    }
) {
    const { settings, path, ...rest } = props;

    // Resolve nested path
    const value = path.split(".").reduce((obj, key) => obj?.[key], settings);

    const onChange = (newValue: boolean) => {
        const keys = path.split(".");
        let current = settings;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = newValue;
    };

    return <FormSwitch {...rest} value={value} onChange={onChange} hideBorder className={cl("switch")} />;
}
