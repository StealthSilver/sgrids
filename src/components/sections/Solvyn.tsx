"use client";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { IconState, Points } from "../../types/solvynTypes";
import {
  TaxIcon,
  ClimateIcon,
  TreasuryIcon,
  ElementsIcon,
  PaymentsIcon,
  WindmillIcon,
  SolarPanelIcon,
  BatteryIcon,
  ForecastingSchedulingIcon,
  TradingDeckIcon,
  ReportingIcon,
  BidOptimizationIcon,
} from "../ui/SolvynIcons";
import { SolvynIconNode } from "../ui/SolvynIconNode";
import { SolvynBeams } from "../ui/SolvynBeams";
import { useSolvynAnimation } from "../../hooks/useSolvynAnimation";
import { useDiagramAnimationReady } from "@/lib/useDiagramAnimationReady";

const ICON_CONFIG = [
  { id: "tax" as const, label: "Merchant Services", component: TaxIcon },
  { id: "climate" as const, label: "Energy Portfolio Management", component: ClimateIcon },
  { id: "treasury" as const, label: "Ancillary Services", component: TreasuryIcon },
  { id: "elements" as const, label: "Work Order Management", component: ElementsIcon },
  { id: "payments" as const, label: "Grid Code Adherence", component: PaymentsIcon },
  { id: "windmill" as const, label: "Wind", component: WindmillIcon },
  { id: "solar" as const, label: "Solar", component: SolarPanelIcon },
  { id: "battery" as const, label: "BESS", component: BatteryIcon },
  { id: "forecasting" as const, label: "Forecasting and Scheduling", component: ForecastingSchedulingIcon },
  { id: "trading" as const, label: "Trading Desk", component: TradingDeckIcon },
  { id: "reporting" as const, label: "Smart Analytics & Reporting", component: ReportingIcon },
  { id: "bidopt" as const, label: "Bid Optimization", component: BidOptimizationIcon },
];

// Desktop positions: Uniformly spaced grid - 6 icons on left, 6 on right
// Order: tax, climate, treasury, elements, payments, windmill, solar, battery, forecasting, trading, reporting, bidopt
// Increased vertical spacing with ~16% gaps: ~5%, ~21%, ~37%, ~53%, ~69%, ~85%
const ICON_POSITIONS_DESKTOP = [
  // LEFT SIDE - Row 1 (top)
  { top: "5%", left: "3%", delay: 0.6, borderColor: "orange" as const },
  // RIGHT SIDE - Row 1 (top)
  { top: "5%", right: "3%", delay: 0.7, borderColor: "orange" as const },
  // LEFT SIDE - Row 2
  { top: "21%", left: "3%", delay: 0.8, borderColor: "purple" as const },
  // RIGHT SIDE - Row 2
  { top: "21%", right: "3%", delay: 1.0, borderColor: "purple" as const },
  // LEFT SIDE - Row 3
  { top: "37%", left: "3%", delay: 1.1, borderColor: "orange" as const },
  // RIGHT SIDE - Row 3
  { top: "37%", right: "5%", delay: 1.2, borderColor: "purple" as const },
  // LEFT SIDE - Row 4
  { top: "53%", left: "5%", delay: 1.3, borderColor: "orange" as const },
  // RIGHT SIDE - Row 4
  { top: "53%", right: "5%", delay: 1.4, borderColor: "purple" as const },
  // LEFT SIDE - Row 5
  { top: "69%", left: "3%", delay: 1.5, borderColor: "orange" as const },
  // RIGHT SIDE - Row 5
  { top: "69%", right: "4%", delay: 1.6, borderColor: "purple" as const },
  // LEFT SIDE - Row 6 (bottom)
  { top: "85%", left: "3%", delay: 1.7, borderColor: "orange" as const },
  // RIGHT SIDE - Row 6 (bottom)
  { top: "85%", right: "3%", delay: 1.8, borderColor: "purple" as const },
];

type IconPosition = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
};

