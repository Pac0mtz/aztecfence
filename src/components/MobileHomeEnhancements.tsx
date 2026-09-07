import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Mobile-only homepage motion for the Featured Projects rail.
 * Uses its own requestAnimationFrame loop so iOS does not depend on desktop
 * mouse-velocity events. A tap pauses/resumes; swipe gestures remain native.
 */
export default function MobileHomeEnhancements() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/" || !window.matchMedia("(max-width: 767px)").matches) return;

    let cleanup: (() => void) | undefined;
    let attempts = 0;

    const setup = () => {
      const featuredHeading = Array.from(document.querySelectorAll("h2")).find((heading) =>
        heading.textContent?.includes("Featured Projects"),
      );
      const section = featuredHeading?.closest("section");
      const scroller = section?.querySelector<HTMLDivElement>("div.flex.overflow-x-auto");

      if (!scroller) {
        if (attempts++ < 30) window.setTimeout(setup, 100);
        return;
      }

      let paused = false;
      let touching = false;
      let touchStartX = 0;
      let touchStartY = 0;
      let lastTime = performance.now();
      let raf = 0;

      // Disable the Home.tsx desktop velocity loop on mobile by dispatching a
      // zero-velocity mouse position once. Our mobile loop below owns motion.
      const rect = scroller.getBoundingClientRect();
      scroller.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          clientX: rect.left + rect.width * 0.42,
          clientY: rect.top + rect.height / 2,
        }),
      );

      const tick = (time: number) => {
        const dt = Math.min(32, time - lastTime);
        lastTime = time;

        if (!paused && !touching) {
          const half = scroller.scrollWidth / 2;
          if (half > 0) {
            // About 34 px/sec: subtle, continuous motion like the original.
            scroller.scrollLeft += (34 * dt) / 1000;
            if (scroller.scrollLeft >= half) scroller.scrollLeft -= half;
          }
        }

        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);

      const onTouchStart = (event: TouchEvent) => {
        const touch = event.touches[0];
        if (!touch) return;
        touching = true;
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      };

      const onTouchEnd = (event: TouchEvent) => {
        const touch = event.changedTouches[0];
        touching = false;
        if (!touch) return;

        const moved = Math.hypot(touch.clientX - touchStartX, touch.clientY - touchStartY);
        if (moved > 10) return; // Swipes keep normal native scrolling/link behavior.

        paused = !paused;
        scroller.dataset.mobileAutoScrollPaused = paused ? "true" : "false";

        // A tap is the pause/resume control, so suppress navigation on that tap.
        event.preventDefault();
        event.stopPropagation();
      };

      const onTouchCancel = () => {
        touching = false;
      };

      scroller.addEventListener("touchstart", onTouchStart, { passive: true });
      scroller.addEventListener("touchend", onTouchEnd, { passive: false });
      scroller.addEventListener("touchcancel", onTouchCancel, { passive: true });

      cleanup = () => {
        cancelAnimationFrame(raf);
        scroller.removeEventListener("touchstart", onTouchStart);
        scroller.removeEventListener("touchend", onTouchEnd);
        scroller.removeEventListener("touchcancel", onTouchCancel);
        delete scroller.dataset.mobileAutoScrollPaused;
      };
    };

    setup();
    return () => cleanup?.();
  }, [pathname]);

  return null;
}
