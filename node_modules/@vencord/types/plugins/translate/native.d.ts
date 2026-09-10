import { IpcMainInvokeEvent } from "electron";
export declare function makeDeeplTranslateRequest(_: IpcMainInvokeEvent, pro: boolean, apiKey: string, payload: string): Promise<{
    status: number;
    data: string;
}>;
export declare function makeKagiTranslateRequest(_: IpcMainInvokeEvent, token: string, text: string, sourceLang: string, targetLang: string): Promise<{
    status: number;
    data: any;
}>;
