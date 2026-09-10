import { OptionType } from "../../utils/types";
import { User } from "@vencord/discord-types";
interface UserProfileProps {
    popoutProps: Record<string, any>;
    currentUser: User;
    originalRenderPopout: () => React.ReactNode;
}
declare const _default: {
    name: string;
    description: string;
    tags: ("Appearance" | "Servers")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    settings: import("../../utils/types").DefinedSettings<{
        prioritizeServerProfile: {
            type: OptionType.BOOLEAN;
            description: string;
            default: false;
        };
    }, {}>;
    patches: {
        find: string;
        group: true;
        replacement: ({
            match: RegExp;
            replace: (_: string, rest: string, popoutProps: string, originalPopout: string, currentUser: string) => string;
        } | {
            match: RegExp;
            replace: string;
        })[];
    }[];
    readonly accountPanelRef: import("react").RefObject<HTMLDivElement | null>;
    grabRef(ref: React.RefObject<HTMLDivElement>): import("react").RefObject<HTMLDivElement>;
    openAccountPanelContextMenu(event: React.UIEvent): void;
    onPopoutClose(): void;
    UserProfile: import("react").FunctionComponent<UserProfileProps>;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