// Mobile/Tablet positions: Uniformly spaced grid for smaller screens
// 6 rows evenly spaced with increased gaps: ~5%, ~18%, ~31%, ~44%, ~57%, ~70%, ~83%
const ICON_POSITIONS_MOBILE = [
  // Row 1 - left side
  { top: "5%", left: "2%", delay: 0.6, borderColor: "orange" as const },
  // Row 1 - right side
  { top: "5%", right: "2%", delay: 0.7, borderColor: "orange" as const },
  // Row 2 - left side
  { top: "20%", left: "2%", delay: 0.8, borderColor: "purple" as const },
  // Row 2 - right side
  { top: "20%", right: "2%", delay: 1.0, borderColor: "purple" as const },
  // Row 3 - left side
  { top: "35%", left: "0%", delay: 1.1, borderColor: "orange" as const },
  // Row 3 - right side
  { top: "35%", right: "13%", delay: 1.2, borderColor: "purple" as const },
  // Row 4 - left side
  { top: "50%", left: "9%", delay: 1.3, borderColor: "orange" as const },
  // Row 4 - right side
  { top: "50%", right: "13%", delay: 1.4, borderColor: "purple" as const },
  // Row 5 - left side
  { top: "65%", left: "-2%", delay: 1.5, borderColor: "orange" as const },
  // Row 5 - right side
  { top: "65%", right: "9%", delay: 1.6, borderColor: "purple" as const },
  // Row 6 - left side
  { top: "80%", left: "-2%", delay: 1.7, borderColor: "orange" as const },
  // Row 6 - right side
  { top: "80%", right: "7%", delay: 1.8, borderColor: "purple" as const },
];

// Pre-computed stable-per-layout {position} objects so SolvynIconNode's
// React.memo comparison doesn't bust on fresh object identity every render.
const extractPositions = (rows: typeof ICON_POSITIONS_DESKTOP): IconPosition[] =>
  rows.map(({ delay: _d, borderColor: _b, ...rest }) => rest);
const POSITIONS_DESKTOP_STABLE = extractPositions(ICON_POSITIONS_DESKTOP);
const POSITIONS_MOBILE_STABLE = extractPositions(ICON_POSITIONS_MOBILE);

