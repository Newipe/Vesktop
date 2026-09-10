import "./styles.css";
import { NavContextMenuPatchCallback } from "../../api/ContextMenu";
import { OptionType } from "../../utils/types";
import type { Guild } from "@vencord/discord-types";
export declare const enum PermissionsSortOrder {
    HighestRole = 0,
    LowestRole = 1
}
export declare const settings: import("../../utils/types").DefinedSettings<{
    permissionsSortOrder: {
        description: string;
        type: OptionType.SELECT;
        options: ({
            label: string;
            value: PermissionsSortOrder;
            default: true;
        } | {
            label: string;
            value: PermissionsSortOrder;
            default?: undefined;
        })[];
    };
}, {}>;
declare const _default: {
    name: string;
    description: string;
    tags: ("Roles" | "Servers" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        permissionsSortOrder: {
            description: string;
            type: OptionType.SELECT;
            options: ({
                label: string;
                value: PermissionsSortOrder;
                default: true;
            } | {
                label: string;
                value: PermissionsSortOrder;
                default?: undefined;
            })[];
        };
    }, {}>;
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    ViewPermissionsButton: import("react").FunctionComponent<{
        className: string;
        guild: Guild;
        userId: string;
    }>;
    contextMenus: {
        "user-context": NavContextMenuPatchCallback;
        "channel-context": NavContextMenuPatchCallback;
        "guild-context": NavContextMenuPatchCallback;
        "guild-header-popout": NavContextMenuPatchCallback;
    };
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
