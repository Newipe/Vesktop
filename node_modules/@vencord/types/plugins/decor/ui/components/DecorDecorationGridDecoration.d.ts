import { Decoration } from "../../lib/api";
import type { HTMLProps } from "react";
interface DecorDecorationGridDecorationProps extends HTMLProps<HTMLDivElement> {
    decoration: Decoration;
    isSelected: boolean;
    onSelect: () => void;
}
export default function DecorDecorationGridDecoration(props: DecorDecorationGridDecorationProps): import("react").JSX.Element;
export {};
