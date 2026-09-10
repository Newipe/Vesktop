declare const _default: {
    name: string;
    description: string;
    tags: ("Privacy" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    flux: {
        STREAM_CREATE: (d: any) => void;
        STREAM_DELETE: (d: any) => void;
    };
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
