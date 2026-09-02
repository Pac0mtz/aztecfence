import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Check, Fence, HardHat, Paintbrush, Phone, Shield, Wrench,
} from "lucide-react";
import Seo, { SITE_URL } from "../components/Seo";

const fenceOptions = [
  {
    icon: Shield,
    title: "Privacy Fences",
    description: "Create a quieter, more private backyard with a design that fits your home.",
    href: "/privacy-fences/",
  },
  {
    icon: Paintbrush,
    title: "Aluminum & Ornamental",
    description: "Add curb appeal while keeping sightlines open around gardens, pools, and patios.",
    href: "/aluminum-fences/",
  },
  {
    icon: Wrench,
    title: "Vinyl Fencing",
    description: "Enjoy a clean, low-maintenance fence with lasting color and dependable strength.",
    href: "/vinyl-picket-fencing/",
  },
  {
    icon: Fence,
    title: "Chain Link",
    description: "A practical, budget-conscious choice for pets, yards, and property boundaries.",
    href: "/chain-link-fences/",
  },
  {
    icon: HardHat,
    title: "Wood Fencing",
    description: "Bring warmth and classic character to your property with a custom wood fence.",
    href: "/wood-picket-fencing/",
  },
];

const homeownerBenefits = [
  "A clear recommendation based on privacy, pets, style, and budget.",
  "Materials selected for Northern Illinois weather and everyday use.",
  "An experienced local crew from layout through final walkthrough.",
];

