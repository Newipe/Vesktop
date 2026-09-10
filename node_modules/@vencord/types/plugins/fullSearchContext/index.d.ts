import { NavContextMenuPatchCallback } from "../../api/ContextMenu";
import { Message } from "@vencord/discord-types";
declare const _default: {
    name: string;
    description: string;
    tags: "Utility"[];
    authors: {
        name: string;
        id: bigint;
    }[];
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    handleContextMenu(event: React.MouseEvent, message: Message): void;
    contextMenus: {
        "message-actions": NavContextMenuPatchCallback;
    };
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
