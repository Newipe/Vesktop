declare const Directions: readonly ["top", "bottom", "left", "right"];
declare const Sizes: readonly [8, 16, 20];
export type MarginDirection = (typeof Directions)[number];
export type MarginSize = (typeof Sizes)[number];
export declare const Margins: Record<`${MarginDirection}${MarginSize}`, string>;
export declare function generateMarginCss(): string;
export {};
