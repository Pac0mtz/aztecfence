import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ArrowRight, Phone } from "lucide-react";
import { useRef } from "react";
import Seo, { SITE_URL } from "../components/Seo";

export default function Gates() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div>
      <Seo
        title="Gate Installation in Northern Illinois | Aztec Fence Company"
        description="Custom residential & commercial gates — swing, slide, and automated entry gates in steel, aluminum & wood across Northern Illinois. Free quotes: (847) 740-4655."
        keywords="gate installation, driveway gates, automated gates, residential gates, commercial gates, Northern Illinois"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Service", serviceType: "Gate Installation", name: "Gate Installation", areaServed: "Northern Illinois", provider: { "@id": `${SITE_URL}/#business` } },
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Gates" },
            ] },
          ],
        }}
      />
      {/* Hero — Parallax */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[450px] text-white overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src="/images/IMG_9651-qoso1lt7nrozj7wpqcc814w4zh0zl4ps9qr85zsed4.jpg" alt="Gates" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-[#0f172a]/50" />
        </motion.div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-cyan-400 font-bold mb-2 uppercase tracking-widest text-sm">Residential & Commercial</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">Gates <span className="text-cyan-400">Services</span></h1>
              <p className="text-gray-300 max-w-2xl text-lg">Reliable Protection for Homes, Businesses, and Industrial Sites</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/contact/" className="px-8 py-3.5 bg-cyan-500 text-white font-bold rounded-full hover:bg-cyan-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">Free Consultation</Link>
                <a href="tel:8477404655" className="px-8 py-3.5 border-2 border-white/60 text-white font-bold rounded-full hover:bg-white hover:text-[#0f172a] transition-all hover:scale-105">Call (847) 740-4655</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Residential Gates */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-14">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-5">Residential Gates</h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">Our residential gates, made from durable materials like wrought iron, steel, or aluminum, reflect your style while controlling traffic to and from your property. Trust our expertise for a comprehensive solution customized to your needs.</p>
              <ul className="space-y-3 mb-8">
                {["Reflects style", "Controls traffic", "Customized operator systems"].map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 text-gray-600">
                    <div className="w-7 h-7 rounded-full bg-cyan-50 flex items-center justify-center shrink-0"><Check size={14} className="text-cyan-500" /></div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2">
              <div className="relative group overflow-hidden rounded-3xl shadow-2xl shadow-gray-200/50">
                <img src="/images/gate-05.jpg" alt="Residential gate" className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commercial Gates */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-14">
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-5">Commercial Gates</h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">Designed to withstand heavy usage and offer robust access control, our commercial gates are suitable for properties of all sizes. Aztec Fence ensures reliability and durability for your commercial gate needs.</p>
              <ul className="space-y-3 mb-8">
                {["Heavy-duty construction", "Access control integration", "Automated options available"].map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 text-gray-600">
                    <div className="w-7 h-7 rounded-full bg-cyan-50 flex items-center justify-center shrink-0"><Check size={14} className="text-cyan-500" /></div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2">
              <div className="relative group overflow-hidden rounded-3xl shadow-2xl shadow-gray-200/50">
                <img src="/images/Residential-Steel-Gate-Frames-on-Wood-04-qpkcpnguf4rspu51goub3xixmouijo0fbhddkk34qg.jpg" alt="Commercial gate" className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">Gate Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/images/gate-05.jpg",
              "/images/gate-06.jpg",
              "/images/gate-3139.jpg",
              "/images/Residential-Steel-Gate-Frames-on-Wood-04-qpkcpnguf4rspu51goub3xixmouijo0fbhddkk34qg.jpg",
            ].map((src, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="group overflow-hidden rounded-2xl shadow-lg">
                <img src={src} alt={`Gate project ${idx + 1}`} className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/photo-gallery/" className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#0f172a] text-white font-bold rounded-full hover:bg-cyan-600 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
              View Full Gallery <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0f172a] to-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="/images/aluminum-05.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-blue-900/90" />
        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready for Your Custom Gate?</h2>
          <p className="text-gray-300 text-lg mb-8">Contact us today for a free consultation and quote.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="tel:8477404655" className="flex items-center gap-2 px-8 py-3.5 bg-cyan-500 text-white font-bold rounded-full hover:bg-cyan-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">
              <Phone size={18} /> Call (847) 740-4655
            </a>
            <Link to="/contact/" className="px-8 py-3.5 border-2 border-white/40 text-white font-bold rounded-full hover:bg-white hover:text-[#0f172a] transition-all hover:scale-105">
              Request a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
