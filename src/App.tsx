import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { routePath } from "../shared/routes.mjs";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import MobileHomeEnhancements from "./components/MobileHomeEnhancements";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Gates from "./pages/Gates";
import Residential from "./pages/Residential";
import Commercial from "./pages/Commercial";
import PrivacyFences from "./pages/PrivacyFences";
import ChainLinkFences from "./pages/ChainLinkFences";
import AluminumFences from "./pages/AluminumFences";
import SecurityFences from "./pages/SecurityFences";
import VinylPicketFencing from "./pages/VinylPicketFencing";
import WoodPicketFencing from "./pages/WoodPicketFencing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import LandingPage from "./components/LandingPage";
import { trackSpaPageView } from "./lib/ads";
import "./mobile-home-tweaks.css";

function TrackSpaPages() {
  const { pathname } = useLocation();
  useEffect(() => {
    trackSpaPageView(pathname);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className={`mobile-compact min-h-screen bg-white flex flex-col${isHome ? " home-route" : ""}`}>
      <ScrollToTop />
      <TrackSpaPages />
      <MobileHomeEnhancements />
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path={routePath("/")} element={<Home />} />
          <Route path={routePath("/photo-gallery/")} element={<Gallery />} />
          <Route path={routePath("/gates/")} element={<Gates />} />
          <Route path={routePath("/residential-fence/")} element={<Residential />} />
          <Route path={routePath("/commercial-fencing/")} element={<Commercial />} />
          <Route path={routePath("/privacy-fences/")} element={<PrivacyFences />} />
          <Route path={routePath("/chain-link-fences/")} element={<ChainLinkFences />} />
          <Route path={routePath("/aluminum-fences/")} element={<AluminumFences />} />
          <Route path={routePath("/security-fences/")} element={<SecurityFences />} />
          <Route path={routePath("/vinyl-picket-fencing/")} element={<VinylPicketFencing />} />
          <Route path={routePath("/wood-picket-fencing/")} element={<WoodPicketFencing />} />
          <Route path={routePath("/pool-fences/")} element={<LandingPage pagePath="/pool-fences/" />} />
          <Route path={routePath("/fence-repair/")} element={<LandingPage pagePath="/fence-repair/" />} />
          <Route path={routePath("/kenosha-wi/")} element={<LandingPage pagePath="/kenosha-wi/" />} />
          <Route path={routePath("/service-areas/")} element={<LandingPage pagePath="/service-areas/" />} />
          <Route path={routePath("/service-areas/round-lake/")} element={<LandingPage pagePath="/service-areas/round-lake/" />} />
          <Route path={routePath("/service-areas/grayslake/")} element={<LandingPage pagePath="/service-areas/grayslake/" />} />
          <Route path={routePath("/service-areas/gurnee/")} element={<LandingPage pagePath="/service-areas/gurnee/" />} />
          <Route path={routePath("/service-areas/libertyville/")} element={<LandingPage pagePath="/service-areas/libertyville/" />} />
          <Route path={routePath("/service-areas/mundelein/")} element={<LandingPage pagePath="/service-areas/mundelein/" />} />
          <Route path={routePath("/service-areas/antioch/")} element={<LandingPage pagePath="/service-areas/antioch/" />} />
          <Route path={routePath("/service-areas/waukegan/")} element={<LandingPage pagePath="/service-areas/waukegan/" />} />
          <Route path={routePath("/service-areas/mchenry/")} element={<LandingPage pagePath="/service-areas/mchenry/" />} />
          <Route path={routePath("/about-us/")} element={<About />} />
          <Route path={routePath("/contact/")} element={<Contact />} />
          <Route path={routePath("/terms-and-conditions/")} element={<Terms />} />
          <Route path={routePath("/privacy-policy/")} element={<Privacy />} />
          <Route path={routePath("/thank-you/")} element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
