declare const _default: {
    name: string;
    description: string;
    tags: "Utility"[];
    authors: {
        name: string;
        id: bigint;
    }[];
    required: true;
    noop: () => void;
    patches: {
        find: RegExp;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
