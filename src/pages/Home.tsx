import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { motion } from "framer-motion";
import { Phone, Check, ArrowRight, Star, Shield, Users, Award, Quote } from "lucide-react";
import {
  WoodPicketIcon, PrivacyBoardIcon, ChainLinkIcon, VinylPicketIcon,
  AluminumIcon, CommercialIcon, ResidentialIcon, type FenceIcon,
} from "../components/FenceIcons";

const serviceIcons: Record<string, FenceIcon> = {
  wood: WoodPicketIcon,
  privacy: PrivacyBoardIcon,
  chainlink: ChainLinkIcon,
  vinyl: VinylPicketIcon,
  aluminum: AluminumIcon,
  commercial: CommercialIcon,
  residential: ResidentialIcon,
};
import { useState, useRef, useEffect } from "react";
import CountUp from "react-countup";

type Slide = { src: string; alt: string; label?: string };

const services = [
  {
    id: "wood",
    label: "WOOD",
    title: "Wood Fences",
    subtitle: "Embrace the Natural Look",
    image: "/images/IMG_1111.jpg",
    slides: [
      { src: "/images/IMG_1111.jpg", alt: "Cedar wood picket fence", label: "Wood Picket" },
      { src: "/images/Residential-wood-solid-privacy-fence-11.jpg", alt: "Wood solid privacy fence", label: "Solid Privacy" },
      { src: "/images/Residential-wood-privacy-board-on-board-fence-07.jpg", alt: "Wood board-on-board fence", label: "Board on Board" },
    ],
    description:
      "For a rustic, natural aesthetic that complements any landscape, choose our wood fences. They are durable and highly customizable, ideal for both privacy and decorative use. Wood fences offer a timeless appeal that enhances the beauty of your garden or yard. With a variety of wood types and finishes available, you can tailor your fence to fit your exact vision, creating a warm and inviting atmosphere around your home.",
    benefits: ["Achieve a natural, rustic look", "Customizable", "Provides robust privacy"],
    link: "/wood-picket-fencing/",
  },
  {
    id: "privacy",
    label: "PRIVACY",
    title: "Privacy Fences",
    subtitle: "Secure Your Space",
    image: "/images/Residential-wood-solid-privacy-fence-11.jpg",
    description:
      "Privacy fences create a secluded oasis in your backyard. Our privacy fence solutions block unwanted views and reduce noise, giving you the peace and tranquility you deserve. Built with high-quality materials and expert craftsmanship, our privacy fences stand strong against the elements while enhancing your property's value.",
    benefits: ["Blocks unwanted views", "Reduces noise pollution", "Increases property value"],
    link: "/privacy-fences/",
  },
  {
    id: "chainlink",
    label: "CHAIN LINK",
    title: "Chain Link Fences",
    subtitle: "Durable & Affordable",
    image: "/images/chain-link-fences.jpg",
    description:
      "Chain link fencing offers a practical and cost-effective solution for residential, commercial, and industrial properties. Known for their durability and low maintenance, chain link fences provide security without obstructing views. Perfect for backyards, sports fields, and commercial perimeters.",
    benefits: ["Cost-effective solution", "Low maintenance", "Long-lasting durability"],
    link: "/chain-link-fences/",
  },
  {
    id: "vinyl",
    label: "VINYL",
    title: "Vinyl Fences",
    subtitle: "Elegant & Low Maintenance",
    image: "/images/Residential-vinyl-privacy-fence-10.jpg",
    description:
      "Vinyl fencing combines elegance with practicality. These fences resist weathering, rotting, and fading, maintaining their pristine appearance for years with minimal upkeep. Available in various styles and colors, vinyl fences are perfect for homeowners seeking beauty without the burden of regular maintenance.",
    benefits: ["No painting or staining needed", "Resists weather damage", "Available in many styles"],
    link: "/vinyl-picket-fencing/",
  },
  {
    id: "aluminum",
    label: "ALUMINUM",
    title: "Aluminum Fences",
    subtitle: "Premium & Rust-Free",
    image: "/images/aluminum-02.jpg",
    description:
      "Aluminum fences offer the perfect blend of strength, beauty, and low maintenance. Resistant to rust and corrosion, aluminum fencing is ideal for any climate. With ornamental designs available, these fences enhance curb appeal while providing reliable security for your property.",
    benefits: ["Rust and corrosion resistant", "Elegant ornamental designs", "Minimal maintenance"],
    link: "/aluminum-fences/",
  },
  {
    id: "commercial",
    label: "COMMERCIAL",
    title: "Commercial Fences",
    subtitle: "Business-Grade Security",
    image: "/images/commercial-03-2.jpg",
    description:
      "Our commercial fencing solutions are designed to protect businesses, industrial facilities, and public properties. From security fencing to perimeter control, we deliver robust installations that meet commercial standards and regulations while enhancing the professional appearance of your property.",
    benefits: ["Meets commercial standards", "Enhanced security features", "Professional appearance"],
    link: "/commercial-fencing/",
  },
  {
    id: "residential",
    label: "RESIDENTIAL",
    title: "Residential Fences",
    subtitle: "Beauty Meets Security",
    image: "/images/Residential-Vinyl-Picket-Fence-11.jpg",
    description:
      "Transform your home with our residential fencing solutions. From decorative picket fences to solid privacy barriers, we offer styles that complement every home architecture. Our expert team ensures precise installation that adds beauty, security, and value to your property.",
    benefits: ["Wide variety of styles", "Adds property value", "Expert installation"],
    link: "/residential-fence/",
  },
];

