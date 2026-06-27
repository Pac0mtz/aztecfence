import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Check, ArrowRight, Phone, Shield, Award, Clock, DollarSign,
  Star, ChevronRight, PencilRuler, HardHat, ClipboardCheck, Sparkles,
} from "lucide-react";
import Seo, { SITE_URL } from "./Seo";

interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface FenceStylePageProps {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  heroImage: string;
  galleryImages: string[];
  /** Optional SEO + content overrides */
  seoTitle?: string;
  metaDescription?: string;
  intro2?: string;
  features?: Feature[];
  faqs?: FAQ[];
}

const DEFAULT_FEATURES: Feature[] = [
  { icon: Shield, title: "Built to Last", text: "Premium, weather-tested materials engineered for Northern Illinois seasons and decades of dependable service." },
  { icon: Award, title: "30+ Years Experience", text: "A licensed, insured local team with three decades installing residential and commercial fencing." },
  { icon: Clock, title: "On-Time, Clean Installs", text: "Clear timelines and tidy, respectful crews that treat your property like their own." },
  { icon: DollarSign, title: "Free, Honest Quotes", text: "Transparent, itemized pricing with options for every budget — no hidden fees, ever." },
];

const PROCESS = [
  { icon: PencilRuler, step: "01", title: "Free Consultation", text: "We visit your property, listen to your goals, and recommend the right style and layout." },
  { icon: ClipboardCheck, step: "02", title: "Custom Quote", text: "You receive a clear, itemized quote with transparent material and design options." },
  { icon: HardHat, step: "03", title: "Expert Installation", text: "Our seasoned crew installs your fence to spec — on schedule and built to last." },
  { icon: Sparkles, step: "04", title: "Final Walkthrough", text: "We walk the finished project with you to make sure it exceeds your expectations." },
];

export default function FenceStylePage({
  title, subtitle, description, benefits, heroImage, galleryImages,
  seoTitle, metaDescription, intro2, features = DEFAULT_FEATURES, faqs = [],
}: FenceStylePageProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: `${title} Fence Installation`,
        name: `${title} Fencing`,
        description,
        areaServed: "Northern Illinois",
        provider: { "@id": `${SITE_URL}/#business` },
      },
      ...(faqs.length
        ? [{
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: `${title} Fences` },
        ],
      },
    ],
  };

  return (
    <div>
      <Seo
        title={seoTitle || `${title} Fences in Northern Illinois | Aztec Fence Company`}
        description={metaDescription || description.slice(0, 155)}
        image={heroImage}
        jsonLd={jsonLd}
      />
      {/* Hero */}
      <section className="relative h-[62vh] min-h-[460px] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt={`${title} fence installation by Aztec Fence in Northern Illinois`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/85 to-[#0f172a]/30" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-300 mb-5">
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                <ChevronRight size={14} className="text-gray-500" />
                <span className="text-cyan-400">{title} Fences</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4">{title} <span className="text-cyan-400">Fences</span></h1>
              <p className="text-gray-300 max-w-2xl text-lg">{subtitle}</p>
              {/* Rating / trust line */}
              <div className="flex items-center gap-2 mt-5 text-sm text-gray-300">
                <span className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={15} className="text-yellow-400 fill-yellow-400" />)}
                </span>
                <span>Rated 4.9 by 106+ Google reviews · 30+ years in Northern Illinois</span>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/contact/" className="px-8 py-3.5 bg-cyan-500 text-white font-bold rounded-full hover:bg-cyan-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">Free Consultation</Link>
                <a href="tel:8477404655" className="px-8 py-3.5 border-2 border-white/60 text-white font-bold rounded-full hover:bg-white hover:text-[#0f172a] transition-all hover:scale-105">Call (847) 740-4655</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-14">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2">
              <p className="text-cyan-600 text-sm font-semibold tracking-widest uppercase mb-3">{title} Fencing</p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-5">{title} Fence Installation in Northern Illinois</h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">{description}</p>
              {intro2 && <p className="text-gray-600 leading-relaxed mb-6">{intro2}</p>}
              <div className="mb-8">
                <p className="font-bold text-[#0f172a] mb-4 text-sm uppercase tracking-wide">Key Benefits</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {benefits.map((b, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3 text-gray-600">
                      <div className="w-7 h-7 rounded-full bg-cyan-50 flex items-center justify-center shrink-0"><Check size={14} className="text-cyan-500" /></div>
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <Link to="/contact/" className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white text-sm font-bold rounded-full hover:bg-cyan-600 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
                Get a Free Quote <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2">
              <div className="relative group overflow-hidden rounded-3xl shadow-2xl shadow-gray-200/50">
                <img src={heroImage} alt={`${title} fence by Aztec Fence`} className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose / Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-cyan-600 text-sm font-semibold tracking-widest uppercase mb-3">Why Aztec</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">Why Choose Aztec for {title} Fencing</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-200/40 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center mb-4">
                  <f.icon size={22} className="text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-cyan-600 text-sm font-semibold tracking-widest uppercase mb-3">Our Work</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">{title} Fence Gallery</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((src, idx) => (
              <motion.div
                key={src + idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.06, 0.4) }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg shadow-gray-200/40"
              >
                <picture className="block w-full h-full">
                  <source srcSet={src.replace("/images/", "/images/thumbs/").replace(/\.jpe?g$/i, ".webp")} type="image/webp" />
                  <img
                    src={src.replace("/images/", "/images/thumbs/")}
                    alt={`${title} fence installation in Northern Illinois — Aztec Fence project ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="480"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </picture>
                {/* Hover gradient overlay (now correctly clipped to the card) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white text-sm font-semibold">{title} Fence</span>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-2 ring-inset ring-cyan-400/0 group-hover:ring-cyan-400/60 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-cyan-600 text-sm font-semibold tracking-widest uppercase mb-3">How It Works</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">Our {title} Fence Installation Process</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-200/40">
                <span className="absolute top-4 right-5 text-4xl font-black text-gray-100 select-none">{p.step}</span>
                <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center mb-4">
                  <p.icon size={22} className="text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="text-cyan-600 text-sm font-semibold tracking-widest uppercase mb-3">FAQ</p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">{title} Fence Questions, Answered</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
            </motion.div>
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {faqs.map((f, i) => (
                <details key={i} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-[#0f172a] text-lg">
                    {f.q}
                    <ChevronRight size={20} className="text-cyan-500 shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="text-gray-600 leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0f172a] to-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={heroImage} alt="" aria-hidden="true" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-blue-900/90" />
        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready for Your {title} Fence?</h2>
          <p className="text-gray-300 text-lg mb-8">Get a free, no-obligation consultation and quote from Northern Illinois's trusted fence experts.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="tel:8477404655" className="flex items-center gap-2 px-8 py-3.5 bg-cyan-500 text-white font-bold rounded-full hover:bg-cyan-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">
              <Phone size={18} /> Call (847) 740-4655
            </a>
            <Link to="/contact/" className="px-8 py-3.5 border-2 border-white/40 text-white font-bold rounded-full hover:bg-white hover:text-[#0f172a] transition-all hover:scale-105">Request a Free Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
