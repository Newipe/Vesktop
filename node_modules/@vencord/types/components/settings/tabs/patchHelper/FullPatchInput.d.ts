import { ReplaceFn } from "../../../../utils/types";
export interface FullPatchInputProps {
    setFind(v: string): void;
    setParsedFind(v: string | RegExp): void;
    setMatch(v: string): void;
    setReplacement(v: string | ReplaceFn): void;
}
export declare function FullPatchInput({ setFind, setParsedFind, setMatch, setReplacement }: FullPatchInputProps): import("react").JSX.Element;
