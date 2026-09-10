declare const _default: {
    name: string;
    description: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    tags: ("Accessibility" | "Chat" | "Shortcuts" | "Utility")[];
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: (_: string, event: string) => string;
        };
    }[];
    reveal(event: MouseEvent): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
