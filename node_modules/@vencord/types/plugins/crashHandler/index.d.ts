import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    tags: ("Developers" | "Utility")[];
    enabledByDefault: true;
    settings: import("../../utils/types").DefinedSettings<{
        attemptToPreventCrashes: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
        };
        attemptToNavigateToHome: {
            type: OptionType.BOOLEAN;
            description: string;
            default: false;
        };
    }, {}>;
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    handleCrash(_this: any, errorState: any): void;
    handlePreventCrash(_this: any): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
