import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Roles" | "Servers")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    patches: ({
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        }[];
        predicate: () => boolean;
    } | {
        find: string;
        replacement: {
            match: RegExp;
            replace: (m: string) => string;
        }[];
        predicate: () => boolean;
    })[];
    settings: import("../../utils/types").DefinedSettings<{
        lockout: {
            type: OptionType.BOOLEAN;
            default: true;
            description: string;
            restartNeeded: true;
        };
        onboarding: {
            type: OptionType.BOOLEAN;
            default: true;
            description: string;
            restartNeeded: true;
        };
    }, {}>;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
