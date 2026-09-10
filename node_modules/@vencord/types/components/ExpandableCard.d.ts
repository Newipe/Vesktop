import "./ExpandableCard.css";
import { PropsWithChildren } from "react";
export type ExpandableSectionProps = PropsWithChildren<{
    renderContent: () => React.ReactNode;
    className?: string;
    initialExpanded?: boolean;
}>;
/**
 * A card component that can expand and collapse to show/hide content. The header (props.children) is always visible, and the content (props.renderContent) is only visible when expanded.
 */
export declare function ExpandableSection({ children, renderContent: Content, className, initialExpanded }: ExpandableSectionProps): import("react").JSX.Element;
