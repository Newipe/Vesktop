import { ILanguageRegistration } from "@vap/shiki";
export declare const JSON_REPO = "Vencord/ShikiPluginAssets";
export declare const JSON_REPO_COMMIT = "75d69df9fdf596a31eef8b7f6f891231a6feab44";
export declare const JSON_URL = "https://cdn.jsdelivr.net/gh/Vencord/ShikiPluginAssets@75d69df9fdf596a31eef8b7f6f891231a6feab44/grammars.json";
export declare const shikiRepoGrammar: (name: string) => string;
export interface Language {
    name: string;
    id: string;
    devicon?: string;
    grammarUrl: string;
    grammar?: ILanguageRegistration["grammar"];
    scopeName: string;
    aliases?: string[];
    custom?: boolean;
}
export interface LanguageJson {
    name: string;
    displayName: string;
    scopeName: string;
    devicon?: string;
    aliases?: string[];
}
export declare const languages: Record<string, Language>;
export declare const loadLanguages: () => Promise<void>;
export declare const getGrammar: (lang: Language) => Promise<NonNullable<ILanguageRegistration["grammar"]>>;
export declare function resolveLang(idOrAlias: string): Language | null;
