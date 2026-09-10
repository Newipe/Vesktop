import { Message } from "@vencord/discord-types";
declare const _default: {
    name: string;
    description: string;
    tags: ("Appearance" | "Customisation")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    patches: ({
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    } | {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        }[];
    })[];
    getAvatarStyles(src: string | null): {
        [k: string]: string;
    };
    getMessageProps(props: {
        message: Message;
    }): {
        "data-author-id": string;
        "data-author-username": string;
        "data-is-self": boolean | "";
    } | {
        "data-author-id"?: undefined;
        "data-author-username"?: undefined;
        "data-is-self"?: undefined;
    };
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
