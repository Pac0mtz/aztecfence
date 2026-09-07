import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Mobile-only homepage interaction cleanup.
 * Featured Projects is a CSS auto-marquee (view-only). This helper only
 * keeps Customer Reviews auto-scrolling while still allowing native swipe.
 */
export default function MobileHomeEnhancements() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/" || !window.matchMedia("(max-width: 767px)").matches) return;

    let cleanup: (() => void) | undefined;
    let attempts = 0;

    const setup = () => {
      const headings = Array.from(document.querySelectorAll("h2"));
      const reviewsHeading = headings.find((heading) => heading.textContent?.includes("Customer Reviews"));
      const reviewsSection = reviewsHeading?.closest("section");
      const reviewsScroller = reviewsSection?.querySelector<HTMLDivElement>("[data-mobile-reviews-scroller]");

      if (!reviewsScroller) {
        if (attempts++ < 40) window.setTimeout(setup, 100);
        return;
      }

      let reviewsTouching = false;
      let reviewsResumeAt = 0;
      let reviewsLastTime = performance.now();
      let reviewsRaf = 0;

      const tickReviews = (time: number) => {
        const dt = Math.min(32, time - reviewsLastTime);
        reviewsLastTime = time;

        if (!reviewsTouching && time >= reviewsResumeAt) {
          const half = reviewsScroller.scrollWidth / 2;
          if (half > 0) {
            reviewsScroller.scrollLeft += (26 * dt) / 1000;
            if (reviewsScroller.scrollLeft >= half) reviewsScroller.scrollLeft -= half;
          }
        }

        reviewsRaf = requestAnimationFrame(tickReviews);
      };

      const onReviewsTouchStart = () => {
        reviewsTouching = true;
      };
      const onReviewsTouchEnd = () => {
        reviewsTouching = false;
        reviewsResumeAt = performance.now() + 1400;
      };

      reviewsScroller.addEventListener("touchstart", onReviewsTouchStart, { passive: true });
      reviewsScroller.addEventListener("touchend", onReviewsTouchEnd, { passive: true });
      reviewsScroller.addEventListener("touchcancel", onReviewsTouchEnd, { passive: true });
      reviewsRaf = requestAnimationFrame(tickReviews);

      cleanup = () => {
        cancelAnimationFrame(reviewsRaf);
        reviewsScroller.removeEventListener("touchstart", onReviewsTouchStart);
        reviewsScroller.removeEventListener("touchend", onReviewsTouchEnd);
        reviewsScroller.removeEventListener("touchcancel", onReviewsTouchEnd);
      };
    };

    setup();
    return () => cleanup?.();
  }, [pathname]);

  return null;
}
