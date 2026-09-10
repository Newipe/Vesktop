import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Notifications" | "Voice")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        notificationVolume: {
            type: OptionType.SLIDER;
            description: string;
            markers: number[];
            default: number;
            stickToMarkers: false;
        };
    }, {}>;
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
