import { ReplaceFn } from "../../../../utils/types";
interface PatchPreviewProps {
    module: [id: number, factory: Function];
    match: string;
    replacement: string | ReplaceFn;
    setReplacementError(error: any): void;
}
export declare function PatchPreview({ module, match, replacement, setReplacementError }: PatchPreviewProps): import("react").JSX.Element;
export {};
