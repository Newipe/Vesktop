declare const _default: {
    name: string;
    description: string;
    tags: ("Developers" | "Shortcuts")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    start(): void;
    stop(): void;
    event(e: KeyboardEvent): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
