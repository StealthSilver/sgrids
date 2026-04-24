import React, { useState, useEffect } from "react";
import { Points } from "../../types/solvynTypes";
import { createCurvedPath } from "../../lib/solvynUtils";

type SolvynBeamsProps = {
  points: Points | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  pathRefs: React.MutableRefObject<SVGPathElement[]>;
  beamRefs: React.MutableRefObject<{ circle: SVGPathElement | null; core: SVGPathElement | null; pulse: SVGCircleElement | null }[]>;
  isMobile?: boolean;
  isTablet?: boolean;
};

const SolvynBeamsInner: React.FC<SolvynBeamsProps> = ({
  points,
  containerRef,
  pathRefs,
  beamRefs,
  isMobile = false,
  isTablet = false,
}) => {
  const [dimensions, setDimensions] = useState({ width: 700, height: 700 });
  
  // Responsive stroke widths for base lines
  const baseStrokeWidth = isMobile ? 1 : isTablet ? 1.5 : 2;

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({ width: rect.width, height: rect.height });
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    
    // Update when points change (icons might have moved)
    const timeoutId = setTimeout(updateDimensions, 100);
    
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timeoutId);
    };
  }, [containerRef, points]);

  if (!points) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      {points &&
        points.targets.map((target, i) => {
          // Per-target origin override so that beams can emanate from the
          // left or right edge of the central logo depending on which side
          // the icon sits on. Falls back to `points.origin` for layouts
          // that don't need this (e.g. the Services beams).
          const originPoint = points.originsPerTarget?.[i] ?? points.origin;
          const pathD = createCurvedPath(originPoint.x, originPoint.y, target.x, target.y);
          return (
            <g key={`line-${i}`}>
              {/* Base line - gray */}
              <path
                d={pathD}
                stroke="currentColor"
                strokeWidth={baseStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-300 dark:text-gray-700"
                opacity={0.6}
                fill="none"
              />

              {/* Path for measuring length */}
              <path
                ref={(el) => {
                  if (!el) return;
                  pathRefs.current[i] = el;
                }}
                d={pathD}
                stroke="transparent"
                strokeWidth={baseStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity={0}
              />

              {/* Continuous animated beam - outer glow (always fully lit) */}
              <path
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].circle = el;
                }}
                d={pathD}
                stroke="rgba(156, 163, 175, 0.35)"
                strokeWidth={isMobile ? "1.5" : isTablet ? "2" : "2.5"}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#softGlow)"
              />

              {/* Continuous animated beam - inner core (always fully lit) */}
              <path
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].core = el;
                }}
                d={pathD}
                stroke="rgba(156, 163, 175, 0.65)"
                strokeWidth={isMobile ? "0.75" : isTablet ? "1" : "1.5"}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Gray pulse circle that travels along the path */}
              <circle
                ref={(el) => {
                  if (!el) return;
                  beamRefs.current[i].pulse = el;
                }}
                r={isMobile ? 4 : isTablet ? 5 : 6}
                fill="rgb(251, 146, 60)"
                opacity={0}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(251, 146, 60, 0.8))",
                }}
              />
            </g>
          );
        })}
    </svg>
  );
};

// Memoize: once the beams mount the only prop that actually changes is
// `points` (same ref when nothing moved, because the parent already
// short-circuits in measure()). Previously, every icon-active state flip in
// the parent would re-render the entire 12-path SVG tree.
export const SolvynBeams = React.memo(SolvynBeamsInner);

