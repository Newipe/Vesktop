import "./Heading.css";
import type { ComponentPropsWithoutRef } from "react";
export type HeadingTag = `h${1 | 2 | 3 | 4 | 5 | 6}`;
export type HeadingProps<Tag extends HeadingTag> = ComponentPropsWithoutRef<Tag> & {
    tag?: Tag;
};
/**
 * A simple heading component that automatically sizes according to the tag used.
 *
 * If you need more control, use the BaseText component instead.
 */
export declare function Heading<T extends HeadingTag>(props: HeadingProps<T>): import("react").JSX.Element;
export declare function HeadingPrimary({ children, ...restProps }: HeadingProps<"h2">): import("react").JSX.Element;
export declare function HeadingSecondary({ children, ...restProps }: HeadingProps<"h3">): import("react").JSX.Element;
export declare function HeadingTertiary({ children, ...restProps }: HeadingProps<"h4">): import("react").JSX.Element;
