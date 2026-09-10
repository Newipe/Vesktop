import { OptionType } from "../../utils/types";
interface Emoji {
    type: string;
    id: string;
    name: string;
}
interface Target {
    dataset: Emoji;
    firstChild: HTMLImageElement;
}
declare const _default: {
    name: string;
    description: string;
    tags: ("Emotes" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        copyUnicode: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
        };
    }, {}>;
    contextMenus: {
        "expression-picker"(children: (import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null)[], { target }: {
            target: Target;
        }): void;
    };
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
