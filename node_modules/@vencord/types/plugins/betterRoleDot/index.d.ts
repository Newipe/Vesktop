import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    description: string;
    tags: ("Appearance" | "Roles")[];
    settings: import("../../utils/types").DefinedSettings<{
        bothStyles: {
            type: OptionType.BOOLEAN;
            description: string;
            restartNeeded: true;
            default: false;
        };
        copyRoleColorInProfilePopout: {
            type: OptionType.BOOLEAN;
            description: string;
            restartNeeded: true;
            default: false;
        };
    }, {}>;
    patches: ({
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
        all?: undefined;
        noWarn?: undefined;
        predicate?: undefined;
    } | {
        find: string;
        all: true;
        noWarn: true;
        predicate: () => boolean;
        replacement: {
            match: RegExp;
            replace: string;
        };
    })[];
    copyToClipBoard(color: string): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
