import { Plugin } from "../../../../utils/types";
interface PluginCardProps extends React.HTMLProps<HTMLDivElement> {
    plugin: Plugin;
    disabled: boolean;
    onRestartNeeded(name: string, key: string): void;
    isNew?: boolean;
}
export declare function PluginCard({ plugin, disabled, onRestartNeeded, onMouseEnter, onMouseLeave, isNew }: PluginCardProps): import("react").JSX.Element;
export {};
