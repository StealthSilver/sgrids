import type { MotionProps, Transition } from "framer-motion";

/**
 * Scroll-reveal motion presets for the marketing site.
 *
 * Instead of a plain opacity fade, sections "rise + sharpen" into place via a
 * directional slide combined with a quick blur-to-focus settle. Opacity stays
 * at 1 throughout, so content is never washed out — it reads as data being
 * sharpened on entry, which fits the SCADA / grid / energy aesthetic of the
 * site (animated beams, scan lines, focused dashboards).
 *
 * The result feels "energetic" without ever crossfading, and it works on
 * every element regardless of shape (cards, headings, paragraphs, logos).
 */

// out-quart easing — strong start, smooth tail. Plays nicely with reveals
// because the largest motion happens first and gracefully settles.
export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "left" | "right";

const DEFAULT_OFFSET = 56;

export interface RevealOptions {
  direction?: Direction;
  /** Pixel offset for the directional slide. */
  offset?: number;
  /** Initial scale before settling at 1. Subtle by default. */
  scaleFrom?: number;
  /** Initial blur radius (in px) that resolves to 0 on entry. Set to 0 to disable. */
  blur?: number;
  transition?: Partial<Transition>;
  /** Fraction of the element that must be visible before triggering. */
  amount?: number | "some" | "all";
  /** Root margin for the underlying IntersectionObserver. */
  margin?: string;
  once?: boolean;
}

const buildHidden = (direction: Direction, offset: number) => {
  if (direction === "up") return { y: offset };
  if (direction === "down") return { y: -offset };
  if (direction === "left") return { x: offset };
  return { x: -offset };
};

const buildVisible = (direction: Direction) =>
  direction === "up" || direction === "down" ? { y: 0 } : { x: 0 };

/**
 * Returns motion props for a scroll-triggered "slide + settle" reveal:
 *   1. The element starts offset along the scroll axis, slightly scaled down,
 *      and softly blurred — no opacity drop.
 *   2. As it enters the viewport it slides into place, scales back to 1, and
 *      sharpens into focus.
 *
 * Compose with the spread operator:
 *
 *   <motion.div {...reveal({ transition: { duration: 0.9, delay: 0.1 } })}>
 */
export const reveal = (options: RevealOptions = {}): MotionProps => {
  const {
    direction = "up",
    offset = DEFAULT_OFFSET,
    scaleFrom = 0.97,
    blur = 8,
    transition,
    amount = 0.15,
    margin = "0px 0px -10% 0px",
    once = true,
  } = options;

  const hiddenSlide = buildHidden(direction, offset);
  const visibleSlide = buildVisible(direction);

  const hiddenFilter = blur > 0 ? { filter: `blur(${blur}px)` } : {};
  const visibleFilter = blur > 0 ? { filter: "blur(0px)" } : {};

  return {
    initial: { ...hiddenSlide, scale: scaleFrom, ...hiddenFilter },
    whileInView: { ...visibleSlide, scale: 1, ...visibleFilter },
    viewport: { once, amount, margin },
    transition: { duration: 0.9, ease: REVEAL_EASE, ...transition },
  };
};

/**
 * Scale-only reveal — useful for centerpieces (logos, animation containers)
 * where we want a subtle "materialize" without a directional slide. No opacity
 * is animated.
 */
export interface RevealScaleOptions {
  from?: number;
  blur?: number;
  transition?: Partial<Transition>;
  amount?: number | "some" | "all";
  margin?: string;
  once?: boolean;
}

export const revealScale = (options: RevealScaleOptions = {}): MotionProps => {
  const {
    from = 0.95,
    blur = 6,
    transition,
    amount = 0.15,
    margin = "0px 0px -10% 0px",
    once = true,
  } = options;

  const hiddenFilter = blur > 0 ? { filter: `blur(${blur}px)` } : {};
  const visibleFilter = blur > 0 ? { filter: "blur(0px)" } : {};

  return {
    initial: { scale: from, ...hiddenFilter },
    whileInView: { scale: 1, ...visibleFilter },
    viewport: { once, amount, margin },
    transition: { duration: 0.9, ease: REVEAL_EASE, ...transition },
  };
};
