import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Check, ClipboardCheck, Lock, Phone, Shield, Trees, Truck, Wrench,
} from "lucide-react";
import Seo, { SITE_URL } from "../components/Seo";

const operationalPillars = [
  {
    icon: Shield,
    title: "Protect the perimeter",
    text: "Secure equipment, inventory, employees, and restricted areas with commercial-grade systems.",
  },
  {
    icon: Lock,
    title: "Control access",
    text: "Plan vehicle and pedestrian entry points around how your team, deliveries, and customers move.",
  },
  {
    icon: ClipboardCheck,
    title: "Build for the long run",
    text: "Choose durable materials and details that stand up to weather, traffic, and daily use.",
  },
];

const services = [
  {
    icon: Shield,
    title: "Security Fencing",
    description: "Protect storage, equipment, and restricted areas with steel, composite, barbed-wire, or electric-fence options.",
  },
  {
    icon: Truck,
    title: "Loading & Shipping Enclosures",
    description: "Secure loading docks, inventory zones, and service areas while keeping operations organized.",
  },
  {
    icon: Wrench,
    title: "Industrial Gate Installation",
    description: "Create dependable vehicle access for facilities, maintenance bays, and storage lots.",
  },
  {
    icon: Shield,
    title: "Commercial Fence Repair",
    description: "Restore damaged sections, footings, finishes, and hardware before small issues become larger risks.",
  },
  {
    icon: Lock,
    title: "Custom Security Features",
    description: "Integrate access codes, intercoms, cameras, sensors, and perimeter reinforcement where needed.",
  },
  {
    icon: Trees,
    title: "Sound-Control Fencing",
    description: "Reduce machinery and traffic noise with specialty materials designed for commercial environments.",
  },
  {
    icon: Truck,
    title: "Temporary Construction Fencing",
    description: "Enclose active job sites quickly for safety, liability control, and theft deterrence.",
  },
];

const tailored = [
  {
    title: "Parks & Trail Access",
    desc: "Guide public movement and protect restricted green spaces with clear, durable access points.",
  },
  {
    title: "Pool Safety Barriers",
    desc: "Use self-closing gates and sightline-friendly fencing to protect aquatic areas.",
  },
  {
    title: "Perimeter Access Control",
    desc: "Combine commercial fencing and automated gates for a secure, branded site entrance.",
  },
];

const whyAztec = [
  "30+ years serving Northern Illinois businesses and properties.",
  "One accountable team from planning and permitting to installation.",
  "Commercial-grade materials selected for the site and application.",
  "Clear scope, reliable scheduling, and a final walkthrough.",
];

