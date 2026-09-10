declare const _default: {
    name: string;
    description: string;
    tags: ("Utility" | "Voice")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    patches: ({
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    } | {
        find: string;
        replacement: {
            match: string;
            replace: string;
        };
    })[];
    noop(): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
