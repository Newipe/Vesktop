import * as t from "@vencord/discord-types";
export declare const Modal: t.Modal;
export declare const ConfirmModal: t.ConfirmModal;
export declare const openMediaModal: (props: t.MediaModalProps) => void;
export declare const openModalLazy: (renderModal: () => Promise<t.RenderModal>, options?: t.ModalOptions & {
    contextKey?: string;
}) => Promise<string>, openModal: (renderModal: t.RenderModal, options?: t.ModalOptions, contextKey?: string) => string, closeModal: (modalKey: string, contextKey?: string) => void, closeAllModals: () => void;
