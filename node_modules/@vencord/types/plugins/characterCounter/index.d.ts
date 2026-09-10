import "./style.css";
import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    tags: "Utility"[];
    settings: import("../../utils/types").DefinedSettings<{
        colorEffects: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
        };
    }, {}>;
    patches: ({
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        }[];
    } | {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    })[];
    renderCharCounter: import("react").FunctionComponent<{
        text: string;
        editorRef: any;
    }>;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
