import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ArrowLeft, ArrowRight, ImageIcon } from "lucide-react";
import Seo, { SITE_URL } from "../components/Seo";

const categories = [
  "All", "Aluminum", "Gates", "Vinyl Privacy", "Wood Picket",
  "Wood Board On Board", "Vinyl Picket", "Wood Solid Privacy", "Chain Link", "Commercial",
];

const galleryImages = [
  { src: "/images/aluminum-01.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-02.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-03.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-04.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-05.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-07.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-09.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-10.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-11.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-14.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-15.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-17.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-18.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-19.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/aluminum-21.jpg", alt: "Aluminum Fence", category: "Aluminum" },
  { src: "/images/white-wooden-fence-near-green-grass-field-scaled.jpg", alt: "Ornamental Aluminum Fence", category: "Aluminum" },
  { src: "/images/gate-05.jpg", alt: "Steel Gate", category: "Gates" },
  { src: "/images/gate-06.jpg", alt: "Steel Gate", category: "Gates" },
  { src: "/images/gate-3139.jpg", alt: "Custom Gate", category: "Gates" },
  { src: "/images/Residential-Steel-Gate-Frames-on-Wood-04-qpkcpnguf4rspu51goub3xixmouijo0fbhddkk34qg.jpg", alt: "Gate Frame", category: "Gates" },
  { src: "/images/asset_4.jpg", alt: "Aluminum Fence & Gate", category: "Gates" },
  { src: "/images/Residential-vinyl-privacy-fence-10.jpg", alt: "Vinyl Privacy Fence", category: "Vinyl Privacy" },
  { src: "/images/Residential-vinyl-privacy-fence-10-1-e1712868967542.jpg", alt: "Vinyl Privacy Fence", category: "Vinyl Privacy" },
  { src: "/images/Residential-vinyl-privacy-fence-11-1.jpg", alt: "Vinyl Privacy Fence", category: "Vinyl Privacy" },
  { src: "/images/Residential-vinyl-privacy-fence-12.jpg", alt: "Vinyl Privacy Fence", category: "Vinyl Privacy" },
  { src: "/images/Residential-wood-privacy-board-on-board-fence-07.jpg", alt: "Wood Board On Board", category: "Wood Board On Board" },
  { src: "/images/Residential-wood-privacy-board-on-board-fence-09.jpg", alt: "Wood Board On Board", category: "Wood Board On Board" },
  { src: "/images/asset_3.jpg", alt: "Horizontal Cedar Wood Fence", category: "Wood Board On Board" },
  { src: "/images/Residential-wood-solid-privacy-fence-11.jpg", alt: "Wood Solid Privacy", category: "Wood Solid Privacy" },
  { src: "/images/Residential-wood-solid-privacy-fence-16.jpg", alt: "Wood Solid Privacy", category: "Wood Solid Privacy" },
  { src: "/images/asset_1.jpg", alt: "Wood Privacy Fence", category: "Wood Solid Privacy" },
  { src: "/images/Residential-Vinyl-Picket-Fence-11.jpg", alt: "Vinyl Picket Fence", category: "Vinyl Picket" },
  { src: "/images/Residential-Vinyl-Picket-Fence-12.jpg", alt: "Vinyl Picket Fence", category: "Vinyl Picket" },
  { src: "/images/Residential-Vinyl-Picket-Fence-03-qo5zxxv34i9w6zgsbtni8lf7n3lt79dua3sus865qg.jpg", alt: "Vinyl Picket Fence", category: "Vinyl Picket" },
  { src: "/images/Residential-Vinyl-Picket-Fence-07-qo5zy2kbaj8rtrs6gtbnrolh98qrctk1i0k7ko6pok.jpg", alt: "Vinyl Picket Fence", category: "Vinyl Picket" },
  { src: "/images/chain-link-fences.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/chain-link-fences-scaled-qp4h4ldeefghydf40n9l9kzus6hvj1f3wpcx3ur7uw.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/commercial-03-2.jpg", alt: "Commercial Ornamental Fence", category: "Commercial" },
  { src: "/images/commercial-04-2.jpg", alt: "Commercial Ornamental Fence & Gate", category: "Commercial" },
  { src: "/images/commercial-42.jpg", alt: "Commercial Vinyl Privacy Fence & Gate", category: "Commercial" },
  { src: "/images/commercial-43.jpg", alt: "Commercial Vinyl Privacy Gate", category: "Commercial" },
  { src: "/images/commercial-24-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/commercial-29-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/commercial-33.jpg", alt: "Chain Link Security Gate", category: "Chain Link" },
  { src: "/images/commercial-35-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/Commercial-Fences-05-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/Commercial-Fences-15-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/Commercial-Fences-20-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/Commercial-Fences-22-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/Commercial-Fences-32-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/Commercial-Fences-45-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/Commercial-Fences-49-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/2-IMG_2482.jpg", alt: "Vinyl Privacy Fence", category: "Vinyl Privacy" },
  { src: "/images/IMG_1810.jpg", alt: "Aluminum Project", category: "Aluminum" },
  { src: "/images/IMG_1111.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },
  { src: "/images/IMG_1212.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },
  { src: "/images/IMG_3222.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },
  { src: "/images/IMG_7129.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },

  // Additional photos pulled from the live aztecfence.net gallery to fill out sparse categories
  { src: "/images/IMG_0176.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },
  { src: "/images/IMG_0369.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },
  { src: "/images/IMG_3219.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },
  { src: "/images/IMG_1074.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },
  { src: "/images/IMG_1090.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },
  { src: "/images/IMG_1116.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },
  { src: "/images/IMG_1348.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },
  { src: "/images/IMG_1857.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },
  { src: "/images/IMG_2228.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },
  { src: "/images/IMG_3712.jpg", alt: "Wood Picket Fence", category: "Wood Picket" },
  { src: "/images/Residential-wood-solid-privacy-fence-01.jpg", alt: "Wood Solid Privacy", category: "Wood Solid Privacy" },
  { src: "/images/Residential-wood-solid-privacy-fence-02.jpg", alt: "Wood Solid Privacy", category: "Wood Solid Privacy" },
  { src: "/images/Residential-wood-solid-privacy-fence-03.jpg", alt: "Wood Solid Privacy", category: "Wood Solid Privacy" },
  { src: "/images/Residential-wood-solid-privacy-fence-04.jpg", alt: "Wood Solid Privacy", category: "Wood Solid Privacy" },
  { src: "/images/Residential-wood-solid-privacy-fence-05.jpg", alt: "Wood Solid Privacy", category: "Wood Solid Privacy" },
  { src: "/images/Residential-wood-solid-privacy-fence-06.jpg", alt: "Wood Solid Privacy", category: "Wood Solid Privacy" },
  { src: "/images/Residential-wood-solid-privacy-fence-08.jpg", alt: "Wood Solid Privacy", category: "Wood Solid Privacy" },
  { src: "/images/Residential-wood-solid-privacy-fence-09.jpg", alt: "Wood Solid Privacy", category: "Wood Solid Privacy" },
  { src: "/images/Residential-wood-solid-privacy-fence-10.jpg", alt: "Wood Solid Privacy", category: "Wood Solid Privacy" },
  { src: "/images/Residential-wood-privacy-board-on-board-fence-01.jpg", alt: "Wood Board On Board", category: "Wood Board On Board" },
  { src: "/images/Residential-wood-privacy-board-on-board-fence-02.jpg", alt: "Wood Board On Board", category: "Wood Board On Board" },
  { src: "/images/Residential-wood-privacy-board-on-board-fence-03.jpg", alt: "Wood Board On Board", category: "Wood Board On Board" },
  { src: "/images/Residential-wood-privacy-board-on-board-fence-04.jpg", alt: "Wood Board On Board", category: "Wood Board On Board" },
  { src: "/images/Residential-wood-privacy-board-on-board-fence-05.jpg", alt: "Wood Board On Board", category: "Wood Board On Board" },
  { src: "/images/Residential-wood-privacy-board-on-board-fence-06.jpg", alt: "Wood Board On Board", category: "Wood Board On Board" },
  { src: "/images/Residential-vinyl-privacy-fence-01-1.jpg", alt: "Vinyl Privacy Fence", category: "Vinyl Privacy" },
  { src: "/images/Residential-vinyl-privacy-fence-03-1.jpg", alt: "Vinyl Privacy Fence", category: "Vinyl Privacy" },
  { src: "/images/Residential-vinyl-privacy-fence-04-1.jpg", alt: "Vinyl Privacy Fence", category: "Vinyl Privacy" },
  { src: "/images/Residential-vinyl-privacy-fence-06-1.jpg", alt: "Vinyl Privacy Fence", category: "Vinyl Privacy" },
  { src: "/images/Residential-vinyl-privacy-fence-07-1.jpg", alt: "Vinyl Privacy Fence", category: "Vinyl Privacy" },
  { src: "/images/Residential-vinyl-privacy-fence-08-1.jpg", alt: "Vinyl Privacy Fence", category: "Vinyl Privacy" },
  { src: "/images/Residential-Vinyl-Picket-Fence-01.jpg", alt: "Vinyl Picket Fence", category: "Vinyl Picket" },
  { src: "/images/Residential-Vinyl-Picket-Fence-02.jpg", alt: "Vinyl Picket Fence", category: "Vinyl Picket" },
  { src: "/images/Residential-Vinyl-Picket-Fence-06.jpg", alt: "Vinyl Picket Fence", category: "Vinyl Picket" },
  { src: "/images/Residential-Vinyl-Picket-Fence-08.jpg", alt: "Vinyl Picket Fence", category: "Vinyl Picket" },
  { src: "/images/chain-link-fences-scaled.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/Commercial-Fences-06-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/Commercial-Fences-23-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/Commercial-Fences-30-1.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/Commercial-Fences-36-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
  { src: "/images/Commercial-Fences-47-2.jpg", alt: "Chain Link Fence", category: "Chain Link" },
];

// Grid uses lightweight 640px thumbnails (WebP with JPEG fallback); the lightbox
// loads the full-size image. Thumbnails are generated by scripts/generate-thumbs.mjs.
const thumbJpg = (src: string) => src.replace("/images/", "/images/thumbs/");
const thumbWebp = (src: string) => thumbJpg(src).replace(/\.jpe?g$/i, ".webp");

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const filtered = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (src: string) => {
    const idx = filtered.findIndex((img) => img.src === src);
    setLightboxIdx(idx);
    setLightbox(src);
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const navigateLightbox = useCallback((dir: number) => {
    setLightboxIdx((prev) => {
      const newIdx = (prev + dir + filtered.length) % filtered.length;
      setLightbox(filtered[newIdx].src);
      return newIdx;
    });
  }, [filtered]);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, navigateLightbox]);

  return (
    <div>
      <Seo
        title="Fence Photo Gallery | Aztec Fence Company — Northern Illinois"
        description="Browse 100+ photos of our aluminum, vinyl, wood, chain link & commercial fencing projects across Northern Illinois. Get inspired, then request a free quote."
        keywords="fence gallery, fence photos, fence ideas, aluminum vinyl wood chain link fence pictures, Northern Illinois"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "ImageGallery", name: "Aztec Fence Photo Gallery", url: `${SITE_URL}/photo-gallery/`, about: { "@id": `${SITE_URL}/#business` } },
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Photo Gallery" },
            ] },
          ],
        }}
      />
      {/* Hero */}
      <section className="relative bg-[#0f172a] text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/Residential-vinyl-privacy-fence-10.jpg" alt="Gallery" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/70 to-[#0f172a]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Our Work</p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4">
              Aztec Fence <span className="text-cyan-400">Photo Gallery</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              Browse our portfolio of aluminum, vinyl, wood, chain-link, and commercial fencing projects across Northern Illinois.
            </p>
            <div className="flex items-center justify-center gap-2 mt-5 text-gray-500 text-sm">
              <ImageIcon size={16} />
              <span>{filtered.length} photos{activeCategory !== "All" ? ` in ${activeCategory}` : ""}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-5 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => {
              const count = cat === "All" ? galleryImages.length : galleryImages.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-[#0f172a] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat} <span className={`text-xs ml-1 ${activeCategory === cat ? "text-gray-400" : "text-gray-400"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-10 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((img, idx) => (
              <motion.div
                key={img.src + activeCategory}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.5) }}
                className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow bg-gray-200"
                onClick={() => openLightbox(img.src)}
              >
                <div className="aspect-square">
                  <picture className="block w-full h-full">
                    <source srcSet={thumbWebp(img.src)} type="image/webp" />
                    <img
                      src={thumbJpg(img.src)}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="640"
                      height="640"
                    />
                  </picture>
                </div>
                {/* Always-visible category badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-1 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {img.category}
                  </span>
                </div>
                {/* Hover zoom icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn size={18} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <ImageIcon size={48} className="mx-auto mb-3 opacity-40" />
              <p>No images in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 z-50">
              <p className="text-white/60 text-sm">
                {filtered[lightboxIdx]?.category} — {lightboxIdx + 1} / {filtered.length}
              </p>
              <button
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                onClick={closeLightbox}
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav buttons */}
            <button
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            >
              <ArrowRight size={20} />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              src={lightbox}
              alt="Gallery"
              className="max-w-[92vw] max-h-[82vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Bottom caption */}
            <p className="absolute bottom-4 text-white/70 text-sm font-medium">
              {filtered[lightboxIdx]?.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
