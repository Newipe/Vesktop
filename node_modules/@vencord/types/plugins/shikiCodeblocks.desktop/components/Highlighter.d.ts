export interface ThemeBase {
    plainColor: string;
    accentBgColor: string;
    accentFgColor: string;
    backgroundColor: string;
}
export interface HighlighterProps {
    lang?: string;
    content: string;
    isPreview: boolean;
}
export declare const HighlighterContainer: (props: HighlighterProps) => import("react").JSX.Element | null;
export declare const Highlighter: ({ lang, content, isPreview, }: HighlighterProps) => import("react").JSX.Element;
