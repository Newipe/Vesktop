import { AvatarDecoration } from "../..";
import type { ComponentType, HTMLProps, PropsWithChildren } from "react";
type DecorationGridItemComponent = ComponentType<PropsWithChildren<HTMLProps<HTMLDivElement>> & {
    onSelect: () => void;
    isSelected: boolean;
}>;
export declare let DecorationGridItem: DecorationGridItemComponent;
export declare const setDecorationGridItem: (v: any) => any;
export declare let AvatarDecorationModalPreview: ComponentType<any>;
export declare const setAvatarDecorationModalPreview: (v: any) => any;
type DecorationGridDecorationComponent = React.ComponentType<HTMLProps<HTMLDivElement> & {
    avatarDecoration: AvatarDecoration;
    onSelect: () => void;
    isSelected: boolean;
}>;
export declare let DecorationGridDecoration: DecorationGridDecorationComponent;
export declare const setDecorationGridDecoration: (v: any) => any;
export {};
