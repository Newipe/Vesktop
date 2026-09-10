import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Activity" | "Media" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        noSpotifyAutoPause: {
            description: string;
            type: OptionType.BOOLEAN;
            default: true;
            restartNeeded: true;
        };
        keepSpotifyActivityOnIdle: {
            description: string;
            type: OptionType.BOOLEAN;
            default: false;
            restartNeeded: true;
        };
    }, {}>;
    patches: ({
        find: string;
        replacement: {
            match: RegExp;
            replace: (m: string, req: string) => string;
        };
    } | {
        find: string;
        replacement: {
            predicate: () => boolean;
            match: RegExp;
            replace: string;
        }[];
    })[];
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
