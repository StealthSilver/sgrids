import { useCallback, useEffect, useState } from "react";

/**
 * Delays hub-and-spoke beam RAF until external raster/SVG images and webfonts
 * have settled, then runs a double rAF layout flush. Prevents the beam loop
 * from starting on stale geometry and restarting when late loads shift layout.
 */
export function useDiagramAnimationReady(mounted: boolean, imageSlotCount: number) {
  const [fontsReady, setFontsReady] = useState(false);
  const [loadedMask, setLoadedMask] = useState(0);
  const [flushReady, setFlushReady] = useState(false);
  const [forcedReady, setForcedReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (!cancelled) setFontsReady(true);
      });
    } else {
      setFontsReady(true);
    }
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setForcedReady(true), 10_000);
    return () => clearTimeout(t);
  }, []);

  const markDiagramImageLoaded = useCallback((slotIndex: number) => {
    setLoadedMask((prev) => prev | (1 << slotIndex));
  }, []);

  const allImagesLoaded =
    imageSlotCount <= 0 ? true : loadedMask === (1 << imageSlotCount) - 1;

  useEffect(() => {
    if (!mounted || !fontsReady || !allImagesLoaded) {
      setFlushReady(false);
      return;
    }
    let cancelled = false;
    let raf0 = 0;
    let raf1 = 0;
    raf0 = requestAnimationFrame(() => {
      raf1 = requestAnimationFrame(() => {
        if (!cancelled) setFlushReady(true);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf0);
      cancelAnimationFrame(raf1);
    };
  }, [mounted, fontsReady, allImagesLoaded]);

  const animationReady =
    mounted && (forcedReady || (fontsReady && allImagesLoaded && flushReady));

  return { animationReady, markDiagramImageLoaded };
}