function optimizedWebp(src: string, width: 640 | 1280) {
  return src
    .replace("/images/", "/images/optimized/")
    .replace(/\.jpe?g$/i, \`-\${width}.webp\`);
}

function ProjectImage({
  src,
  alt,
  className,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className: string;
  loading?: "lazy" | "eager";
}) {
  return (
    <picture className="block h-full w-full">
      <source media="(max-width: 767px)" srcSet={optimizedWebp(src, 640)} type="image/webp" />
      <source srcSet={optimizedWebp(src, 1280)} type="image/webp" />
      <img src={src} alt={alt} className={className} loading={loading} decoding="async" />
    </picture>
  );
}

export default function Residential() {
  return (
    <div>
      <Seo
        title="Residential Fencing in Northern Illinois | Aztec Fence Company"
        description="Residential fence installation — wood, vinyl, aluminum & chain link — that adds beauty, privacy, and value to your Northern Illinois home. Free quotes: (847) 740-4655."
        keywords="residential fencing, home fence installation, backyard fence, privacy fence, Northern Illinois fence company"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              serviceType: "Residential Fence Installation",
              name: "Residential Fencing",
              areaServed: "Northern Illinois",
              provider: { "@id": SITE_URL + "/#business" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
                { "@type": "ListItem", position: 2, name: "Residential Fencing" },
              ],
            },
          ],
        }}
      />

      <section className="relative min-h-[500px] md:min-h-[620px] text-white overflow-hidden">
        <div className="absolute inset-0">
          <ProjectImage
            src="/images/Residential-vinyl-privacy-fence-10.jpg"
            alt="Residential privacy fence installed by Aztec Fence"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081329]/95 via-[#0f172a]/82 to-[#0f172a]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081329]/60 via-transparent to-transparent" />
        </div>

        <div className="relative min-h-[500px] md:min-h-[620px] flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-3xl"
            >
              <p className="text-cyan-300 font-bold uppercase tracking-[0.18em] text-xs sm:text-sm mb-4">
                Residential fencing in Northern Illinois
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.03] mb-5">
                A fence that <span className="text-cyan-300">feels like home.</span>
              </h1>
              <p className="text-gray-100/90 max-w-2xl text-base sm:text-lg leading-relaxed">
                Thoughtful fencing for privacy, pets, curb appeal, and the way your family uses the yard.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                <Link
                  to="/contact/"
                  className="inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-cyan-500 text-white font-bold rounded-full hover:bg-cyan-400 transition-colors"
                >
                  Get a Free Quote <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <a
                  href="tel:8477404655"
                  className="inline-flex justify-center items-center px-7 py-3.5 border border-white/60 text-white font-bold rounded-full hover:bg-white hover:text-[#0f172a] transition-colors"
                >
                  Call (847) 740-4655
                </a>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-8 text-sm text-gray-200">
                <span className="inline-flex items-center gap-2"><Check size={16} className="text-cyan-300" /> 30+ years local experience</span>
                <span className="inline-flex items-center gap-2"><Check size={16} className="text-cyan-300" /> Free, no-obligation consultation</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <p className="text-cyan-600 text-sm font-bold uppercase tracking-[0.16em] mb-3">Designed around your home</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] leading-tight">
              Make the yard work better for your family.
            </h2>
            <p className="text-gray-600 leading-relaxed mt-5 text-lg">
              The right fence should solve a real need, not just fill a property line. We help you compare materials, styles, and layouts before installation begins.
            </p>
            <ul className="mt-7 space-y-4">
              {homeownerBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-0.5 w-7 h-7 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
                    <Check size={15} className="text-cyan-600" />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="relative w-full min-h-[21rem] sm:min-h-[28rem] overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/15"
          >
            <ProjectImage
              src="/images/Residential-wood-solid-privacy-fence-11.jpg"
              alt="Wood privacy fence surrounding a Northern Illinois home"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/78 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-[#0f172a]/90 backdrop-blur-sm px-5 py-4 text-white">
              <p className="text-cyan-300 text-xs font-bold uppercase tracking-[0.16em]">Built for real life</p>
              <p className="mt-1 font-semibold">Privacy where you need it. A look you will enjoy every day.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl mb-10 md:mb-12"
          >
            <p className="text-cyan-600 text-sm font-bold uppercase tracking-[0.16em] mb-3">Choose your fence style</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">Start with the need your fence should solve.</h2>
            <p className="text-gray-600 mt-4 leading-relaxed">Explore the options that match your property, then we will help refine the details.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fenceOptions.map((option, index) => {
              const Icon = option.icon;

              if (index === 0) {
                return (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    className="md:col-span-2 w-full"
                  >
                    <Link to={option.href} className="group relative block min-h-[16rem] overflow-hidden rounded-3xl text-white">
                      <ProjectImage
                        src="/images/Residential-vinyl-privacy-fence-10.jpg"
                        alt="Residential privacy fence"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#081329]/90 via-[#0f172a]/65 to-transparent" />
                      <div className="absolute inset-x-6 bottom-6 sm:inset-auto sm:left-8 sm:bottom-8 sm:max-w-md">
                        <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-cyan-400 text-[#0f172a]"><Icon size={22} /></span>
                        <h3 className="mt-4 text-2xl sm:text-3xl font-bold">{option.title}</h3>
                        <p className="mt-2 text-gray-100 leading-relaxed">{option.description}</p>
                        <span className="mt-4 inline-flex items-center gap-2 font-bold text-cyan-300">Explore privacy fences <ArrowRight size={17} /></span>
                      </div>
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.16) }}
                  className="w-full"
                >
                  <Link
                    to={option.href}
                    className={"group h-full min-h-[11rem] rounded-2xl border border-slate-200 p-6 flex flex-col justify-between transition-colors hover:border-cyan-300 " + (index % 2 === 0 ? "bg-cyan-50/55" : "bg-white")}
                  >
                    <span className="w-11 h-11 rounded-xl bg-[#0f172a] text-cyan-300 flex items-center justify-center"><Icon size={21} /></span>
                    <div className="mt-6">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-bold text-[#0f172a]">{option.title}</h3>
                        <ArrowRight size={18} className="text-cyan-600 shrink-0 transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{option.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f172a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ProjectImage src="/images/aluminum-02.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#0f172a]/75" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-cyan-300 text-sm font-bold uppercase tracking-[0.16em]">Your project starts here</p>
          <h2 className="text-3xl md:text-5xl font-bold mt-3">Ready for a fence that fits your home?</h2>
          <p className="text-gray-200 text-lg leading-relaxed mt-5">Talk with a local Aztec Fence specialist about your property and receive a clear, no-obligation quote.</p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-8">
            <Link to="/contact/" className="inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-cyan-500 text-white font-bold rounded-full hover:bg-cyan-400 transition-colors">
              Request a Free Consultation <ArrowRight size={18} />
            </Link>
            <a href="tel:8477404655" className="inline-flex justify-center items-center gap-2 px-8 py-3.5 border border-white/45 text-white font-bold rounded-full hover:bg-white hover:text-[#0f172a] transition-colors">
              <Phone size={18} /> Call (847) 740-4655
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
