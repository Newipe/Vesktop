import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Appearance" | "Customisation")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        lightness: {
            description: string;
            type: OptionType.NUMBER;
            default: number;
        };
        memberListColors: {
            description: string;
            restartNeeded: true;
            type: OptionType.BOOLEAN;
            default: true;
        };
        applyColorOnlyToUsersWithoutColor: {
            description: string;
            restartNeeded: false;
            type: OptionType.BOOLEAN;
            default: false;
        };
        applyColorOnlyInDms: {
            displayName: string;
            description: string;
            restartNeeded: false;
            type: OptionType.BOOLEAN;
            default: false;
        };
    }, {}>;
    patches: ({
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
        predicate?: undefined;
    } | {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
        predicate: () => boolean;
    })[];
    wrapMessageColorProps(colorProps: {
        colorString: string;
        colorStrings?: Record<"primaryColor" | "secondaryColor" | "tertiaryColor", string>;
    }, context: any): {
        colorString: string;
        colorStrings?: Record<"primaryColor" | "secondaryColor" | "tertiaryColor", string>;
    } | {
        colorString: any;
        colorStrings: {
            primaryColor: any;
            secondaryColor: undefined;
            tertiaryColor: undefined;
        } | undefined;
    };
    calculateNameColorForMessageContext(context: any): any;
    calculateNameColorForListContext(context: any): any;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
