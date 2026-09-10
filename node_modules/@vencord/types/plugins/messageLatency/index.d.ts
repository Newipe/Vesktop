import { OptionType } from "../../utils/types";
import { Message } from "@vencord/discord-types";
type FillValue = ("status-danger" | "status-warning" | "status-positive" | "text-muted");
type Fill = [FillValue, FillValue, FillValue];
declare const _default: {
    name: string;
    description: string;
    tags: ("Chat" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        latency: {
            type: OptionType.NUMBER;
            description: string;
            default: number;
        };
        detectDiscordKotlin: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
        };
        showMillis: {
            type: OptionType.BOOLEAN;
            description: string;
            default: false;
        };
        ignoreSelf: {
            type: OptionType.BOOLEAN;
            description: string;
            default: false;
        };
    }, {}>;
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    stringDelta(delta: number, showMillis: boolean): string;
    latencyTooltipData(message: Message): {
        delta: string | null;
        ahead: boolean;
        fill: Fill;
        isDiscordKotlin: boolean;
    } | null;
    Tooltip(): import("react").FunctionComponent<{
        message: Message;
    }>;
    Icon({ delta, fill, props }: {
        delta: string | null;
        fill: Fill;
        props: {
            onClick(): void;
            onMouseEnter(): void;
            onMouseLeave(): void;
            onContextMenu(): void;
            onFocus(): void;
            onBlur(): void;
            "aria-label"?: string;
        };
    }): import("react").JSX.Element;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
