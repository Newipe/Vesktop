import { OptionType } from "../../utils/types";
import { Channel, Message } from "@vencord/discord-types";
declare enum GreetMode {
    Greet = "Greet",
    NormalMessage = "Message"
}
declare const _default: {
    name: string;
    description: string;
    tags: ("Customisation" | "Emotes")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        greetMode: {
            type: OptionType.SELECT;
            options: ({
                label: string;
                value: GreetMode;
                default: true;
            } | {
                label: string;
                value: GreetMode;
                default?: undefined;
            })[];
            description: string;
        };
    }, {
        multiGreetChoices?: string[];
        unholyMultiGreetEnabled?: boolean;
    }>;
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    WELCOME_STICKERS: any;
    pickSticker(event: React.UIEvent, props: {
        channel: Channel;
        message: Message;
    }): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