const areas = [
  "Antioch", "Bannockburn", "Barrington", "Beach Park", "Buffalo Grove", "Deerfield",
  "Fox Lake", "Grayslake", "Green Oaks", "Gurnee", "Hainesville", "Highland Park",
  "Highwood", "Indian Creek", "Island Lake", "Kildeer", "Lake Barrington", "Lake Bluff",
  "Lake Forest", "Lake Villa", "Lake Zurich", "Libertyville", "Lincolnshire", "Lindenhurst",
  "Long Grove", "Mettawa", "Mundelein", "North Barrington", "Old Mill Creek", "Park City",
  "Port Barrington", "Riverwoods", "Round Lake", "Round Lake Beach", "Round Lake Heights",
  "Round Lake Park", "Tower Lakes", "Vernon Hills", "Volo", "Wadsworth", "Wauconda",
  "Waukegan", "Wilmette", "Winthrop Harbor", "Zion",
];

const reviews = [
  {
    name: "R. Brown",
    time: "1 year ago",
    text: "We've lived in our house for over 35 years. We have always had cedar board-on-board fencing on both sides of our back yard, so we've had a LOT of experience with fence companies. Aztec Fence did the best replacement job by far! Excellent craftsmanship, very good looking result and a good job of cleanup. I recommend Aztec without reservation.",
    stars: 5,
  },
  {
    name: "Chris Jones",
    time: "2 years ago",
    text: "Aztec is a great company to work with! Scheduling went smoothly, they came on time and finished in one day. Our sales rep Albert made the entire process easy and was with us from purchase to installation to final inspection. I would definitely recommend them to everyone.",
    stars: 5,
  },
  {
    name: "Alex Herlo",
    time: "2 years ago",
    text: "Aztec Fence Company was a great vendor for our fencing installation. They not only operated swiftly on our request, but also jumped in to help resolve an issue that arose early on in the installation. I highly recommend them for all their professionalism.",
    stars: 5,
  },
  {
    name: "Sarah Mitchell",
    time: "1 year ago",
    text: "We had Aztec Fence install a vinyl privacy fence around our pool area. The team was professional, on time, and the quality of work exceeded our expectations. Our backyard looks amazing and we have the privacy we wanted. Highly recommend!",
    stars: 5,
  },
  {
    name: "David Kim",
    time: "8 months ago",
    text: "Called Aztec for a chain link fence for our commercial property. Got a quote the same day, work started within a week. The crew was efficient and left the site clean. Great pricing compared to other quotes we received. Will use again.",
    stars: 5,
  },
  {
    name: "Jennifer Lopez",
    time: "3 months ago",
    text: "We needed an aluminum fence for our front yard and Aztec delivered beautifully. The ornamental design matches our home perfectly. From the initial consultation to the final walkthrough, everything was seamless. Our curb appeal has never been better!",
    stars: 5,
  },
];

