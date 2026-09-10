declare const _default: {
    name: string;
    description: string;
    tags: ("Media" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
