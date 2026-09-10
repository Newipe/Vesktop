import { Channel } from "@vencord/discord-types";
export interface ChannelDelete {
    type: "CHANNEL_DELETE";
    channel: Channel;
}
export interface GuildDelete {
    type: "GUILD_DELETE";
    guild: {
        id: string;
        unavailable?: boolean;
    };
}
export interface RelationshipRemove {
    type: "RELATIONSHIP_REMOVE";
    relationship: {
        id: string;
        nickname: string;
        type: number;
    };
}
export interface SimpleGroupChannel {
    id: string;
    name: string;
    iconURL?: string;
}
export interface SimpleGuild {
    id: string;
    name: string;
    iconURL?: string;
}
