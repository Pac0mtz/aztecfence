import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Shield, Fence, Paintbrush, Wrench, HardHat } from "lucide-react";
import Seo, { SITE_URL } from "../components/Seo";

const services = [
  { icon: Shield, title: "Privacy Fence Installation", description: "Creating barriers to shield your property from prying eyes and noise, ensuring a private and serene environment." },
  { icon: Fence, title: "Security Fence Installation", description: "Installing robust fences to deter trespassers and enhance the security of your residential property." },
  { icon: Paintbrush, title: "Decorative Fencing Solutions", description: "Beautiful ornamental fences that add curb appeal while defining property boundaries." },
  { icon: Wrench, title: "Vinyl Fence Installation", description: "Providing durable and low-maintenance fencing solutions that offer both style and longevity." },
  { icon: HardHat, title: "Chain Link Fence Installation", description: "Offering versatile and cost-effective fencing options suitable for various residential applications." },
  { icon: Shield, title: "Ornamental Iron Fence Installation", description: "Elegant wrought iron and aluminum fences that combine beauty with strength and security." },
];

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
            { "@type": "Service", serviceType: "Residential Fence Installation", name: "Residential Fencing", areaServed: "Northern Illinois", provider: { "@id": `${SITE_URL}/#business` } },
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Residential Fencing" },
            ] },
          ],
        }}
      />
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/Residential-vinyl-privacy-fence-10.jpg" alt="Residential fence" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-[#0f172a]/40" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-cyan-400 font-bold mb-2 uppercase tracking-widest text-sm">Residential</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">Fence <span className="text-cyan-400">Services</span></h1>
              <p className="text-gray-300 max-w-2xl text-lg">For over 30 years, Aztec Fence has been the trusted family-owned leader in Northern Illinois, specializing in residential fencing.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="tel:8477404655" className="px-8 py-3.5 bg-cyan-500 text-white font-bold rounded-full hover:bg-cyan-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">Call (847) 740-4655</a>
                <Link to="/contact/" className="px-8 py-3.5 border-2 border-white/60 text-white font-bold rounded-full hover:bg-white hover:text-[#0f172a] transition-all hover:scale-105">Book a Free Consultation</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-[#0f172a] to-blue-900 text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/aluminum-02.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "13K+", label: "Happy Clients" },
              { number: "25K+", label: "Projects Done" },
              { number: "41+", label: "Professional Experts" },
              { number: "4.6", label: "Customer Rating" },
            ].map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <p className="text-4xl md:text-5xl font-bold">{stat.number}</p>
                <p className="text-gray-300 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">Residential <span className="text-cyan-600">Fence Services</span></h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Aztec Fence goes beyond one-size-fits-all fencing to bring inspiring visions to life.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} whileHover={{ y: -6 }} className="bg-white rounded-2xl p-7 shadow-lg shadow-gray-200/40 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center mb-4">
                  <service.icon size={28} className="text-cyan-500" />
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0f172a] to-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="/images/Residential-wood-solid-privacy-fence-11.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-blue-900/90" />
        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Transform Your Property?</h2>
          <p className="text-gray-300 text-lg mb-8">Contact us today at (847) 740-4655 for a FREE design consultation and quote.</p>
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
