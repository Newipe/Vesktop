import "./style.css";
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
        }[];
    }[];
    addCopyButton: import("react").FunctionComponent<{
        fileContents: string;
        bytesLeft: number;
    }>;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
