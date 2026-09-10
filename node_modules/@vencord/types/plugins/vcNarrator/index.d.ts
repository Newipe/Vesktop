import { ReporterTestable } from "../../utils/types";
interface VoiceStateChangeEvent {
    userId: string;
    channelId?: string;
    oldChannelId?: string;
    deaf: boolean;
    mute: boolean;
    selfDeaf: boolean;
    selfMute: boolean;
    sessionId: string;
}
declare const _default: {
    name: string;
    description: string;
    tags: ("Accessibility" | "Voice")[];
    authors: {
        name: string;
        id: bigint;
    }[];
    reporterTestable: ReporterTestable;
    settings: import("../../utils/types").DefinedSettings<{
        voice: {
            type: import("../../utils/types").OptionType.COMPONENT;
            component: typeof import("./VoiceSetting").VoiceSettingSection;
            readonly default: string | undefined;
        };
        volume: {
            type: import("../../utils/types").OptionType.SLIDER;
            description: string;
            default: number;
            markers: number[];
            stickToMarkers: false;
        };
        rate: {
            type: import("../../utils/types").OptionType.SLIDER;
            description: string;
            default: number;
            markers: number[];
            stickToMarkers: false;
        };
        sayOwnName: {
            description: string;
            type: import("../../utils/types").OptionType.BOOLEAN;
            default: false;
        };
        latinOnly: {
            description: string;
            type: import("../../utils/types").OptionType.BOOLEAN;
            default: false;
        };
        joinMessage: {
            type: import("../../utils/types").OptionType.STRING;
            description: string;
            default: string;
        };
        leaveMessage: {
            type: import("../../utils/types").OptionType.STRING;
            description: string;
            default: string;
        };
        moveMessage: {
            type: import("../../utils/types").OptionType.STRING;
            description: string;
            default: string;
        };
        muteMessage: {
            type: import("../../utils/types").OptionType.STRING;
            description: string;
            default: string;
        };
        unmuteMessage: {
            type: import("../../utils/types").OptionType.STRING;
            description: string;
            default: string;
        };
        deafenMessage: {
            type: import("../../utils/types").OptionType.STRING;
            description: string;
            default: string;
        };
        undeafenMessage: {
            type: import("../../utils/types").OptionType.STRING;
            description: string;
            default: string;
        };
    }, {}>;
    flux: {
        VOICE_STATE_UPDATES({ voiceStates }: {
            voiceStates: VoiceStateChangeEvent[];
        }): void;
        AUDIO_TOGGLE_SELF_MUTE(): void;
        AUDIO_TOGGLE_SELF_DEAF(): void;
    };
    start(): void;
    settingsAboutComponent(): import("react").JSX.Element;
} & Record<PropertyKey, any> & import("../../utils/types").Plugin;
export default _default;
