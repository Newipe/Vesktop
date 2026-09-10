import { OptionType } from "../../utils/types";
import type { Message } from "@vencord/discord-types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Chat" | "Notifications")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        userList: {
            description: string;
            type: OptionType.STRING;
            default: string;
            multiline: true;
        };
        roleList: {
            description: string;
            type: OptionType.STRING;
            default: string;
            multiline: true;
        };
        shouldPingListed: {
            description: string;
            type: OptionType.SELECT;
            options: ({
                label: string;
                value: false;
                default?: undefined;
            } | {
                label: string;
                value: true;
                default: true;
            })[];
        };
        inverseShiftReply: {
            description: string;
            type: OptionType.BOOLEAN;
            default: false;
        };
    }, {}>;
    shouldMention(message: Message, isHoldingShift: boolean): boolean;
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
