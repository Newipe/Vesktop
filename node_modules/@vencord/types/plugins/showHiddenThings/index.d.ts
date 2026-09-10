import { OptionType } from "../../utils/types";
import { GuildMember, Role } from "@vencord/discord-types";
declare const _default: {
    name: string;
    searchTerms: string[];
    description: string;
    tags: ("Servers" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        showTimeouts: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
            restartNeeded: true;
        };
        showInvitesPaused: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
            restartNeeded: true;
        };
        showModView: {
            type: OptionType.BOOLEAN;
            description: string;
            default: true;
            restartNeeded: true;
        };
    }, {}>;
    patches: ({
        find: string;
        predicate: () => boolean;
        replacement: {
            match: RegExp;
            replace: string;
        };
    } | {
        find: RegExp;
        predicate: () => boolean;
        replacement: {
            match: RegExp;
            replace: string;
        };
    } | {
        find: string;
        predicate: () => boolean;
        replacement: {
            match: RegExp;
            replace: (_: string, rest: string, roles: string) => string;
        };
    })[];
    getHighestRole({ member }: {
        member: GuildMember;
    }, roles: Role[]): Role | undefined;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
