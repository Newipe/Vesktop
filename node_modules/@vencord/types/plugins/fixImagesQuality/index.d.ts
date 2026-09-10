import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Appearance" | "Media")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        originalImagesInChat: {
            type: OptionType.BOOLEAN;
            description: string;
            default: false;
        };
    }, {}>;
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    settingsAboutComponent(): import("react").JSX.Element;
    getSrc(props: {
        src: string;
        width: number;
        height: number;
        contentType: string;
        mosaicStyleAlt?: boolean;
        trigger?: string;
    }, freeze?: boolean): string | undefined;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
