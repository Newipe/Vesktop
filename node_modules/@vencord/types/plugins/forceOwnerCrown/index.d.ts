import { Channel, User } from "@vencord/discord-types";
declare const _default: {
    name: string;
    description: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    tags: ("Appearance" | "Roles" | "Servers")[];
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    isGuildOwner(props: {
        user: User;
        channel: Channel;
        isOwner: boolean;
        guildId?: string;
    }): boolean;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
