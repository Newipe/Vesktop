import { Guild, GuildMember, Role } from "@vencord/discord-types";
export declare const loadGetGuildPermissionSpecMap: () => Promise<boolean>;
export declare const getGuildPermissionSpecMap: any;
export declare const cl: (...args: import("../../utils/css").ClassNameFactoryArg[]) => string;
export declare function getSortedRolesForMember({ id: guildId }: Guild, member: GuildMember): Role[];
export declare function sortUserRoles(roles: Role[]): Role[];
export declare function sortPermissionOverwrites<T extends {
    id: string;
    type: number;
}>(overwrites: T[], guildId: string): T[];
