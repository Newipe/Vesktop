declare const _default: {
    name: string;
    description: string;
    tags: "Appearance"[];
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
    isCurrentUser: (userId: string) => boolean;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
