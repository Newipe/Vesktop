import { changes } from "../../../../utils/updater";
export interface CommonProps {
    repo: string;
    repoPending: boolean;
}
export declare function HashLink({ repo, hash, disabled }: {
    repo: string;
    hash: string;
    disabled?: boolean;
}): import("react").JSX.Element;
export declare function Changes({ updates, repo, repoPending }: CommonProps & {
    updates: typeof changes;
}): import("react").JSX.Element;
export declare function Newer(props: CommonProps): import("react").JSX.Element;
export declare function Updatable(props: CommonProps): import("react").JSX.Element;
