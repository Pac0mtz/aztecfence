import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fenceStyles = [
  { label: "Privacy Fences", path: "/privacy-fences/" },
  { label: "Chain Link Fences", path: "/chain-link-fences/" },
  { label: "Premium Aluminum Fences", path: "/aluminum-fences/" },
  { label: "Security Fences", path: "/security-fences/" },
  { label: "Vinyl Picket Fencing", path: "/vinyl-picket-fencing/" },
  { label: "Wood Picket Fencing", path: "/wood-picket-fencing/" },
];

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Gallery", path: "/photo-gallery/" },
  { label: "Gates", path: "/gates/" },
  { label: "Residential", path: "/residential-fence/" },
  { label: "Commercial", path: "/commercial-fencing/" },
  {
    label: "Fence Styles",
    dropdown: fenceStyles,
  },
  { label: "About", path: "/about-us/" },
  { label: "Contact", path: "/contact/" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-200/30 border-b border-gray-100/50"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.img
              src="/images/AZTEC-Fence-logo-round.png"
              alt="Aztec Fence Company"
              className="h-14 w-auto"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      link.dropdown.some((d) => isActive(d.path))
                        ? "text-cyan-600 bg-cyan-50"
                        : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 bg-white/95 backdrop-blur-xl shadow-2xl shadow-gray-200/40 rounded-xl border border-gray-100 py-2 min-w-[240px] overflow-hidden"
                      >
                        {link.dropdown.map((item, idx) => (
                          <motion.div
                            key={item.path}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03 }}
                          >
                            <Link
                              to={item.path}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                isActive(item.path)
                                  ? "text-cyan-600 bg-cyan-50 font-semibold"
                                  : "text-gray-600 hover:text-cyan-600 hover:bg-gray-50"
                              }`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path!}
                  className={`relative px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive(link.path!)
                      ? "text-cyan-600"
                      : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                  {isActive(link.path!) && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyan-400 rounded-full"
                    />
                  )}
                </Link>
              )
            )}
          </div>

          {/* CTA Button */}
          <Link
            to="/contact/"
            className="hidden lg:inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-[#0f172a] to-blue-900 text-white text-sm font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-105"
          >
            FREE CONSULTATION
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="lg:hidden p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.label ? null : link.label)
                      }
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-cyan-600 rounded-lg hover:bg-gray-50"
                              onClick={() => setMobileOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path!}
                    className={`block px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                      isActive(link.path!)
                        ? "text-cyan-600 bg-cyan-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                to="/contact/"
                className="block mt-3 text-center px-5 py-3 bg-gradient-to-r from-[#0f172a] to-blue-900 text-white text-sm font-bold rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                FREE CONSULTATION
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
