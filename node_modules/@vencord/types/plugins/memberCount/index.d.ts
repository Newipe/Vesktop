import "./style.css";
import { OptionType } from "../../utils/types";
import { FluxStore } from "@vencord/discord-types";
export declare const ChannelMemberStore: FluxStore & {
    getProps(guildId?: string, channelId?: string): {
        groups: {
            count: number;
            id: string;
        }[];
    };
};
export declare const ThreadMemberListStore: FluxStore & {
    getMemberListSections(channelId?: string): {
        [sectionId: string]: {
            sectionId: string;
            userIds: string[];
        };
    };
};
export declare const settings: import("../../utils/types").DefinedSettings<{
    toolTip: {
        type: OptionType.BOOLEAN;
        description: string;
        default: true;
        restartNeeded: true;
    };
    memberList: {
        type: OptionType.BOOLEAN;
        description: string;
        default: true;
        restartNeeded: true;
    };
    voiceActivity: {
        type: OptionType.BOOLEAN;
        description: string;
        default: true;
    };
}, {}>;
export declare const numberFormat: (value: number) => string;
export declare const cl: (...args: import("../../utils/css").ClassNameFactoryArg[]) => string;
declare const _default: {
    name: string;
    description: string;
    tags: ("Servers" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        toolTip: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
            restartNeeded: true;
        };
        memberList: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
            restartNeeded: true;
        };
        voiceActivity: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
        };
    }, {}>;
    patches: ({
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        }[];
        predicate: () => boolean;
    } | {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
        predicate: () => boolean;
    })[];
    render: import("react").FunctionComponent<any>;
    renderTooltip: import("react").FunctionComponent<any>;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
