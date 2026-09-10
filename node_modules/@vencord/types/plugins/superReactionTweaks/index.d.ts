import { OptionType } from "../../utils/types";
export declare const settings: import("../../utils/types").DefinedSettings<{
    superReactByDefault: {
        type: OptionType.BOOLEAN;
        description: string;
        default: true;
    };
    unlimitedSuperReactionPlaying: {
        type: OptionType.BOOLEAN;
        description: string;
        default: false;
    };
    superReactionPlayingLimit: {
        description: string;
        type: OptionType.SLIDER;
        default: number;
        markers: number[];
        stickToMarkers: true;
    };
}, {}>;
declare const _default: {
    name: string;
    description: string;
    tags: ("Emotes" | "Reactions")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    patches: ({
        find: string;
        replacement: {
            match: RegExp;
            replace: (_: string, rest: string, playingCount: string) => string;
        }[];
    } | {
        find: string;
        replacement: {
            match: RegExp;
            replace: (_: string, rest: string, _isBurstReactionVariable: string, isReactionIntention: string) => string;
        };
    })[];
    settings: import("../../utils/types").DefinedSettings<{
        superReactByDefault: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
        };
        unlimitedSuperReactionPlaying: {
            type: OptionType.BOOLEAN;
            description: string;
            default: false;
        };
        superReactionPlayingLimit: {
            description: string;
            type: OptionType.SLIDER;
            default: number;
            markers: number[];
            stickToMarkers: true;
        };
    }, {}>;
    shouldPlayBurstReaction(playingCount: number): boolean;
    readonly shouldSuperReactByDefault: boolean;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
