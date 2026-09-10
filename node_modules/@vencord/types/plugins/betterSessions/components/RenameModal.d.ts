import { SessionInfo } from "../types";
import { RenderModalProps } from "@vencord/discord-types";
export declare function RenameModal({ props, session, state }: {
    props: RenderModalProps;
    session: SessionInfo["session"];
    state: [string, React.Dispatch<React.SetStateAction<string>>];
}): import("react").JSX.Element;
