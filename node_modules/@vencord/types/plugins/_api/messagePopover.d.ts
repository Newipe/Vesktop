declare const _default: {
    name: string;
    description: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: (_: string, ReactButton: string, ButtonComponent: string, showReactButton: string, message: string) => string;
        };
    }[];
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
