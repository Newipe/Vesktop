export declare function createAndAppendStyle(id: string, target: HTMLElement): HTMLStyleElement;
export declare const classNameToSelector: (name: string, prefix?: string) => string;
export type ClassNameFactoryArg = string | string[] | Record<string, unknown> | false | null | undefined | 0 | "";
/**
 * @param prefix The prefix to add to each class, defaults to `""`
 * @returns A classname generator function
 * @example
 * const cl = classNameFactory("plugin-");
 *
 * cl("base", ["item", "editable"], { selected: null, disabled: true })
 * // => "plugin-base plugin-item plugin-editable plugin-disabled"
 */
export declare const classNameFactory: (prefix?: string) => (...args: ClassNameFactoryArg[]) => string;
