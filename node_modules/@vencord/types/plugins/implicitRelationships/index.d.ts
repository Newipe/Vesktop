import { OptionType } from "../../utils/types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Friends" | "Servers")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        sortByAffinity: {
            type: OptionType.BOOLEAN;
            default: true;
            description: string;
            restartNeeded: true;
        };
    }, {}>;
    patches: ({
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
            predicate?: undefined;
        };
    } | {
        find: string;
        replacement: {
            match: RegExp;
            replace: (rest: string, relationShipTypes: string, className: string) => string;
            predicate?: undefined;
        };
    } | {
        find: string;
        replacement: {
            predicate: () => boolean;
            match: RegExp;
            replace: string;
        };
    })[];
    wrapSort(comparator: Function, row: any): any;
    fetchImplicitRelationships(): Promise<void>;
    start(): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
