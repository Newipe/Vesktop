import "./style.css";
declare const _default: {
    name: string;
    description: string;
    tags: ("Appearance" | "Customisation")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: (m: string, hasFolderButtonContent: string) => string;
        }[];
    }[];
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
