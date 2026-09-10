import { handleComponentFailed } from "../../handleComponentFailed";
import type { ComponentType, PropsWithChildren } from "react";
export declare function SettingsTab({ children }: PropsWithChildren): import("react").JSX.Element;
export declare const handleSettingsTabError: typeof handleComponentFailed;
export declare function wrapTab(component: ComponentType<any>, tab: string): import("react").FunctionComponent<any>;
export declare function openSettingsTabModal(Tab: ComponentType<any>): void;
