declare const _default: {
    name: string;
    description: string;
    tags: "Developers"[];
    authors: {
        name: string;
        id: bigint;
    }[];
    start(): void;
    stop(): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
