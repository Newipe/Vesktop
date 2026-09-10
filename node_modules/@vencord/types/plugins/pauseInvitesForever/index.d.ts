declare const _default: {
    name: string;
    searchTerms: string[];
    description: string;
    tags: "Servers"[];
    authors: {
        name: string;
        id: bigint;
    }[];
    patches: {
        find: string;
        group: true;
        replacement: {
            match: RegExp;
            replace: string;
        }[];
    }[];
    renderInvitesLabel: import("react").FunctionComponent<any>;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
