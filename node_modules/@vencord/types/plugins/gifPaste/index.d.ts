declare const _default: {
    name: string;
    description: string;
    tags: ("Chat" | "Media")[];
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
    handleSelect(gif?: {
        url: string;
    }): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
