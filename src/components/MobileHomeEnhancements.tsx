import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Mobile-only interaction polish for the homepage Featured Projects rail.
 * The existing Home carousel owns the requestAnimationFrame loop; this helper
 * nudges its existing mouse-driven velocity control so a tap can pause/resume
 * the motion without changing desktop behavior.
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
        if (attempts++ < 20) window.setTimeout(setup, 100);
        return;
      }

      let paused = false;
      let touchStartX = 0;
      let touchStartY = 0;

      const setVelocity = (velocity: number) => {
        const rect = scroller.getBoundingClientRect();
        // Mirrors Home.tsx: velocity = (x - 0.42) * 3.4
        const normalizedX = 0.42 + velocity / 3.4;
        scroller.dispatchEvent(
          new MouseEvent("mousemove", {
            bubbles: true,
            clientX: rect.left + rect.width * normalizedX,
            clientY: rect.top + rect.height / 2,
          }),
        );
      };

      // Ensure a gentle, visible mobile auto-scroll when the section mounts.
      setVelocity(0.42);

      const onTouchStart = (event: TouchEvent) => {
        const touch = event.touches[0];
        if (!touch) return;
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      };

      const onTouchEnd = (event: TouchEvent) => {
        const touch = event.changedTouches[0];
        if (!touch) return;

        const moved = Math.hypot(touch.clientX - touchStartX, touch.clientY - touchStartY);
        if (moved > 10) return; // Keep normal swipe/scroll gestures intact.

        paused = !paused;
        setVelocity(paused ? 0 : 0.42);

        // A tap is used as the motion control on mobile, so don't accidentally
        // open a project card on the same tap.
        if (paused) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      scroller.addEventListener("touchstart", onTouchStart, { passive: true });
      scroller.addEventListener("touchend", onTouchEnd, { passive: false });

      cleanup = () => {
        scroller.removeEventListener("touchstart", onTouchStart);
        scroller.removeEventListener("touchend", onTouchEnd);
      };
    };

    setup();
    return () => cleanup?.();
  }, [pathname]);

  return null;
}
