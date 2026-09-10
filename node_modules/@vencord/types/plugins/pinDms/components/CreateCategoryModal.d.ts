import { RenderModalProps } from "@vencord/discord-types";
export declare const requireSettingsModal: () => Promise<boolean>;
interface Props {
    categoryId: string | null;
    initialChannelId: string | null;
    modalProps: RenderModalProps;
}
export declare function NewCategoryModal({ categoryId, modalProps, initialChannelId }: Props): import("react").JSX.Element | null;
export declare const openCategoryModal: (categoryId: string | null, channelId: string | null) => Promise<string>;
export {};
