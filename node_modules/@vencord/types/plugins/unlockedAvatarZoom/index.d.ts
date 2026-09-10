import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Media" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        zoomMultiplier: {
            type: OptionType.SLIDER;
            description: string;
            markers: number[];
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
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
