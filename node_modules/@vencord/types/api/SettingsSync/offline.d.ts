export declare function importSettings(data: string): Promise<void>;
export declare function exportSettings({ minify }?: {
    minify?: boolean;
}): Promise<string>;
export declare function downloadSettingsBackup(): Promise<void>;
export declare function uploadSettingsBackup(showToast?: boolean): Promise<void>;
