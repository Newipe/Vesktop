import { NavContextMenuPatchCallback } from "../../api/ContextMenu";
declare const _default: {
    name: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    description: string;
    tags: ("Friends" | "Utility")[];
    contextMenus: {
        "user-context": NavContextMenuPatchCallback;
    };
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
