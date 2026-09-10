import { ReactNode } from "react";
interface UserMentionComponentProps {
    id: string;
    channelId: string;
    guildId: string;
    originalComponent: () => ReactNode;
}
declare const _default: {
    name: string;
    description: string;
    tags: ("Shortcuts" | "Utility")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    UserMentionComponent: import("react").FunctionComponent<UserMentionComponentProps>;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
