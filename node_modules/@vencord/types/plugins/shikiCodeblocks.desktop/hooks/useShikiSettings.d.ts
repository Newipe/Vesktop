import { ShikiSettings } from "../settings";
export declare function useShikiSettings<F extends keyof ShikiSettings>(settingKeys: F[]): Pick<{
    theme: string;
    customTheme: string | undefined;
    tryHljs: import("../types").HljsSetting;
    useDevIcon: import("../types").DeviconSetting;
    bgOpacity: number;
}, "customTheme" | "theme" | F> & {
    isThemeLoading: boolean;
};
