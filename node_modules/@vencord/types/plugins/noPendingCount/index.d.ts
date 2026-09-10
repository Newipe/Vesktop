import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Appearance" | "Notifications")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        hideFriendRequestsCount: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
            restartNeeded: true;
        };
        hideMessageRequestsCount: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
            restartNeeded: true;
        };
        hidePremiumOffersCount: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
            restartNeeded: true;
        };
    }, {}>;
    patches: ({
        find: string;
        predicate: () => boolean;
        replacement: {
            match: RegExp;
            replace: string;
        };
    } | {
        find: string;
        predicate: () => boolean;
        replacement: {
            match: RegExp;
            replace: (_: string, rest: string) => string;
        };
    })[];
    getRealMessageRequestCount(): any;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
