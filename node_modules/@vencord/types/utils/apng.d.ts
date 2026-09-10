/**
 * apng-canvas v2.1.2 - heavily modified and converted to Typescript
 *
 * @copyright 2011-2019 David Mzareulyan
 * @link https://github.com/davidmz/apng-canvas
 * @license MIT
 */
export declare const enum ApngDisposeOp {
    /**
     * no disposal is done on this frame before rendering the next; the contents of the output buffer are left as is.
     */
    NONE = 0,
    /**
     * the frame's region of the output buffer is to be cleared to fully transparent black before rendering the next frame.
     */
    BACKGROUND = 1,
    /**
     * the frame's region of the output buffer is to be reverted to the previous contents before rendering the next frame.
     */
    PREVIOUS = 2
}
export declare const enum ApngBlendOp {
    SOURCE = 0,
    OVER = 1
}
interface Frame {
    width: number;
    height: number;
    left: number;
    top: number;
    delay: number;
    disposeOp: ApngDisposeOp;
    blendOp: ApngBlendOp;
    dataParts?: U8Arr[];
    img: HTMLImageElement;
}
declare class Animation {
    width: number;
    height: number;
    numPlays: number;
    playTime: number;
    frames: Frame[];
}
type U8Arr = Uint8Array<ArrayBuffer>;
export declare function parseAPNG(buffer: ArrayBuffer): Promise<Animation>;
export {};
