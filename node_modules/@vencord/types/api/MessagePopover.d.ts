import { IconComponent } from "../utils/types";
import { Channel, Message } from "@vencord/discord-types";
import type { ComponentType, MouseEventHandler } from "react";
export interface MessagePopoverButtonItem {
    key?: string;
    label: string;
    icon: ComponentType<any>;
    message: Message;
    channel: Channel;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    onContextMenu?: MouseEventHandler<HTMLButtonElement>;
}
export type MessagePopoverButtonFactory = (message: Message) => MessagePopoverButtonItem | null;
export type MessagePopoverButtonData = {
    render: MessagePopoverButtonFactory;
    /**
     * This icon is used only for Settings UI. Your render function must still return an icon,
     * and it can be different from this one.
     */
    icon: IconComponent;
};
export declare const MessagePopoverButtonMap: Map<string, MessagePopoverButtonData>;
/**
 * The icon argument is used only for Settings UI. Your render function must still return an icon,
 * and it can be different from this one.
 */
export declare function addMessagePopoverButton(identifier: string, render: MessagePopoverButtonFactory, icon: IconComponent): void;
export declare function removeMessagePopoverButton(identifier: string): void;
export declare function _buildPopoverElements(Component: React.ComponentType<MessagePopoverButtonItem>, message: Message): import("react").JSX.Element;
