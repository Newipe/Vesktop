import { Guild, RoleOrUserPermission } from "@vencord/discord-types";
export default function openRolesAndUsersPermissionsModal(permissions: Array<RoleOrUserPermission>, guild: Guild, header: string): Promise<string>;
