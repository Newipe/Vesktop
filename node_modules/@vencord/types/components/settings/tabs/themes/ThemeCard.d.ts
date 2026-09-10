import { UserThemeHeader } from "../../../../main/themes";
interface ThemeCardProps {
    theme: UserThemeHeader;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    onDelete: () => void;
}
export declare function ThemeCard({ theme, enabled, onChange, onDelete }: ThemeCardProps): import("react").JSX.Element;
export {};
