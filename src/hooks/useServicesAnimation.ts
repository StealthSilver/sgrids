import { useEffect, useRef } from "react";
import { Points, BEAM_SPEED, TOUCH_THRESHOLD } from "../types/solvynTypes";

type UseServicesAnimationProps = {
  points: Points | null;
  pathRefs: React.MutableRefObject<SVGPathElement[]>;
  beamRefs: React.MutableRefObject<{ circle: SVGPathElement | null; core: SVGPathElement | null; pulse: SVGCircleElement | null }[]>;
  progressRefs: React.MutableRefObject<number[]>;
  setIconActive?: (index: number, active: boolean) => void;
  /** When false, the beam RAF loop does not run (waits for images/fonts/layout). */
  enabled?: boolean;
};

// Staggered delays for 4 beams: start at 0, 0.2s, 0.4s, 0.6s
const getInitialDelay = (index: number): number => {
  return index * 0.2; // Each beam starts 0.2s after the previous
};

export const useServicesAnimation = ({
  points,
  pathRefs,
  beamRefs,
  progressRefs,
  setIconActive,
  enabled = true,
}: UseServicesAnimationProps) => {
  const lastTimestampRef = useRef<number | null>(null);
  const pathLengthsRef = useRef<number[]>([]);
  const iconActivationTimeRef = useRef<Map<number, number>>(new Map());
  const ACTIVE_DURATION = 600; // Keep icons active for 600ms after pulse passes
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || !points || points.targets.length < 4) return;

    // Reset start time when points change
    startTimeRef.current = Date.now();

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
    };

    // Initial measurement
    measurePathLengths();
    
    // Re-measure multiple times to ensure paths are rendered and positioned correctly
    const timeoutIds = [
      setTimeout(measurePathLengths, 100),
      setTimeout(measurePathLengths, 300),
      setTimeout(measurePathLengths, 600),
      setTimeout(measurePathLengths, 1000),
    ];

    let rafId = 0;

    const step = (timestamp: number) => {

      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const dt = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const activePaths = pathRefs.current.filter(Boolean);
      if (activePaths.length === 0) {
        rafId = requestAnimationFrame(step);
        return;
      }

      const currentTime = (Date.now() - (startTimeRef.current || 0)) / 1000;

      activePaths.forEach((path, pathIndex) => {
        try {
          const pathLength = pathLengthsRef.current[pathIndex] || path.getTotalLength();
          if (pathLength === 0) return;

          // Calculate initial delay offset
          const initialDelay = getInitialDelay(pathIndex);
          const adjustedTime = Math.max(0, currentTime - initialDelay);

          // Update progress for pulse animation - start from 0 (origin), travel to pathLength (target), then restart
          const distancePerSec = BEAM_SPEED * pathLength;
          let headDistance: number;
          
          if (adjustedTime > 0) {
            // Calculate distance traveled, then use modulo to wrap back to 0 when reaching the end
            const totalDistance = adjustedTime * distancePerSec;
            headDistance = totalDistance % pathLength;
            progressRefs.current[pathIndex] = headDistance / pathLength;
          } else {
            // Before initial delay, stay at origin (0)
            headDistance = 0;
            progressRefs.current[pathIndex] = 0;
          }

          // Keep the continuous beam fully lit (show entire path)
          const beamRef = beamRefs.current[pathIndex];
          if (beamRef.circle) {
            beamRef.circle.setAttributeNS(null, "stroke-dasharray", String(pathLength));
            beamRef.circle.setAttributeNS(null, "stroke-dashoffset", "0");
            // Ensure beam is visible (default opacity)
            if (!beamRef.circle.getAttributeNS(null, "opacity")) {
              beamRef.circle.setAttributeNS(null, "opacity", "1");
            }
          }
          if (beamRef.core) {
            beamRef.core.setAttributeNS(null, "stroke-dasharray", String(pathLength));
            beamRef.core.setAttributeNS(null, "stroke-dashoffset", "0");
            // Ensure core is visible (default opacity)
            if (!beamRef.core.getAttributeNS(null, "opacity")) {
              beamRef.core.setAttributeNS(null, "opacity", "1");
            }
          }

          // Update pulse position (only show after initial delay)
          if (beamRef.pulse && points) {
            if (adjustedTime > 0) {
              const pulsePoint = path.getPointAtLength(headDistance);
              beamRef.pulse.setAttributeNS(null, "cx", String(pulsePoint.x));
              beamRef.pulse.setAttributeNS(null, "cy", String(pulsePoint.y));
              beamRef.pulse.setAttributeNS(null, "opacity", "1");

              // Check if pulse is near target icon
              const target = points.targets[pathIndex];
              if (target && setIconActive) {
                const distance = Math.hypot(pulsePoint.x - target.x, pulsePoint.y - target.y);
                const currentTime = timestamp;
              
                if (distance <= TOUCH_THRESHOLD) {
                  // Pulse reached icon - activate it
                  setIconActive(pathIndex, true);
                  iconActivationTimeRef.current.set(pathIndex, currentTime);

                  // Dim outer glow slightly when hit (lighter glow)
                  if (beamRef.circle) {
                    // reduce outer glow opacity
                    beamRef.circle.setAttributeNS(null, "opacity", "0.12");
                  }
                  // keep core more visible
                  if (beamRef.core) {
                    beamRef.core.setAttributeNS(null, "opacity", "1");
                  }
                } else {
                  // Check if still within active duration
                  const lastActivation = iconActivationTimeRef.current.get(pathIndex);
                  if (lastActivation && currentTime - lastActivation < ACTIVE_DURATION) {
                    setIconActive(pathIndex, true);
                    // keep outer glow dim while active
                    if (beamRef.circle) beamRef.circle.setAttributeNS(null, "opacity", "0.14");
                  } else {
                    setIconActive(pathIndex, false);
                    iconActivationTimeRef.current.delete(pathIndex);
                    // Restore outer glow to default subtle value when not active
                    if (beamRef.circle) beamRef.circle.setAttributeNS(null, "opacity", "0.22");
                  }
                }
              }
            } else {
              // Hide pulse before initial delay
              beamRef.pulse.setAttributeNS(null, "opacity", "0");
            }
          }
        } catch (e) {
          // Swallow errors to avoid breaking raf loop
          // eslint-disable-next-line no-console
          console.error("Error animating beam:", e);
        }
      });

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      timeoutIds.forEach(id => clearTimeout(id));
      lastTimestampRef.current = null;
    };
  }, [enabled, points, pathRefs, beamRefs, progressRefs, setIconActive]);
};
