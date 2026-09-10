declare const _default: {
    name: string;
    description: string;
    tags: "Developers"[];
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
    start(): Promise<void>;
    stop(): void;
    decodeError(code: number, ...args: any): string | undefined;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
