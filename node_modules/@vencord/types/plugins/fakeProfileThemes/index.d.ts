import "./styles.css";
import { OptionType } from "../../utils/types";
import { UserProfile } from "@vencord/discord-types";
interface Colors {
    primary: number;
    accent: number;
}
declare function SettingsAboutComponentWrapper(): false | import("react").JSX.Element;
declare const _default: {
    name: string;
    description: string;
    tags: ("Appearance" | "Customisation")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    patches: {
        find: string;
        replacement: {
            match: RegExp;
            replace: string;
        };
    }[];
    settingsAboutComponent: typeof SettingsAboutComponentWrapper;
    settings: import("../../utils/types").DefinedSettings<{
        nitroFirst: {
            description: string;
            type: OptionType.SELECT;
            options: ({
                label: string;
                value: true;
                default: true;
            } | {
                label: string;
                value: false;
                default?: undefined;
            })[];
        };
    }, {}>;
    colorDecodeHook(user: UserProfile): any;
    addCopy3y3Button: import("react").FunctionComponent<Colors>;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
