import { ReporterTestable } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Activity" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    reporterTestable: ReporterTestable;
    hidden: boolean;
    settingsAboutComponent: () => import("react").JSX.Element;
    handleEvent(e: MessageEvent<any>): Promise<void>;
    start(): Promise<void>;
    stop(): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
