declare const _default: {
    name: string;
    description: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    required: true;
    patches: {
        find: string;
        replacement: ({
            match: RegExp;
            replace: string;
        } | {
            match: RegExp;
            replace: (m: string, notice: string) => string;
        })[];
    }[];
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
