declare const _default: {
    name: string;
    description: string;
    tags: ("Chat" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    searchTerms: string[];
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    renderMention(RoleMention: any, UserMention: any, data: any, parse: any, props: any): import("react").JSX.Element;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
