import type { CSSProperties, HTMLAttributes } from "react";
export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    flexDirection?: CSSProperties["flexDirection"];
    gap?: CSSProperties["gap"];
    justifyContent?: CSSProperties["justifyContent"];
    alignItems?: CSSProperties["alignItems"];
    flexWrap?: CSSProperties["flexWrap"];
}
export declare function Flex({ flexDirection, gap, justifyContent, alignItems, flexWrap, children, style, ...restProps }: FlexProps): import("react").JSX.Element;
