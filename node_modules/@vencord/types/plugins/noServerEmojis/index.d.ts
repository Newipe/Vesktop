import { OptionType } from "../../utils/types";
import type { Channel, Emoji } from "@vencord/discord-types";
declare const _default: {
    name: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    description: string;
    tags: ("Emotes" | "Servers")[];
    settings: import("../../utils/types").DefinedSettings<{
        shownEmojis: {
            description: string;
            type: OptionType.SELECT;
            default: string;
            options: {
                label: string;
                value: string;
            }[];
        };
    }, {}>;
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    shouldSkip(channel: Channel | undefined | null, emoji: Emoji): boolean;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
