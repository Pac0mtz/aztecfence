import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
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

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo-gallery/" element={<Gallery />} />
          <Route path="/gates/" element={<Gates />} />
          <Route path="/residential-fence/" element={<Residential />} />
          <Route path="/commercial-fencing/" element={<Commercial />} />
          <Route path="/privacy-fences/" element={<PrivacyFences />} />
          <Route path="/chain-link-fences/" element={<ChainLinkFences />} />
          <Route path="/aluminum-fences/" element={<AluminumFences />} />
          <Route path="/security-fences/" element={<SecurityFences />} />
          <Route path="/vinyl-picket-fencing/" element={<VinylPicketFencing />} />
          <Route path="/wood-picket-fencing/" element={<WoodPicketFencing />} />
          <Route path="/wood-picket-fences/" element={<WoodPicketFencing />} />
          <Route path="/about-us/" element={<About />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/terms-and-conditions/" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
