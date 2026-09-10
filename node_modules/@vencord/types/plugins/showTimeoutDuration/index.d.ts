import "./styles.css";
import { OptionType } from "../../utils/types";
import { Message } from "@vencord/discord-types";
import { ReactNode } from "react";
declare const enum DisplayStyle {
    Tooltip = "tooltip",
    Inline = "ssalggnikool"
}
declare const _default: {
    name: string;
    description: string;
    tags: ("Servers" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        displayStyle: {
            description: string;
            type: OptionType.SELECT;
            options: ({
                label: string;
                value: DisplayStyle;
                default?: undefined;
            } | {
                label: string;
                value: DisplayStyle;
                default: true;
            })[];
        };
    }, {}>;
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        }[];
    }[];
    TooltipWrapper: import("react").FunctionComponent<{
        message: Message;
        children: ReactNode;
        text: ReactNode;
    }>;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
