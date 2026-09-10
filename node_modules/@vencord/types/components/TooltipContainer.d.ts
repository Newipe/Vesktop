import { TooltipProps } from "@vencord/discord-types";
export declare function TooltipContainer({ children, ...props }: Omit<TooltipProps, "children"> & {
    children: React.ReactNode;
}): import("react").JSX.Element;
