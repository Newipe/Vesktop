import "./FormSwitch.css";
import type { PropsWithChildren, ReactNode } from "react";
export interface FormSwitchProps {
    title: ReactNode;
    description?: ReactNode;
    value: boolean;
    onChange(value: boolean): void;
    className?: string;
    disabled?: boolean;
    hideBorder?: boolean;
}
export declare function FormSwitch({ onChange, title, value, description, disabled, className, hideBorder }: FormSwitchProps): import("react").JSX.Element;
export declare function FormSwitchCompat({ note, children, ...restProps }: PropsWithChildren<any>): import("react").JSX.Element;