export const Solvyn: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sgridsRef = useRef<HTMLDivElement | null>(null);

  // Screen size detection for responsive layout. Kept in a single state
  // object so each resize only triggers one React update instead of two.
  const [screen, setScreen] = useState<{ isMobile: boolean; isTablet: boolean; mounted: boolean }>({
    isMobile: false,
    isTablet: false,
    mounted: false,
  });
  const { isMobile, isTablet, mounted } = screen;

  const { animationReady: beamAnimationReady, markDiagramImageLoaded } = useDiagramAnimationReady(
    mounted,
    1
  );

  useEffect(() => {
    const compute = () => {
      const width = window.innerWidth;
      const nextMobile = width < 640;
      const nextTablet = width >= 640 && width < 1024;
      setScreen((prev) =>
        prev.isMobile === nextMobile && prev.isTablet === nextTablet && prev.mounted
          ? prev
          : { isMobile: nextMobile, isTablet: nextTablet, mounted: true }
      );
    };
    compute();
    // Throttle resize with rAF so rapid resize events collapse into one
    // React update per frame.
    let rafId = 0;
    const onResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        compute();
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Create refs for all icons - must be at top level, not in useMemo
  const iconRefsRef = useRef<React.RefObject<HTMLDivElement | null>[]>(
    ICON_CONFIG.map(() => React.createRef<HTMLDivElement | null>())
  );
  const iconRefs = iconRefsRef.current;

  const [icons, setIcons] = useState<IconState[]>(
    ICON_CONFIG.map((config, idx) => ({
      id: config.id,
      label: config.label,
      ref: iconRefs[idx],
      active: false,
    }))
  );

  const [points, setPoints] = useState<Points | null>(null);

  // Select positions based on screen size
  const ICON_POSITIONS = isMobile || isTablet ? ICON_POSITIONS_MOBILE : ICON_POSITIONS_DESKTOP;
  const stablePositions = isMobile || isTablet ? POSITIONS_MOBILE_STABLE : POSITIONS_DESKTOP_STABLE;

  // Memoize the container style so the element doesn't receive a fresh
  // style object on every render.
  const containerStyle = useMemo(
    () => ({
      height: isMobile ? "100vh" : isTablet ? "100vh" : "90vh",
      maxHeight: isMobile ? "700px" : isTablet ? "850px" : "900px",
      minHeight: isMobile ? "600px" : isTablet ? "700px" : "700px",
    }),
    [isMobile, isTablet]
  );

  // Calculate SVG icon size based on screen size
  const svgIconSize = isMobile ? 16 : isTablet ? 20 : 36;

  const pathRefs = useRef<SVGPathElement[]>([]);
  const beamRefs = useRef<{ circle: SVGPathElement | null; core: SVGPathElement | null; pulse: SVGCircleElement | null }[]>(
    Array.from({ length: 12 }, () => ({ circle: null, core: null, pulse: null }))
  );
  const progressRefs = useRef<number[]>([
    0, 0.091, 0.182, 0.273, 0.364, 0.455, 0.545, 0.636, 0.727, 0.818, 0.909, 1.0,
  ]);

  // Measure positions - use useCallback to prevent recreation.
  // Beams must start from the LEFT or RIGHT border of the central Solvyn
  // logo (depending on which side the target icon sits on) and land at the
  // OPPOSING horizontal edge of each icon square — i.e. icons to the left of
  // the logo receive a beam at the center of their right border, and icons
  // to the right of the logo receive a beam at the center of their left
  // border. This produces a clean hub-and-spoke look where every line
  // terminates exactly on the icon's edge.
  const measure = useCallback(() => {
    const container = containerRef.current;
    const sgridsEl = sgridsRef.current;
    if (!container || !sgridsEl) return;

    const containerRect = container.getBoundingClientRect();
    if (containerRect.width === 0 || containerRect.height === 0) return;

    const sgridsRect = sgridsEl.getBoundingClientRect();
    if (sgridsRect.width === 0 || sgridsRect.height === 0) return;

    // Center-left and center-right edges of the Solvyn logo, in container
    // coordinates. The vertical center is shared by both.
    const logoCenterY = sgridsRect.top + sgridsRect.height / 2 - containerRect.top;
    const leftEdge = {
      x: sgridsRect.left - containerRect.left,
      y: logoCenterY,
    };
    const rightEdge = {
      x: sgridsRect.right - containerRect.left,
      y: logoCenterY,
    };
    const logoCenterX = sgridsRect.left + sgridsRect.width / 2 - containerRect.left;

    const targets: { x: number; y: number }[] = [];
    const originsPerTarget: { x: number; y: number }[] = [];

    for (const ref of iconRefs) {
      const el = ref.current;
      if (!el) continue;
      // Prefer the inner icon square (marked via data-beam-target) so we
      // land on the actual border of the icon, not the outer column that
      // also contains the text label.
      const targetEl = (el.querySelector("[data-beam-target]") as HTMLElement | null) || el;
      const r = targetEl.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;

      const iconCenterY = r.top + r.height / 2 - containerRect.top;
      const iconCenterX = r.left + r.width / 2 - containerRect.left;

      // Icons to the left of the logo connect out of the LEFT edge of the
      // logo and into the RIGHT edge of the icon. Icons to the right of the
      // logo connect out of the RIGHT edge of the logo and into the LEFT
      // edge of the icon.
      const isLeftSide = iconCenterX < logoCenterX;
      if (isLeftSide) {
        targets.push({
          x: r.right - containerRect.left,
          y: iconCenterY,
        });
        originsPerTarget.push(leftEdge);
      } else {
        targets.push({
          x: r.left - containerRect.left,
          y: iconCenterY,
        });
        originsPerTarget.push(rightEdge);
      }
    }

    if (targets.length !== 12) return;

    // Keep a single `origin` for backward compatibility (used by consumers
    // that don't know about per-target origins); the per-target overrides
    // are what actually drive the rendered paths.
    const origin = {
      x: logoCenterX,
      y: logoCenterY,
    };

    setPoints((prevPoints) => {
      const tolerance = 1;
      if (prevPoints && prevPoints.originsPerTarget && prevPoints.originsPerTarget.length === originsPerTarget.length) {
        const originChanged =
          Math.abs(prevPoints.origin.x - origin.x) > tolerance ||
          Math.abs(prevPoints.origin.y - origin.y) > tolerance;
        const targetsChanged = prevPoints.targets.some((t, i) => {
          const n = targets[i];
          if (!n) return true;
          return Math.abs(t.x - n.x) > tolerance || Math.abs(t.y - n.y) > tolerance;
        });
        const originsChanged = prevPoints.originsPerTarget.some((o, i) => {
          const n = originsPerTarget[i];
          if (!n) return true;
          return Math.abs(o.x - n.x) > tolerance || Math.abs(o.y - n.y) > tolerance;
        });
        if (!originChanged && !targetsChanged && !originsChanged) return prevPoints;
      }
      return { origin, targets, originsPerTarget };
    });
  }, [iconRefs]);

  useEffect(() => {
    if (!mounted) return;

    // Coalesce measure calls into one per animation frame. Previously every
    // observer callback and timer triggered its own rAF double-wrap, which
    // meant 10+ redundant measures piling up during entry animations.
    let pendingRaf = 0;
    const scheduleMeasure = () => {
      if (pendingRaf) return;
      pendingRaf = requestAnimationFrame(() => {
        pendingRaf = 0;
        measure();
      });
    };

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (sgridsRef.current) resizeObserver.observe(sgridsRef.current);
    iconRefs.forEach((ref) => {
      if (ref.current) resizeObserver.observe(ref.current);
    });

    // IntersectionObserver: re-run measurements whenever the section scrolls
    // into view. Without this we'd measure too early.
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) scheduleMeasure();
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) intersectionObserver.observe(containerRef.current);

    scheduleMeasure();

    // A handful of sparse fallback measures during the first ~1s covers the
    // period right after mount.
    const timers = [
      setTimeout(scheduleMeasure, 150),
      setTimeout(scheduleMeasure, 500),
      setTimeout(scheduleMeasure, 1200),
    ];

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (pendingRaf) cancelAnimationFrame(pendingRaf);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [measure, isMobile, isTablet, mounted, iconRefs]);

  // Animation hook
  useSolvynAnimation({
    points,
    pathRefs,
    beamRefs,
    progressRefs,
    setIcons,
    enabled: beamAnimationReady,
  });

  return (
    <section id="solvyn"
      ref={sectionRef}
      className="relative w-full lg:min-h-screen py-4 sm:py-8 md:py-12 lg:py-20 overflow-hidden bg-white dark:bg-black transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* SOLVYN Title */}
          <div className="mb-2 sm:mb-4 md:mb-6 lg:mb-8">
            <p className="text-center text-gray-500 dark:text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-4 md:mb-6 lg:mb-8 font-sans">
              Solvyn
            </p>
          </div>

          {/* Centered Text Content */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center max-w-4xl font-sans">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-gray-900 dark:text-white tracking-tight">
              Innovation With Purpose
            </h2>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Innovation is our engine, purpose is our compass, and experience is the ground we stand on.
            </p>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              <span className="font-semibold text-orange-600 dark:text-orange-400">Solvyn</span> was built
              for the complexity of renewable energy — to turn scattered data into unified intelligence
              across every layer of operations, from the control room to the boardroom.
            </p>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              More than a platform, Solvyn is a new way of running energy: a secure, AI-driven system that
              unifies <span className="font-semibold">SCADA</span>, <span className="font-semibold">EMS</span>
              , <span className="font-semibold">PPC</span>, <span className="font-semibold">EPM</span>, and{" "}
              <span className="font-semibold">Intelligent Bidding (IB)</span>. It&apos;s designed for{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">solar</span>,{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">wind</span>,{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">BESS</span>,{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">hybrid</span>, and{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">green hydrogen</span>, and
              built to serve those who carry the responsibility of the transition — operators seeking
              reliability, investors seeking returns, and governments driving national clean energy goals.
            </p>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed font-medium text-gray-900 dark:text-gray-100">
              Where others give you fragments, Solvyn gives you the whole picture — automation that scales,
              compliance that&apos;s built in, and intelligence that&apos;s always one step ahead.
            </p>
          </div>

          {/* Centered Animation Container */}
          <div className="w-full max-w-5xl">
            <div
              ref={containerRef}
              className="relative flex items-center justify-center w-full"
              style={containerStyle}
            >
              {/* Center SGrids Logo */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 sm:gap-3"
              >
                <div
                  ref={sgridsRef}
                  className={`relative rounded-2xl bg-gradient-to-br from-orange-500 via-purple-600 to-orange-500 p-[2px] shadow-2xl hover:shadow-orange-500/50 dark:hover:shadow-orange-500/70 transition-all duration-500 group ${
                    isMobile ? "w-12 h-12 sm:w-16 sm:h-16" : isTablet ? "w-16 h-16 md:w-20 md:h-20" : "w-20 h-20 md:w-24 md:h-24"
                  }`}
                >
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center backdrop-blur-sm p-2 sm:p-3">
                    <Image
                      alt="SGrids Logo"
                      width={isMobile ? 40 : isTablet ? 60 : 80}
                      height={isMobile ? 40 : isTablet ? 60 : 80}
                      src="/sgrids.svg"
                      onLoad={() => markDiagramImageLoaded(0)}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                {/* Solvyn text box */}
                <div className={`rounded-lg bg-gradient-to-br from-orange-50 to-purple-50 dark:from-orange-950/30 dark:to-purple-950/30 border-2 border-orange-500/30 dark:border-orange-500/50 shadow-lg ${
                  isMobile ? "px-2 py-1" : "px-4 py-2"
                }`}>
                  <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-purple-600 dark:from-orange-400 dark:to-purple-400 ${
                    isMobile ? "text-sm" : "text-lg"
                  }`}>
                    Solvyn
                  </span>
                </div>
              </div>

              {/* Icon Nodes */}
              {icons.map((icon, idx) => {
                const config = ICON_CONFIG[idx];
                const positionData = ICON_POSITIONS[idx];

                return (
                  <SolvynIconNode
                    key={icon.id}
                    icon={icon}
                    IconComponent={config.component}
                    svgIconSize={svgIconSize}
                    position={stablePositions[idx]}
                    animationDelay={positionData.delay}
                    borderColor={positionData.borderColor}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                );
              })}

              {/* SVG Lines and Animated Beams */}
              <SolvynBeams
                points={points}
                containerRef={containerRef}
                pathRefs={pathRefs}
                beamRefs={beamRefs}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solvyn;
