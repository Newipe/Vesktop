import { StartAt } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    tags: ("Console" | "Developers" | "Shortcuts" | "Utility")[];
    startAt: StartAt.Init;
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        }[];
    }[];
    start(): void;
    eagerLoad(forceLoad: boolean): Promise<void>;
    stop(): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
