import "./style.css";
declare const _default: {
    name: string;
    description: string;
    tags: ("Media" | "Voice")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    renderDownload(src: string): import("react").JSX.Element;
    Icon: () => import("react").JSX.Element;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
