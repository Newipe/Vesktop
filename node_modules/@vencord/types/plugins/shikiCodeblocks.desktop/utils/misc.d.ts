import { HighlighterProps } from "../components/Highlighter";
import { HljsSetting } from "../types";
export declare const cl: (...args: import("../../../utils/css").ClassNameFactoryArg[]) => string;
export declare const hljs: typeof import("highlight.js").default;
export declare const requireHljs: () => Promise<boolean>;
export declare const shouldUseHljs: ({ lang, tryHljs, }: {
    lang: HighlighterProps["lang"];
    tryHljs: HljsSetting;
}) => boolean;
