import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Mobile-only homepage interaction cleanup.
 * - Featured Projects stays manually swipeable but does not auto-scroll.
 * - Customer Reviews keeps smooth auto-scroll while still allowing native drag/swipe.
 */
export default function MobileHomeEnhancements() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/" || !window.matchMedia("(max-width: 767px)").matches) return;

    let cleanup: (() => void) | undefined;
    let attempts = 0;

    const setup = () => {
      const headings = Array.from(document.querySelectorAll("h2"));
      const featuredHeading = headings.find((heading) => heading.textContent?.includes("Featured Projects"));
      const reviewsHeading = headings.find((heading) => heading.textContent?.includes("Customer Reviews"));

      const featuredSection = featuredHeading?.closest("section");
      const featuredScroller = featuredSection?.querySelector<HTMLDivElement>("div.flex.overflow-x-auto");

      const reviewsSection = reviewsHeading?.closest("section");
      const reviewsScroller = reviewsSection?.querySelector<HTMLDivElement>("[data-mobile-reviews-scroller]");

      if (!featuredScroller || !reviewsScroller) {
        if (attempts++ < 40) window.setTimeout(setup, 100);
        return;
      }

      // Featured Projects: neutralize the original Home.tsx RAF motion while
      // preserving native touch scrolling. The locked position only updates
      // while the user is actively touching/dragging the rail.
      let featuredTouching = false;
      let featuredLocked = featuredScroller.scrollLeft;
      let featuredRaf = 0;

      const freezeFeatured = () => {
        if (featuredTouching) {
          featuredLocked = featuredScroller.scrollLeft;
        } else if (Math.abs(featuredScroller.scrollLeft - featuredLocked) > 0.5) {
          featuredScroller.scrollLeft = featuredLocked;
        }
        featuredRaf = requestAnimationFrame(freezeFeatured);
      };

      const onFeaturedTouchStart = () => {
        featuredTouching = true;
      };
      const onFeaturedTouchMove = () => {
        featuredLocked = featuredScroller.scrollLeft;
      };
      const onFeaturedTouchEnd = () => {
        featuredLocked = featuredScroller.scrollLeft;
        featuredTouching = false;
      };

      featuredScroller.addEventListener("touchstart", onFeaturedTouchStart, { passive: true });
      featuredScroller.addEventListener("touchmove", onFeaturedTouchMove, { passive: true });
      featuredScroller.addEventListener("touchend", onFeaturedTouchEnd, { passive: true });
      featuredScroller.addEventListener("touchcancel", onFeaturedTouchEnd, { passive: true });
      featuredRaf = requestAnimationFrame(freezeFeatured);

      // Reviews: smooth auto-scroll, but hands off immediately while the user
      // drags. Resume shortly after release so the rail still feels alive.
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
        cancelAnimationFrame(featuredRaf);
        cancelAnimationFrame(reviewsRaf);
        featuredScroller.removeEventListener("touchstart", onFeaturedTouchStart);
        featuredScroller.removeEventListener("touchmove", onFeaturedTouchMove);
        featuredScroller.removeEventListener("touchend", onFeaturedTouchEnd);
        featuredScroller.removeEventListener("touchcancel", onFeaturedTouchEnd);
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
