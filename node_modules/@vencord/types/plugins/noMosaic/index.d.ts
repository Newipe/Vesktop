import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    description: string;
    tags: ("Appearance" | "Chat" | "Media")[];
    searchTerms: string[];
    settings: import("../../utils/types").DefinedSettings<{
        inlineVideo: {
            description: string;
            type: OptionType.BOOLEAN;
            default: true;
            restartNeeded: true;
        };
    }, {}>;
    patches: ({
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
        predicate?: undefined;
    } | {
        find: string;
        predicate: () => boolean;
        replacement: {
            match: RegExp;
            replace: string;
        };
    })[];
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
