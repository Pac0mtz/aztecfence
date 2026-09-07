import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Mobile-only homepage interaction polish.
 * - Featured Projects stays manually swipeable but does not auto-scroll.
 * - Customer Reviews auto-scroll smoothly and remain manually swipeable.
 * - Hero background is explicitly marked static so CSS can suppress any motion.
 */
export default function MobileHomeEnhancements() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/" || !window.matchMedia("(max-width: 767px)").matches) return;

    let cleanup: (() => void) | undefined;
    let attempts = 0;

    const setup = () => {
      const heroSection = document.querySelector<HTMLElement>("main > div > section:first-of-type");
      const heroImage = heroSection?.querySelector<HTMLImageElement>("img");
      heroSection?.classList.add("mobile-static-hero");
      heroImage?.classList.add("mobile-static-hero-image");

      const featuredHeading = Array.from(document.querySelectorAll("h2")).find((heading) =>
        heading.textContent?.includes("Featured Projects"),
      );
      const featuredSection = featuredHeading?.closest("section");
      const featuredScroller = featuredSection?.querySelector<HTMLDivElement>("div.flex.overflow-x-auto");

      const reviewsHeading = Array.from(document.querySelectorAll("h2")).find((heading) =>
        heading.textContent?.includes("Customer Reviews"),
      );
      const reviewsSection = reviewsHeading?.closest("section");
      const reviewsTrack = reviewsSection?.querySelector<HTMLDivElement>("div.flex.animate-marquee");
      const reviewsScroller = reviewsTrack?.parentElement as HTMLDivElement | null;

      if (!featuredScroller || !reviewsTrack || !reviewsScroller) {
        if (attempts++ < 30) window.setTimeout(setup, 100);
        return;
      }

      // Featured Projects: disable the Home.tsx desktop velocity loop, but keep
      // the element's native horizontal overflow so users can swipe/drag it.
      const zeroFeaturedVelocity = () => {
        const rect = featuredScroller.getBoundingClientRect();
        featuredScroller.dispatchEvent(
          new MouseEvent("mousemove", {
            bubbles: true,
            clientX: rect.left + rect.width * 0.42,
            clientY: rect.top + rect.height / 2,
          }),
        );
      };
      zeroFeaturedVelocity();
      featuredScroller.dataset.mobileAutoScroll = "off";

      // Reviews: replace the transform marquee with a true scroll container so
      // auto motion and native touch scrolling work together on iPhone.
      reviewsSection?.classList.add("mobile-reviews-section");
      reviewsScroller.classList.add("mobile-reviews-scroller");
      reviewsTrack.classList.remove("animate-marquee");
      reviewsTrack.classList.add("mobile-reviews-track");
      Array.from(reviewsTrack.children).forEach((card) => card.classList.add("mobile-review-card"));

      let touching = false;
      let resumeTimer = 0;
      let raf = 0;
      let lastTime = performance.now();

      const tick = (time: number) => {
        const dt = Math.min(32, time - lastTime);
        lastTime = time;

        if (!touching) {
          const segment = reviewsTrack.scrollWidth / 4;
          if (segment > 0) {
            reviewsScroller.scrollLeft += (24 * dt) / 1000;
            if (reviewsScroller.scrollLeft >= segment) {
              reviewsScroller.scrollLeft -= segment;
            }
          }
        }

        raf = requestAnimationFrame(tick);
      };

      const pauseForTouch = () => {
        touching = true;
        if (resumeTimer) window.clearTimeout(resumeTimer);
      };

      const resumeAfterTouch = () => {
        if (resumeTimer) window.clearTimeout(resumeTimer);
        resumeTimer = window.setTimeout(() => {
          touching = false;
        }, 1200);
      };

      reviewsScroller.addEventListener("touchstart", pauseForTouch, { passive: true });
      reviewsScroller.addEventListener("touchend", resumeAfterTouch, { passive: true });
      reviewsScroller.addEventListener("touchcancel", resumeAfterTouch, { passive: true });

      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        if (resumeTimer) window.clearTimeout(resumeTimer);
        reviewsScroller.removeEventListener("touchstart", pauseForTouch);
        reviewsScroller.removeEventListener("touchend", resumeAfterTouch);
        reviewsScroller.removeEventListener("touchcancel", resumeAfterTouch);
        delete featuredScroller.dataset.mobileAutoScroll;
      };
    };

    setup();
    return () => cleanup?.();
  }, [pathname]);

  return null;
}
