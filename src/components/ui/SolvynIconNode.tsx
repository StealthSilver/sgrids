import React from "react";
import { IconState } from "../../types/solvynTypes";

type IconComponentType = React.ComponentType<{ active: boolean; size?: number }>;

type SolvynIconNodeProps = {
  icon: IconState;
  IconComponent: IconComponentType;
  svgIconSize: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform?: string;
  };
  animationDelay: number;
  borderColor?: "orange" | "purple";
  isMobile?: boolean;
  isTablet?: boolean;
  onEntryComplete?: () => void;
};

const SolvynIconNodeInner: React.FC<SolvynIconNodeProps> = ({
  icon,
  IconComponent,
  svgIconSize,
  position,
  borderColor = "orange",
  isMobile = false,
  isTablet = false,
}) => {
  const isActive = icon.active;
  const activeBorderClass =
    borderColor === "orange"
      ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30 shadow-lg shadow-orange-500/50"
      : "border-purple-600 bg-purple-50 dark:bg-purple-950/30 shadow-lg shadow-purple-600/50";
  const hoverBorderClass =
    borderColor === "orange"
      ? "group-hover:border-orange-400 dark:group-hover:border-orange-600"
      : "group-hover:border-purple-500 dark:group-hover:border-purple-600";

  // Responsive sizing
  const iconPadding = isMobile ? "p-1.5" : isTablet ? "p-2" : "p-2.5";
  const iconSize = isMobile ? "w-4 h-4" : isTablet ? "w-5 h-5" : "w-9 h-9";
  const labelSize = isMobile ? "text-[10px]" : isTablet ? "text-[10px] sm:text-[11px]" : "text-[11px]";
  const labelMaxWidth = isMobile ? "max-w-[120px]" : isTablet ? "max-w-[120px]" : "max-w-[100px]";
  const gapSize = isMobile ? "gap-1.5" : isTablet ? "gap-2" : "gap-2.5";

  return (
    <div
      ref={icon.ref as React.Ref<HTMLDivElement>}
      className={`absolute flex flex-col items-center ${gapSize} cursor-pointer group z-10`}
      style={position}
    >
      <div
        data-beam-target
        className={`relative ${iconPadding} rounded-xl border-2 transition-all duration-500 flex items-center justify-center ${
          isActive
            ? activeBorderClass
            : `border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 ${hoverBorderClass}`
        }`}
      >
        <div className={`${iconSize} flex items-center justify-center`}>
          <IconComponent active={isActive} size={svgIconSize} />
        </div>
      </div>
      <span className={`${labelSize} font-semibold text-center text-gray-900 dark:text-gray-100 ${labelMaxWidth} leading-tight px-1.5 sm:px-2 py-0.5 whitespace-normal break-words bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-md shadow-sm`}>
        {icon.label}
      </span>
    </div>
  );
};

// Memoized: the parent re-creates the icons array on every active-state
// change, but the individual icon objects keep reference equality unless
// their own active flag flipped. Combined with stable IconComponent refs,
// React.memo with default shallow comparison means only the single node
// whose `active` actually changed will re-render.
export const SolvynIconNode = React.memo(SolvynIconNodeInner);
