import { Logger } from "../../utils/Logger";
export declare const logger: Logger;
export declare const getCloudUrl: () => URL;
export declare function checkCloudUrlCsp(): Promise<boolean>;
export declare function getAuthorization(): Promise<string>;
export declare function deauthorizeCloud(): Promise<void>;
export declare function authorizeCloud(): Promise<void>;
export declare function getCloudAuth(): Promise<string>;
