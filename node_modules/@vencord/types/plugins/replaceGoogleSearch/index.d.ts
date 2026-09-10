import { NavContextMenuPatchCallback } from "../../api/ContextMenu";
import { OptionType } from "../../utils/types";
declare const enum ReplacementEngineValue {
    OFF = "off",
    CUSTOM = "custom"
}
declare const _default: {
    name: string;
    description: string;
    tags: ("Customisation" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        customEngineName: {
            description: string;
            type: OptionType.STRING;
            placeholder: string;
        };
        customEngineURL: {
            displayName: string;
            description: string;
            type: OptionType.STRING;
            placeholder: string;
        };
        replacementEngine: {
            description: string;
            type: OptionType.SELECT;
            options: ({
                label: string;
                value: string;
            } | {
                label: string;
                value: ReplacementEngineValue;
                default: true;
            })[];
        };
    }, {}>;
    contextMenus: {
        message: NavContextMenuPatchCallback;
    };
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
