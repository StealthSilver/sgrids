import { useEffect, useRef, useCallback } from "react";
import { Points, IconState, BEAM_SPEED, TOUCH_THRESHOLD } from "../types/solvynTypes";

type UseSolvynAnimationProps = {
  points: Points | null;
  pathRefs: React.MutableRefObject<SVGPathElement[]>;
  beamRefs: React.MutableRefObject<{ circle: SVGPathElement | null; core: SVGPathElement | null; pulse: SVGCircleElement | null }[]>;
  progressRefs: React.MutableRefObject<number[]>;
  setIcons: React.Dispatch<React.SetStateAction<IconState[]>>;
};

// Staggered delays: top row (0,1) together, then 2-11 one by one
// Delay between each icon after top row: 0.15 seconds
const getInitialDelay = (index: number): number => {
  if (index === 0 || index === 1) return 0; // Top row starts together
  return 0.15 * (index - 1); // Each subsequent icon starts 0.15s after the previous
};

export const useSolvynAnimation = ({
  points,
  pathRefs,
  beamRefs,
  progressRefs,
  setIcons,
}: UseSolvynAnimationProps) => {
  const lastTimestampRef = useRef<number | null>(null);
  const pointsRef = useRef<Points | null>(points);
  const iconActivationTimeRef = useRef<Map<number, number>>(new Map());
  const ACTIVE_DURATION = 800; // Keep icons active for 800ms after pulse passes
  const pathLengthsRef = useRef<number[]>([]);
  const startTimeRef = useRef<number | null>(null);
  // Tracks the last computed active-state per icon index so we can skip
  // invoking the React state setter entirely when nothing changed. Calling
  // setIcons 60x/s (even when it bails out) was still scheduling work on the
  // React scheduler every frame.
  const activeStateRef = useRef<boolean[]>(Array(12).fill(false));
  
  // Update points ref when points change
  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  const checkProximityAndSetActive = useCallback((beamPositions: { x: number; y: number }[]) => {
    const currentPoints = pointsRef.current;
    if (!currentPoints) return;
    const currentTime = Date.now();
    const targets = currentPoints.targets;
    const prevActive = activeStateRef.current;
    let anyChanged = false;
    const nextActive = new Array<boolean>(targets.length);

    const thresholdSq = TOUCH_THRESHOLD * TOUCH_THRESHOLD;

    for (let idx = 0; idx < targets.length; idx++) {
      const pt = targets[idx];
      if (!pt) {
        nextActive[idx] = prevActive[idx] ?? false;
        continue;
      }

      let wasTouched = false;
      for (let b = 0; b < beamPositions.length; b++) {
        const beamPos = beamPositions[b];
        const dx = pt.x - beamPos.x;
        const dy = pt.y - beamPos.y;
        if (dx * dx + dy * dy <= thresholdSq) {
          wasTouched = true;
          iconActivationTimeRef.current.set(idx, currentTime);
          break;
        }
      }

      let isActive = wasTouched;
      if (!wasTouched) {
        const lastActivation = iconActivationTimeRef.current.get(idx);
        if (lastActivation && currentTime - lastActivation < ACTIVE_DURATION) {
          isActive = true;
        } else if (lastActivation) {
          iconActivationTimeRef.current.delete(idx);
        }
      }

      nextActive[idx] = isActive;
      if (prevActive[idx] !== isActive) anyChanged = true;
    }

    if (!anyChanged) return;
    activeStateRef.current = nextActive;

    setIcons((prev) => {
      let mutated = false;
      const newIcons = prev.map((ic, idx) => {
        const isActive = nextActive[idx];
        if (ic.active === isActive) return ic;
        mutated = true;
        return { ...ic, active: isActive };
      });
      return mutated ? newIcons : prev;
    });
  }, [setIcons]);

  useEffect(() => {
    if (!points || points.targets.length < 12) return;

    // Reset start time when points change
    startTimeRef.current = Date.now();

    // Apply the static stroke-dasharray / stroke-dashoffset for the "always
    // fully lit" beams. These values only depend on the total path length and
    // therefore never change between frames — writing them every frame was
    // invalidating the SVG filter cache on the glow paths and forcing the
    // browser to re-run the feGaussianBlur on every render tick.
    const applyStaticBeamAttributes = () => {
      for (let i = 0; i < pathLengthsRef.current.length; i++) {
        const pathLength = pathLengthsRef.current[i];
        if (!pathLength) continue;
        const lenStr = String(pathLength);
        const beamRef = beamRefs.current[i];
        if (beamRef.circle) {
          beamRef.circle.setAttributeNS(null, "stroke-dasharray", lenStr);
          beamRef.circle.setAttributeNS(null, "stroke-dashoffset", "0");
        }
        if (beamRef.core) {
          beamRef.core.setAttributeNS(null, "stroke-dasharray", lenStr);
          beamRef.core.setAttributeNS(null, "stroke-dashoffset", "0");
        }
      }
    };

    // Measure path lengths when points change
    const measurePathLengths = () => {
      pathLengthsRef.current = pathRefs.current.map((path) => {
        if (!path) return 0;
        try {
          return path.getTotalLength();
        } catch {
          return 0;
        }
      });
      applyStaticBeamAttributes();
    };

    // Initial measurement + one short follow-up in case refs aren't ready
    // on first run. Previous versions used 4 staggered timers which was
    // wasteful — a single 200ms follow-up is enough.
    measurePathLengths();
    const timeoutIds = [setTimeout(measurePathLengths, 200)];

    let rafId = 0;

    const step = () => {
      const activePaths = pathRefs.current;
      if (activePaths.length === 0) {
        rafId = requestAnimationFrame(step);
        return;
      }

      const currentTime = (Date.now() - (startTimeRef.current || 0)) / 1000;
      const beamPositions: { x: number; y: number }[] = [];

      for (let pathIndex = 0; pathIndex < activePaths.length; pathIndex++) {
        const path = activePaths[pathIndex];
        if (!path) continue;
        try {
          const pathLength = pathLengthsRef.current[pathIndex];
          if (!pathLength) continue;

          const initialDelay = getInitialDelay(pathIndex);
          const adjustedTime = currentTime - initialDelay;

          const beamRef = beamRefs.current[pathIndex];
          const pulse = beamRef?.pulse;

          if (adjustedTime <= 0) {
            if (pulse) pulse.setAttributeNS(null, "opacity", "0");
            continue;
          }

          const distancePerSec = BEAM_SPEED * pathLength;
          const headDistance = (adjustedTime * distancePerSec) % pathLength;
          progressRefs.current[pathIndex] = headDistance / pathLength;

          if (pulse) {
            const pulsePoint = path.getPointAtLength(headDistance);
            pulse.setAttributeNS(null, "cx", String(pulsePoint.x));
            pulse.setAttributeNS(null, "cy", String(pulsePoint.y));
            pulse.setAttributeNS(null, "opacity", "1");
            beamPositions.push(pulsePoint);
          }
        } catch (e) {
          console.error("Error animating beam:", e);
        }
      }

      checkProximityAndSetActive(beamPositions);

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      timeoutIds.forEach(id => clearTimeout(id));
      lastTimestampRef.current = null;
    };
  }, [points, pathRefs, beamRefs, progressRefs, checkProximityAndSetActive]);
};
