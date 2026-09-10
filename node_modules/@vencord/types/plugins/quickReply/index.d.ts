import { OptionType } from "../../utils/types";
import { Message } from "@vencord/discord-types";
declare const enum MentionOptions {
    DISABLED = 0,
    ENABLED = 1,
    NO_REPLY_MENTION_PLUGIN = 2
}
declare const _default: {
    name: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    description: string;
    tags: ("Chat" | "Shortcuts")[];
    settings: import("../../utils/types").DefinedSettings<{
        shouldMention: {
            type: OptionType.SELECT;
            description: string;
            options: ({
                label: string;
                value: MentionOptions;
                default: true;
            } | {
                label: string;
                value: MentionOptions;
                default?: undefined;
            })[];
        };
        ignoreBlockedAndIgnored: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
        };
    }, {}>;
    start(): void;
    stop(): void;
    flux: {
        DELETE_PENDING_REPLY(): void;
        MESSAGE_END_EDIT(): void;
        CHANNEL_SELECT(): void;
        MESSAGE_START_EDIT: typeof onStartEdit;
        CREATE_PENDING_REPLY: typeof onCreatePendingReply;
    };
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
declare function onStartEdit({ messageId, _isQuickEdit }: any): void;
declare function onCreatePendingReply({ message, _isQuickReply }: {
    message: Message;
    _isQuickReply: boolean;
}): void;
