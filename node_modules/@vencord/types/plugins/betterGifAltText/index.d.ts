declare const _default: {
    name: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    description: string;
    tags: ("Accessibility" | "Customisation" | "Media")[];
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    altify(props: any): any;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
