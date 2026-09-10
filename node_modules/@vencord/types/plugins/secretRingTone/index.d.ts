import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Fun" | "Notifications")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        onlySnow: {
            type: OptionType.BOOLEAN;
            description: string;
            default: false;
            restartNeeded: true;
        };
    }, {}>;
    patches: {
        find: string;
        replacement: ({
            match: RegExp;
            replace: string;
            predicate?: undefined;
        } | {
            predicate: () => boolean;
            match: RegExp;
            replace: string;
        })[];
    }[];
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
