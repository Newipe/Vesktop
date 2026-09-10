import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Chat" | "Fun")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        summaryExpiryThresholdDays: {
            type: OptionType.SLIDER;
            description: string;
            markers: number[];
            stickToMarkers: false;
            default: number;
        };
    }, {}>;
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    flux: {
        CONVERSATION_SUMMARY_UPDATE(data: any): void;
    };
    start(): Promise<void>;
    shouldFetch(channelId: string): boolean;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
