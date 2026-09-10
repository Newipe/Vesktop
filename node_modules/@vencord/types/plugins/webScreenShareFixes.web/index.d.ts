declare const _default: {
    name: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    description: string;
    tags: "Voice"[];
    enabledByDefault: true;
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        }[];
    }[];
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
