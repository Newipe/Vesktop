declare const _default: {
    name: string;
    description: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    managedStyle: string;
    patches: ({
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        }[];
    } | {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    })[];
} & Record<PropertyKey, any> & import("../../../utils/types").Plugin;
export default _default;
