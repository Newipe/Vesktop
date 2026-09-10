import "./Switch.css";
export interface SwitchProps {
    disabled?: boolean;
    checked: boolean;
    onChange: (checked: boolean) => void;
}
export declare function Switch({ checked, onChange, disabled }: SwitchProps): import("react").JSX.Element;
