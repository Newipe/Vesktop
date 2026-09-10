/**
 * Renders code in a Discord codeblock
 */
export declare function CodeBlock({ className, ...props }: {
    content?: string;
    lang: string;
    className?: string;
}): import("react").JSX.Element;
/**
 * Renders inline code like `this`
 */
export declare function InlineCode({ children, className }: {
    children: React.ReactNode;
    className?: string;
}): import("react").JSX.Element;
