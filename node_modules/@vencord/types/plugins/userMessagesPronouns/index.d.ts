declare const _default: {
    name: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    description: string;
    tags: ("Appearance" | "Chat")[];
    settings: import("../../utils/types").DefinedSettings<{
        pronounsFormat: {
            type: import("../../utils/types").OptionType.SELECT;
            description: string;
            options: ({
                label: string;
                value: import("./settings").PronounsFormat;
                default: true;
            } | {
                label: string;
                value: import("./settings").PronounsFormat;
                default?: undefined;
            })[];
        };
        showSelf: {
            type: import("../../utils/types").OptionType.BOOLEAN;
            description: string;
            default: true;
        };
    }, {}>;
    patches: ({
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    } | {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        }[];
    })[];
    PronounsChatComponentWrapper: import("react").FunctionComponent<{
        message: import("@vencord/discord-types").Message;
    }>;
    CompactPronounsChatComponentWrapper: import("react").FunctionComponent<{
        message: import("@vencord/discord-types").Message;
    }>;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
