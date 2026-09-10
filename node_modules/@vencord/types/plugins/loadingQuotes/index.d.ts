import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Appearance" | "Customisation" | "Fun")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        replaceEvents: {
            description: string;
            type: OptionType.BOOLEAN;
            default: true;
        };
        enablePluginPresetQuotes: {
            description: string;
            type: OptionType.BOOLEAN;
            default: true;
        };
        enableDiscordPresetQuotes: {
            description: string;
            type: OptionType.BOOLEAN;
            default: false;
        };
        additionalQuotes: {
            description: string;
            type: OptionType.STRING;
            default: string;
            multiline: true;
        };
        additionalQuotesDelimiter: {
            description: string;
            type: OptionType.STRING;
            default: string;
        };
    }, {}>;
    patches: {
        find: string;
        replacement: ({
            match: RegExp;
            replace: string;
            predicate?: undefined;
        } | {
            match: RegExp;
            replace: string;
            predicate: () => boolean;
        })[];
    }[];
    mutateQuotes(quotes: string[]): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
