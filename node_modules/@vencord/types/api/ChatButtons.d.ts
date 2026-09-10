import "./ChatButton.css";
import { IconComponent } from "../utils/types";
import { Channel } from "@vencord/discord-types";
import { HTMLProps, JSX, MouseEventHandler, ReactNode } from "react";
export interface ChatBarProps {
    channel: Channel;
    disabled: boolean;
    isEmpty: boolean;
    type: {
        analyticsName: string;
        attachments: boolean;
        autocomplete: {
            addReactionShortcut: boolean;
            forceChatLayer: boolean;
            reactions: boolean;
        };
        commands: {
            enabled: boolean;
        };
        drafts: {
            type: number;
            commandType: number;
            autoSave: boolean;
        };
        emojis: {
            button: boolean;
        };
        gifs: {
            button: boolean;
            allowSending: boolean;
        };
        gifts: {
            button: boolean;
        };
        permissions: {
            requireSendMessages: boolean;
        };
        showThreadPromptOnReply: boolean;
        stickers: {
            button: boolean;
            allowSending: boolean;
            autoSuggest: boolean;
        };
        users: {
            allowMentioning: boolean;
        };
        submit: {
            button: boolean;
            ignorePreference: boolean;
            disableEnterToSubmit: boolean;
            clearOnSubmit: boolean;
            useDisabledStylesOnSubmit: boolean;
        };
        uploadLongMessages: boolean;
        upsellLongMessages: {
            iconOnly: boolean;
        };
        showCharacterCount: boolean;
        sedReplace: boolean;
    };
}
export type ChatBarButtonFactory = (props: ChatBarProps & {
    isMainChat: boolean;
    isAnyChat: boolean;
}) => JSX.Element | null;
export type ChatBarButtonData = {
    render: ChatBarButtonFactory;
    /**
     * This icon is used only for Settings UI. Your render function must still render an icon,
     * and it can be different from this one.
     */
    icon: IconComponent;
};
/**
 * Don't use this directly, use {@link addChatBarButton} and {@link removeChatBarButton} instead.
 */
export declare const ChatBarButtonMap: Map<string, ChatBarButtonData>;
export declare function _injectButtons(buttons: ReactNode[], props: ChatBarProps): void;
/**
 * The icon argument is used only for Settings UI. Your render function must still render an icon,
 * and it can be different from this one.
 */
export declare const addChatBarButton: (id: string, render: ChatBarButtonFactory, icon: IconComponent) => Map<string, ChatBarButtonData>;
export declare const removeChatBarButton: (id: string) => boolean;
export interface ChatBarButtonProps {
    children: ReactNode;
    tooltip: string;
    onClick: MouseEventHandler;
    onContextMenu?: MouseEventHandler;
    onAuxClick?: MouseEventHandler;
    buttonProps?: Omit<HTMLProps<HTMLDivElement>, "size" | "onClick" | "onContextMenu" | "onAuxClick">;
}
export declare const ChatBarButton: import("react").FunctionComponent<ChatBarButtonProps>;
