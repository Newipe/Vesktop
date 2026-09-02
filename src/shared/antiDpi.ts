/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export interface TlsFragmentationSettings {
    enabled: boolean;
    fragmentDelay: number;
    fragmentCount: number;
    bypassList: string[];
    adaptiveMode: boolean;
    tlsFingerprint: "chrome" | "firefox" | "edge" | "random";
}

export interface BypassStatistics {
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

export interface AntiDpiSettings {
    tlsFragmentation: TlsFragmentationSettings;
    statistics: BypassStatistics;
}

export const DefaultAntiDpiSettings: AntiDpiSettings = {
    tlsFragmentation: {
        enabled: false,
        fragmentDelay: 20,
        fragmentCount: 3,
        bypassList: [],
        adaptiveMode: true,
        tlsFingerprint: "chrome"
    },
    statistics: {
        totalConnections: 0,
        successfulBypasses: 0,
        failedBypasses: 0,
        lastSuccessTime: null,
        lastFailureTime: null,
        currentSuccessRate: 0,
        activeParameters: null
    }
};
