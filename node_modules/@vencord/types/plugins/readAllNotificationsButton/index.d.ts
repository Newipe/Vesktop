import "./style.css";
declare const _default: {
    name: string;
    description: string;
    tags: ("Notifications" | "Shortcuts")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    dependencies: string[];
    renderReadAllButton: import("react").FunctionComponent<any>;
    start(): void;
    stop(): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
