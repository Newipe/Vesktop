import "./Button.css";
import type { Button as DiscordButton } from "@vencord/discord-types";
import type { ComponentPropsWithRef } from "react";
export type ButtonVariant = "primary" | "secondary" | "dangerPrimary" | "dangerSecondary" | "overlayPrimary" | "positive" | "link" | "none";
export type ButtonSize = "min" | "xs" | "small" | "medium" | "iconOnly";
export type ButtonProps = ComponentPropsWithRef<"button"> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
};
export type LinkButtonProps = ComponentPropsWithRef<"a"> & {
    size?: ButtonSize;
    variant?: ButtonVariant;
};
export declare function Button({ variant, size, children, className, ...restProps }: ButtonProps): import("react").JSX.Element;
export declare function LinkButton({ variant, size, className, children, ...restProps }: LinkButtonProps): import("react").JSX.Element;
export type TextButtonVariant = "primary" | "secondary" | "danger" | "link";
export type TextButtonProps = ComponentPropsWithRef<"button"> & {
    variant?: TextButtonVariant;
};
export declare function TextButton({ variant, className, ...restProps }: TextButtonProps): import("react").JSX.Element;
export declare const ButtonCompat: DiscordButton;
