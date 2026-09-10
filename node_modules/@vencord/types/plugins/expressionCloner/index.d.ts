import { NavContextMenuPatchCallback } from "../../api/ContextMenu";
declare const _default: {
    name: string;
    description: string;
    tags: ("Emotes" | "Servers")[];
    searchTerms: string[];
    authors: {
        name: string;
        id: bigint;
    }[];
    contextMenus: {
        message: NavContextMenuPatchCallback;
        "expression-picker": NavContextMenuPatchCallback;
    };
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
