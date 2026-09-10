/**
 * Returns a consistent, short hash of the given key by first processing it through a hash digest,
 * then encoding the first few bytes to base64.
 *
 * This function is specifically written to mirror the native backend hashing function used by
 * `@discord/intl-loader-core`, to be able to hash names at runtime.
 */
export declare function runtimeHashMessageKey(key: string): string;