function optimizedWebp(src: string, width: 640 | 1280) {
  return src
    .replace("/images/", "/images/optimized/")
    .replace(/\.jpe?g$/i, "-" + width + ".webp");
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

export default function Commercial() {
  return (
    <div>
      <Seo
        title="Commercial & Industrial Fencing in Northern Illinois | Aztec Fence"
        description="Commercial fencing for businesses & industrial sites — security fencing, chain link, ornamental steel & access gates across Northern Illinois. Free quotes: (847) 740-4655."
        keywords="commercial fencing, industrial fence, security fence, chain link fence, perimeter fencing, Northern Illinois"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              serviceType: "Commercial Fence Installation",
              name: "Commercial Fencing",
              areaServed: "Northern Illinois",
              provider: { "@id": SITE_URL + "/#business" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
                { "@type": "ListItem", position: 2, name: "Commercial Fencing" },
              ],
            },
          ],
        }}
      />

      <section className="relative min-h-[500px] md:min-h-[620px] text-white overflow-hidden">
        <div className="absolute inset-0">
          <ProjectImage
            src="/images/commercial-03-2.jpg"
            alt="Commercial security fence installation by Aztec Fence"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071225]/95 via-[#0f172a]/84 to-[#0f172a]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071225]/60 via-transparent to-transparent" />
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
                Commercial & industrial fencing
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.03] mb-5">
                Secure the site.<br />
                <span className="text-cyan-300">Keep work moving.</span>
              </h1>
              <p className="text-gray-100/90 max-w-2xl text-base sm:text-lg leading-relaxed">
                Commercial fencing, gates, and access solutions planned around your property, operations, and long-term security.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                <Link
                  to="/contact/"
                  className="inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-cyan-500 text-white font-bold rounded-full hover:bg-cyan-400 transition-colors"
                >
                  Request a Site Consultation <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <a
                  href="tel:8477404655"
                  className="inline-flex justify-center items-center px-7 py-3.5 border border-white/60 text-white font-bold rounded-full hover:bg-white hover:text-[#0f172a] transition-colors"
                >
                  Call (847) 740-4655
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f172a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3">
          {operationalPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className={"w-full py-5 md:px-8 " + (index === 0 ? "" : "border-t border-white/15 md:border-t-0 md:border-l")}
              >
                <span className="w-11 h-11 rounded-xl bg-cyan-400/15 text-cyan-300 inline-flex items-center justify-center">
                  <Icon size={21} />
                </span>
                <h2 className="mt-4 text-xl font-bold">{pillar.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{pillar.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="relative w-full min-h-[21rem] sm:min-h-[28rem] overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/15"
          >
            <ProjectImage
              src="/images/Commercial-Fences-05-2.jpg"
              alt="Commercial perimeter fencing on a Northern Illinois property"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/78 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-[#0f172a]/90 backdrop-blur-sm px-5 py-4 text-white">
              <p className="text-cyan-300 text-xs font-bold uppercase tracking-[0.16em]">Site-first planning</p>
              <p className="mt-1 font-semibold">A perimeter that works with your daily traffic and access needs.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <p className="text-cyan-600 text-sm font-bold uppercase tracking-[0.16em] mb-3">Commercial projects need more than a boundary</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] leading-tight">
              Plan around how the site actually operates.
            </h2>
            <p className="text-gray-600 leading-relaxed mt-5 text-lg">
              From a first site walk to the finished installation, Aztec Fence helps resolve the practical details that affect security, access, and day-to-day use.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                "Define the right perimeter, material, and height for the application.",
                "Coordinate vehicle gates, pedestrian access, and high-use areas.",
                "Build a durable system that is easier to maintain over time.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-0.5 w-7 h-7 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
                    <Check size={15} className="text-cyan-600" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
            <p className="text-cyan-600 text-sm font-bold uppercase tracking-[0.16em] mb-3">Commercial solutions</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">Protection built around the job to be done.</h2>
            <p className="text-gray-600 mt-4 leading-relaxed">Use the service mix that fits your facility, site traffic, and risk profile.</p>
          </motion.div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5 lg:gap-7 items-stretch">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="relative min-h-[24rem] overflow-hidden rounded-3xl text-white"
            >
              <ProjectImage
                src="/images/commercial-29-2.jpg"
                alt="Commercial security fencing project"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081329]/95 via-[#0f172a]/55 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <span className="w-11 h-11 rounded-xl bg-cyan-400 text-[#0f172a] inline-flex items-center justify-center"><Shield size={22} /></span>
                <h3 className="mt-4 text-2xl font-bold">{services[0].title}</h3>
                <p className="mt-2 text-gray-100 leading-relaxed">{services[0].description}</p>
              </div>
            </motion.article>

            <div className="w-full rounded-3xl border border-slate-200 bg-white overflow-hidden">
              {services.slice(1).map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.article
                    key={service.title}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.18) }}
                    className={"flex gap-4 p-5 sm:p-6 " + (index === services.length - 2 ? "" : "border-b border-slate-100")}
                  >
                    <span className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 inline-flex items-center justify-center shrink-0">
                      <Icon size={19} />
                    </span>
                    <div>
                      <h3 className="font-bold text-[#0f172a]">{service.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">{service.description}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl mb-10 md:mb-12"
          >
            <p className="text-cyan-600 text-sm font-bold uppercase tracking-[0.16em] mb-3">Use cases</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">Solutions tailored to the property.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 rounded-3xl overflow-hidden border border-slate-200">
            {tailored.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className={"p-7 sm:p-8 bg-white " + (index === 0 ? "" : "border-t border-slate-200 md:border-t-0 md:border-l")}
              >
                <p className="text-cyan-600 text-sm font-black tracking-[0.18em]">0{index + 1}</p>
                <h3 className="mt-5 text-xl font-bold text-[#0f172a]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#eaf8fb]">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="w-full"
          >
            <p className="text-cyan-700 text-sm font-bold uppercase tracking-[0.16em] mb-3">Why Aztec Fence</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] leading-tight">An accountable partner for a critical site decision.</h2>
            <p className="mt-5 text-gray-600 leading-relaxed text-lg">
              We bring the field experience, material knowledge, and local accountability to help make the project straightforward.
            </p>
          </motion.div>
          <div className="w-full grid sm:grid-cols-2 gap-x-8">
            {whyAztec.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="flex items-start gap-3 py-5 border-t border-cyan-900/15"
              >
                <span className="mt-0.5 w-7 h-7 rounded-full bg-[#0f172a] text-cyan-300 flex items-center justify-center shrink-0">
                  <Check size={15} />
                </span>
                <p className="text-sm leading-relaxed font-medium text-[#0f172a]">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f172a] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ProjectImage src="/images/commercial-03-2.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#0f172a]/80" />
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-cyan-300 text-sm font-bold uppercase tracking-[0.16em]">Start the conversation</p>
          <h2 className="text-3xl md:text-5xl font-bold mt-3">Ready to plan your commercial fence project?</h2>
          <p className="text-gray-200 text-lg leading-relaxed mt-5">Tell us about the property, access needs, and timeline. We will help shape the next step.</p>
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
