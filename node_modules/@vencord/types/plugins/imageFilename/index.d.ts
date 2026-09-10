import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    description: string;
    tags: ("Media" | "Utility")[];
    settings: import("../../utils/types").DefinedSettings<{
        showFullUrl: {
            description: string;
            type: OptionType.BOOLEAN;
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
    getTitle(src: string): string | undefined;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
