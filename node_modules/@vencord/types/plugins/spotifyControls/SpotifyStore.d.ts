export interface Track {
    id: string;
    name: string;
    duration: number;
    isLocal: boolean;
    album: {
        id: string;
        name: string;
        image: {
            height: number;
            width: number;
            url: string;
        };
    };
    artists: {
        id: string;
        href: string;
        name: string;
        type: string;
        uri: string;
    }[];
}
interface Device {
    id: string;
    is_active: boolean;
}
type Repeat = "off" | "track" | "context";
export declare const SpotifyStore: {
    mPosition: number;
    _start: number;
    track: Track | null;
    device: Device | null;
    isPlaying: boolean;
    repeat: Repeat;
    shuffle: boolean;
    volume: number;
    isSettingPosition: boolean;
    openExternal(path: string): void;
    get position(): number;
    set position(p: number);
    prev(): void;
    next(): void;
    setVolume(percent: number): void;
    setPlaying(playing: boolean): void;
    setRepeat(state: Repeat): void;
    setShuffle(state: boolean): void;
    seek(ms: number): any;
    _req(method: "post" | "get" | "put", route: string, data?: any): any;
    getName(): string;
    addChangeListener(callback: import("@vencord/discord-types").Callback): void;
    addConditionalChangeListener(callback: () => boolean, preemptive?: boolean): void;
    addReactChangeListener(callback: import("@vencord/discord-types").Callback): void;
    removeChangeListener(callback: import("@vencord/discord-types").Callback): void;
    removeReactChangeListener(callback: import("@vencord/discord-types").Callback): void;
    doEmitChanges(event: import("@vencord/discord-types").FluxEvent): void;
    emitChange(): void;
    getDispatchToken(): string;
    initialize(): void;
    initializeIfNeeded(): void;
    mustEmitChanges(callback?: import("@vencord/discord-types").ActionHandler): void;
    registerActionHandlers(actionHandlers: import("@vencord/discord-types").ActionHandlers, band?: number): void;
    syncWith(stores: import("@vencord/discord-types").FluxStore[], callback: import("@vencord/discord-types").SyncCallback, timeout?: number): void;
    waitFor(...stores: import("@vencord/discord-types").FluxStore[]): void;
};
export {};
