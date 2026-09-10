import { Channel, User } from "@vencord/discord-types";
import { JSX } from "react";
interface DecoratorProps {
    type: "guild" | "dm";
    user: User;
    /** only present when this is a DM list item */
    channel: Channel;
    /** only present when this is a guild list item */
    isOwner: boolean;
}
export type MemberListDecoratorFactory = (props: DecoratorProps) => JSX.Element | null;
type OnlyIn = "guilds" | "dms";
export declare const decoratorsFactories: Map<string, {
    render: MemberListDecoratorFactory;
    onlyIn?: OnlyIn;
}>;
export declare function addMemberListDecorator(identifier: string, render: MemberListDecoratorFactory, onlyIn?: OnlyIn): void;
export declare function removeMemberListDecorator(identifier: string): void;
export declare function __getDecorators(props: DecoratorProps, type: "guild" | "dm"): JSX.Element;
export {};
