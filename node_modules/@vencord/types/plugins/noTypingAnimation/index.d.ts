declare const _default: {
    name: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    description: string;
    tags: "Appearance"[];
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: (_: string, focused: string) => string;
        };
    }[];
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
