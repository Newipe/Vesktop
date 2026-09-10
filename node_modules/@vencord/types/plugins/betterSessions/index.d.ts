import "./styles.css";
import { OptionType } from "../../utils/types";
import { Session, SessionInfo } from "./types";
declare const _default: {
    name: string;
    description: string;
    authors: {
        name: string;
        id: bigint;
    }[];
    tags: ("Customisation" | "Notifications" | "Utility")[];
    settings: import("../../utils/types").DefinedSettings<{
        backgroundCheck: {
            type: OptionType.BOOLEAN;
            description: string;
            default: false;
            restartNeeded: true;
        };
        checkInterval: {
            description: string;
            type: OptionType.NUMBER;
            default: number;
            restartNeeded: true;
        };
    }, {}>;
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        }[];
    }[];
    renderName: import("react").FunctionComponent<SessionInfo>;
    renderDescription: import("react").FunctionComponent<{
        session: Session;
        description: string;
    }>;
    renderIcon: import("react").FunctionComponent<{
        session: Session;
        icon: React.ComponentType<any>;
    }>;
    checkNewSessions(): Promise<void>;
    flux: {
        USER_SETTINGS_ACCOUNT_RESET_AND_CLOSE_FORM(): void;
    };
    start(): Promise<void>;
    stop(): void;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