const carouselImages = [
  { src: "/images/aluminum-01.jpg", label: "Aluminum Fences", link: "/aluminum-fences/" },
  { src: "/images/Residential-vinyl-privacy-fence-10.jpg", label: "Vinyl Privacy Fences", link: "/privacy-fences/" },
  { src: "/images/Residential-wood-solid-privacy-fence-11.jpg", label: "Wood Privacy Fences", link: "/privacy-fences/" },
  { src: "/images/gate-3139.jpg", label: "Custom Gates", link: "/gates/" },
  { src: "/images/Residential-Vinyl-Picket-Fence-11.jpg", label: "Vinyl Picket Fences", link: "/vinyl-picket-fencing/" },
  { src: "/images/chain-link-fences.jpg", label: "Chain Link Fences", link: "/chain-link-fences/" },
  { src: "/images/commercial-03-2.jpg", label: "Commercial Fences", link: "/commercial-fencing/" },
  { src: "/images/aluminum-02.jpg", label: "Premium Aluminum", link: "/aluminum-fences/" },
];

function GoogleG({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-label="Google review">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

const gateSlides: Slide[] = [
  { src: "/images/gate-3139.jpg", alt: "Custom aluminum driveway gate", label: "Custom Driveway Gate" },
  { src: "/images/gate-05.jpg", alt: "Residential steel gate", label: "Residential Steel Gate" },
  { src: "/images/gate-06.jpg", alt: "Ornamental custom gate", label: "Ornamental Gate" },
];

function ProjectCard({ img }: { img: (typeof carouselImages)[number] }) {
  return (
    <Link
      to={img.link}
      className="group relative block shrink-0 h-[clamp(240px,34vh,340px)] aspect-[4/3] rounded-xl overflow-hidden"
    >
      <img
        src={img.src}
        alt={img.label}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-bold text-lg">{img.label}</p>
      </div>
      <div className="absolute inset-0 ring-2 ring-cyan-400/0 group-hover:ring-cyan-400/50 rounded-xl transition-all duration-300" />
    </Link>
  );
}

function PhotoSlider({
  slides,
  className = "",
  imageClassName = "",
  interval = 3800,
}: {
  slides: Slide[];
  className?: string;
  imageClassName?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      if (!paused.current) setIndex((n) => (n + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [slides.length, interval]);

  const slide = slides[index] ?? slides[0];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ transform: `translateX(${(i - index) * 100}%)` }}
          >
            <img src={s.src} alt={s.alt} className={`h-full w-full object-cover ${imageClassName}`} />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      {slide?.label && (
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-sm font-bold text-[#0f172a] rounded-full shadow-md">
            {slide.label}
          </span>
          {slides.length > 1 && (
            <div className="flex gap-1.5 pb-1">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  aria-label={`Show ${s.label ?? `image ${i + 1}`}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ImageCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const velRef = useRef(0.55);
  const dragRef = useRef<{ pointerId: number; startX: number; startScroll: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const loop = [...carouselImages, ...carouselImages];

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const tick = () => {
      const half = el.scrollWidth / 2;
      if (half > 0 && !dragRef.current) {
        el.scrollLeft += velRef.current;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        if (el.scrollLeft < 0) el.scrollLeft += half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section className="bg-[#0f172a] py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Featured <span className="text-cyan-400">Projects</span>
        </h2>
      </div>
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pl-4 cursor-ew-resize"
        onMouseLeave={() => {
          velRef.current = 0.55;
        }}
        onMouseMove={(e) => {
          if (dragRef.current) return;
          const el = scrollerRef.current;
          if (!el) return;
          const x = (e.clientX - el.getBoundingClientRect().left) / el.clientWidth;
          velRef.current = (x - 0.42) * 3.4;
        }}
        onPointerDown={(e) => {
          const el = scrollerRef.current;
          if (!el || e.pointerType === "touch") return;
          dragRef.current = {
            pointerId: e.pointerId,
            startX: e.clientX,
            startScroll: el.scrollLeft,
            moved: false,
          };
          velRef.current = 0;
          el.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const el = scrollerRef.current;
          const drag = dragRef.current;
          if (!el || !drag || drag.pointerId !== e.pointerId) return;
          const dx = e.clientX - drag.startX;
          if (Math.abs(dx) > 6) drag.moved = true;
          el.scrollLeft = drag.startScroll - dx;
        }}
        onPointerUp={(e) => {
          const drag = dragRef.current;
          if (drag?.moved) suppressClick.current = true;
          dragRef.current = null;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
        }}
        onClickCapture={(e) => {
          if (!suppressClick.current) return;
          e.preventDefault();
          e.stopPropagation();
          suppressClick.current = false;
        }}
      >
        {loop.map((img, i) => (
          <ProjectCard key={`${img.src}-${i}`} img={img} />
        ))}
      </div>
    </section>
  );
}

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <span ref={ref}>
      {inView ? <CountUp end={end} duration={2.5} suffix={suffix} /> : `0${suffix}`}
    </span>
  );
}

export default function Home() {
  const [activeService, setActiveService] = useState("wood");
  const active = services.find((s) => s.id === activeService) || services[0];

  return (
    <div>
      <Seo
        title="Aztec Fence Company | Fence Installation in Northern Illinois"
        description="Aztec Fence Company installs aluminum, vinyl, wood, chain link & commercial fencing across Northern Illinois. 30+ years, licensed & insured. Free quotes — call (847) 740-4655."
        keywords="fence company Northern Illinois, fence installation, aluminum fence, vinyl fence, wood fence, chain link fence, privacy fence, commercial fencing, Round Lake IL, Lake County fence contractor"
        path="/"
      />
      {/* Hero Section */}
      <section className="relative h-[68vh] min-h-[440px] md:h-[80vh] md:max-h-[760px] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/Residential-vinyl-privacy-fence-04-1.jpg"
            alt="Vinyl privacy fence installed by Aztec Fence in Northern Illinois"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/85 via-[#0f172a]/70 to-[#0f172a]/95" />
        </div>

        <div className="relative h-full flex items-center [text-shadow:0_2px_16px_rgb(0_0_0_/_45%)]">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-cyan-400 text-sm sm:text-lg md:text-xl font-semibold mb-4 tracking-widest uppercase"
              >
                Aztec Fence Company
              </motion.p>

              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                >
                  Our Fences <span className="text-cyan-400">Stand Firm</span>
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-6 sm:mb-8">
                <motion.h1
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
                  className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                >
                  As Our <span className="text-cyan-400">Reputation</span>
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8"
              >
                <Link
                  to="/contact/"
                  className="group relative px-6 sm:px-10 py-3 sm:py-4 bg-cyan-500 text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 text-sm sm:text-base"
                >
                  <span className="relative z-10">FREE QUOTE</span>
                  <div className="absolute inset-0 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </Link>
                <Link
                  to="/photo-gallery/"
                  className="group px-6 sm:px-10 py-3 sm:py-4 border-2 border-white/60 text-white font-bold rounded-full hover:bg-white hover:text-[#0f172a] transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  GALLERY
                </Link>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
                >
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Carousel — Auto-advancing fence showcase */}
      <ImageCarousel />

      {/* 30 Years Banner */}
      <section className="relative bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-5 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 origin-left"
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl font-bold tracking-wide"
          >
            30 Years Of Quality Fencing
          </motion.p>
        </div>
      </section>

      {/* Residential • Commercial • Industrial */}
      <section className="bg-[#0f172a] text-white py-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_cyan_1px,_transparent_1px)] bg-[length:20px_20px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-sm md:text-base font-medium uppercase"
          >
            Residential &bull; Commercial &bull; Industrial
          </motion.p>
        </div>
      </section>

      {/* Customer Reviews — Horizontal Auto-Scroll Marquee */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="max-w-7xl mx-auto px-4 relative mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">
              Customer <span className="text-cyan-600">Reviews</span>
            </h2>
            <p className="text-gray-500 mt-3">Aztec Fence Company, Inc. - 106 Google reviews</p>
          </motion.div>
        </div>

        {/* Marquee Track */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {[...reviews, ...reviews, ...reviews, ...reviews].map((review, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[380px] mx-3 bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100 relative overflow-hidden group"
              >
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote size={40} className="text-cyan-500" />
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 line-clamp-5">{review.text}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-semibold text-[#0f172a] text-sm block">{review.name}</span>
                    <span className="text-gray-400 text-xs">{review.time}</span>
                  </div>
                  <div className="ml-auto shrink-0">
                    <GoogleG size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave a Review CTA */}
        <div className="max-w-7xl mx-auto px-4 relative mt-10 text-center">
          <a
            href="https://g.page/aztec-fence-company/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-md transition-all"
          >
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            Leave us a review on Google
          </a>
        </div>
      </section>

      {/* Stats — Animated counters */}
      <section className="relative bg-[#0f172a] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/aluminum-05.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/95 to-blue-900/90" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Award, end: 30, suffix: "", label: "Years In Business" },
              { icon: Shield, end: 25, suffix: "K+", label: "Projects Done" },
              { icon: Users, end: 41, suffix: "+", label: "Professional Experts" },
              { icon: Star, end: 49, suffix: "", label: "Customer Rating", decimal: true },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon size={36} className="text-cyan-400 mb-3" />
                </motion.div>
                <p className="text-5xl md:text-6xl font-bold">
                  {stat.decimal ? (
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  ) : (
                    <>
                      <AnimatedCounter end={stat.end} />
                      {stat.suffix}
                    </>
                  )}
                </p>
                <p className="text-gray-400 text-sm mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-cyan-600 text-sm font-semibold tracking-widest uppercase mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">
              Our <span className="text-cyan-600">Services</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-500 max-w-2xl mx-auto mt-5 leading-relaxed">
              From classic wood to durable chain link, we design and install fencing built to
              last — crafted to fit your style, budget, and property.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Service Tabs */}
            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2 lg:w-52">
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-3 px-5 py-3.5 lg:flex-1 rounded-xl text-sm font-bold transition-all w-full text-left overflow-hidden ${
                    activeService === service.id
                      ? "bg-[#0f172a] text-white shadow-xl shadow-gray-900/20"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {activeService === service.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-l-xl"
                    />
                  )}
                  {(() => {
                    const Icon = serviceIcons[service.id];
                    return Icon ? <Icon size={26} className={`shrink-0 ${activeService === service.id ? "text-cyan-400" : "text-gray-400"}`} /> : null;
                  })()}
                  <span className="uppercase text-xs tracking-widest">{service.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Service Content */}
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 30, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-1 flex flex-col md:flex-row gap-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl shadow-gray-100/50 border border-gray-100"
            >
              <div className="md:w-1/2 relative group overflow-hidden rounded-2xl min-h-[18rem]">
                <PhotoSlider
                  slides={
                    "slides" in active && active.slides
                      ? active.slides
                      : [{ src: active.image, alt: active.title, label: active.title }]
                  }
                  className="h-72 md:absolute md:inset-0 md:h-full"
                />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-[#0f172a] mb-1">{active.title}</h3>
                <p className="text-cyan-600 font-semibold mb-5 text-lg">{active.subtitle}</p>
                <p className="text-gray-600 leading-relaxed mb-5">{active.description}</p>
                <div className="mb-6">
                  <p className="font-semibold text-[#0f172a] mb-3 text-sm uppercase tracking-wide">Benefits:</p>
                  <ul className="space-y-2">
                    {active.benefits.map((b, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center gap-2.5 text-gray-600"
                      >
                        <div className="w-6 h-6 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
                          <Check size={14} className="text-cyan-500" />
                        </div>
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={active.link}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white text-sm font-bold rounded-full hover:bg-cyan-600 transition-all w-fit hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  View Details
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Custom Gates Section — Overlapping layout */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-50 rounded-full blur-3xl opacity-40" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center gap-14">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-cyan-600 font-bold text-sm mb-3 uppercase tracking-widest"
              >
                Welcome with Elegance & Security
              </motion.p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-5 leading-tight">
                Custom Gates & <span className="text-cyan-600">Access Control</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Make a great first impression with our custom gates, designed to match any home style.
                Choose from a variety of materials, colors, accents, and functionalities to enhance your
                entrance. Our custom gates are more than just functional barriers; they are a statement
                piece that adds to your property's overall charm and security. With options for smart home
                integration and code-compliant latches, our gates offer both convenience and cutting-edge
                security features.
              </p>
              <div className="mb-7">
                <p className="font-semibold text-[#0f172a] mb-3 text-sm uppercase tracking-wide">Benefits:</p>
                <ul className="space-y-2">
                  {["Custom Design", "Increased curb appeal", "Advanced security features and access control"].map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2.5 text-gray-600"
                    >
                      <div className="w-6 h-6 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
                        <Check size={14} className="text-cyan-500" />
                      </div>
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <Link
                to="/gates/"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white text-sm font-bold rounded-full hover:bg-cyan-600 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              >
                View Details
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              className="md:w-1/2 relative"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <PhotoSlider
                  slides={gateSlides}
                  className="relative h-96 rounded-3xl shadow-2xl shadow-gray-300/40"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <Shield size={22} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-[#0f172a] text-sm">Secure Access</p>
                      <p className="text-gray-500 text-xs">Smart home compatible</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Areas We Serve — Animated pills */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">Areas We Serve</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-500 mt-3">Proudly serving Northern Illinois communities</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {areas.map((area, idx) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.015, duration: 0.3 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-4 py-2.5 bg-gradient-to-r from-gray-50 to-white rounded-full border border-gray-200 text-sm text-gray-600 hover:border-cyan-300 hover:text-cyan-600 hover:shadow-md hover:shadow-cyan-100/50 transition-all cursor-default"
              >
                {area} Fencing
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section — Floating elements */}
      <section className="relative py-24 bg-[#0f172a] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/aluminum-19.jpg" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/90 to-blue-900/95" />
        </div>
        {/* Floating decorative circles */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-20 h-20 border border-cyan-400/20 rounded-full"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute bottom-20 right-[15%] w-32 h-32 border border-cyan-400/10 rounded-full"
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Schedule a Free <span className="text-cyan-400">Consultation</span>
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Step Up Your Property's Look and Safety - Start Your Project Today!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link
                to="/contact/"
                className="group relative px-10 py-4 bg-cyan-500 text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30"
              >
                <span className="relative z-10">BOOK NOW</span>
                <div className="absolute inset-0 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Link>
              <a
                href="tel:8477404655"
                className="group flex items-center gap-3 px-8 py-4 border-2 border-white/40 text-white font-bold rounded-full hover:bg-white hover:text-[#0f172a] transition-all hover:scale-105 backdrop-blur-sm"
              >
                <Phone size={20} />
                (847) 740-4655
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
