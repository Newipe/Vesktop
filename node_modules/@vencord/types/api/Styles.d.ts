/** @deprecated Import this from `@utils/css` instead */
export declare const classNameFactory: (prefix?: string) => (...args: import("../utils/css").ClassNameFactoryArg[]) => string;
export interface Style {
    name: string;
    source: string;
    classNames: Record<string, string>;
    dom: HTMLStyleElement | null;
}
export declare const styleMap: Map<string, Style>;
export declare const vencordRootNode: HTMLElement;
/**
 * Houses all Vencord core styles. This includes all imported css files
 */
export declare const coreStyleRootNode: HTMLElement;
/**
 * Houses all plugin specific managed styles
 */
export declare const managedStyleRootNode: HTMLElement;
/**
 * Houses the user's themes and quick css
 */
export declare const userStyleRootNode: HTMLElement;
export declare function initStyles(): void;
export declare function requireStyle(name: string): Style;
/**
 * A style's name can be obtained from importing a stylesheet with `?managed` at the end of the import
 * @param name The name of the style
 * @returns `false` if the style was already enabled, `true` otherwise
 * @example
 * import pluginStyle from "./plugin.css?managed";
 *
 * // Inside some plugin method like "start()" or "[option].onChange()"
 * enableStyle(pluginStyle);
 */
export declare function enableStyle(name: string): boolean;
/**
 * @param name The name of the style
 * @returns `false` if the style was already disabled, `true` otherwise
 * @see {@link enableStyle} for info on getting the name of an imported style
 */
export declare function disableStyle(name: string): boolean;
/**
 * @param name The name of the style
 * @returns `true` in most cases, may return `false` in some edge cases
 * @see {@link enableStyle} for info on getting the name of an imported style
 */
export declare const toggleStyle: (name: string) => boolean;
/**
 * @param name The name of the style
 * @returns Whether the style is enabled
 * @see {@link enableStyle} for info on getting the name of an imported style
 */
export declare const isStyleEnabled: (name: string) => boolean;
/**
 * Sets the variables of a style
 * ```ts
 * // -- plugin.ts --
 * import pluginStyle from "./plugin.css?managed";
 * import { setStyleVars } from "@api/Styles";
 * import { findByPropsLazy } from "@webpack";
 * const classNames = findByPropsLazy("thin", "scrollerBase"); // { thin: "thin-31rlnD scrollerBase-_bVAAt", ... }
 *
 * // Inside some plugin method like "start()"
 * setStyleClassNames(pluginStyle, classNames);
 * enableStyle(pluginStyle);
 * ```
 * ```scss
 * // -- plugin.css --
 * .plugin-root [--thin]::-webkit-scrollbar { ... }
 * ```
 * ```scss
 * // -- final stylesheet --
 * .plugin-root .thin-31rlnD.scrollerBase-_bVAAt::-webkit-scrollbar { ... }
 * ```
 * @param name The name of the style
 * @param classNames An object where the keys are the variable names and the values are the variable values
 * @param recompile Whether to recompile the style after setting the variables, defaults to `true`
 * @see {@link enableStyle} for info on getting the name of an imported style
 */
export declare const setStyleClassNames: (name: string, classNames: Record<string, string>, recompile?: boolean) => void;
/**
 * Updates the stylesheet after doing the following to the sourcecode:
 *   - Interpolate style classnames
 * @param style **_Must_ be a style with a DOM element**
 * @see {@link setStyleClassNames} for more info on style classnames
 */
export declare const compileStyle: (style: Style) => void;
