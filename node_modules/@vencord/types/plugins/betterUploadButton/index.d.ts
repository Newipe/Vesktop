declare const _default: {
    name: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    description: string;
    tags: ("Shortcuts" | "Utility")[];
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        }[];
    }[];
    getOverrides(props: any, onClick: any, onDoubleClick: any): {
        onClick?: undefined;
        onContextMenu?: undefined;
    } | {
        onClick: any;
        onContextMenu: any;
    };
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
