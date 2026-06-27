import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Phone, Shield, Truck, Wrench, Lock, Trees } from "lucide-react";
import Seo, { SITE_URL } from "../components/Seo";

const services = [
  { icon: Shield, title: "Security Fencing", description: "Security fencing provides formidable protective barriers safeguarding inventory, equipment, and restricted areas from intrusions. Our secure fence options include: Steel Palisade Fencing, Composite Fencing, Barbed Wire Fencing, Electric Fencing." },
  { icon: Truck, title: "Loading/Shipping Area Enclosures", description: "Loading docks, inventory or equipment storage areas are fortified against theft. We also install privacy screens concealing waste collection areas from public view." },
  { icon: Wrench, title: "Industrial Gate Installation", description: "Retractable vehicular gates provide convenient, damage-proof access for manufacturing facilities, maintenance bays, and storage lots. Integrate rail tracks, power operation, safety measures." },
  { icon: Shield, title: "Industrial Fence Repair", description: "Aztec Fence performs structural commercial fence repairs from weather damage, accidents, and age. We replace broken slats, bend/weld mangled sections, reinforce footings and refresh corrosion-resistant finishes." },
  { icon: Lock, title: "Custom Security Features", description: "Enhance perimeter fences with barbed/razor wire, electric security mesh, surveillance camera mounts, sensor beams ringing alarm systems. Programmable access codes, intercom directories and more." },
  { icon: Trees, title: "Soundproof Fencing", description: "We engineer specialty acoustic fencing containing unpleasant machinery clamor from neighboring properties. Materials like insulated metal and sound-dampening wood mitigate noise pollution." },
  { icon: Shield, title: "Temporary Construction Fencing", description: "Temporary chain link fences securely enclose active sites for liability safety. Quick to install/remove, the durable barriers also deter trespassers and vandalism through all phases from demolition to finish." },
];

const tailored = [
  { title: "Park/Trail Access Points", desc: "Control public access to private green spaces with limited ingress/egress. Define proper walkway flows with fences promoting intended directionality." },
  { title: "Pool Safety Barriers", desc: "Self-closing access gates with childproof latches protect aquatic areas. Open ornamental iron fences maintain visibility while restricting unsupervised entry." },
  { title: "Perimeter Access Control", desc: "Perimeter fencing governs site access points for employees or customers. Ornamental metals like aluminum and automated gates promote branded aesthetics while integrating intercoms and credential readers." },
];

const whyUs = [
  { title: "30+ Years Commercial Fencing Experience", desc: "Trusted partner for business parks, retail centers, and industrial complexes." },
  { title: "Highly Skilled Crew", desc: "In-house team handles entire process start to finish." },
  { title: "Quality Commercial Grade Materials", desc: "Steel, aluminum, ornamental iron stands up to use/abuse. Withstands corrosion, decay, weathering." },
  { title: "Streamlined Process", desc: "We oversee everything from permitting and installation to final cleanup." },
  { title: "100% Satisfaction Guarantee", desc: "Experience service excellence backed by our promise." },
  { title: "Structurally Sound Craftsmanship", desc: "Commercial fences built to last with proper footings, strength, hardware." },
];

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
            { "@type": "Service", serviceType: "Commercial Fence Installation", name: "Commercial Fencing", areaServed: "Northern Illinois", provider: { "@id": `${SITE_URL}/#business` } },
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Commercial Fencing" },
            ] },
          ],
        }}
      />
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/commercial-03-2.jpg" alt="Commercial fence" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-[#0f172a]/40" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-cyan-400 font-bold mb-2 uppercase tracking-widest text-sm">Commercial</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">Fencing <span className="text-cyan-400">Services</span></h1>
              <p className="text-gray-300 max-w-2xl text-lg">As a family-owned fencing leader serving Northern Illinois for over 30 years, Aztec Fence offers unmatched quality, expertise, and care for commercial fence installations.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="tel:8477404655" className="px-8 py-3.5 bg-cyan-500 text-white font-bold rounded-full hover:bg-cyan-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">Call (847) 740-4655</a>
                <Link to="/contact/" className="px-8 py-3.5 border-2 border-white/60 text-white font-bold rounded-full hover:bg-white hover:text-[#0f172a] transition-all hover:scale-105">Request a Free Consultation</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-[#0f172a] to-blue-900 text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/Commercial-Fences-05-2.jpg" alt="" className="w-full h-full object-cover" />
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

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">Commercial & <span className="text-cyan-600">Industrial Fences</span></h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
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

      {/* Tailored Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">Tailored Fencing Solutions</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Aztec Fence goes beyond one-size-fits-all fencing to bring inspiring visions to life for commercial clients.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tailored.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -6 }} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-7 border border-gray-100 shadow-lg shadow-gray-100/40">
                <h3 className="text-xl font-bold text-[#0f172a] mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">Why <span className="text-cyan-600">Aztec Fence?</span></h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyUs.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} whileHover={{ y: -4 }} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-md shadow-gray-100/40 border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={16} className="text-cyan-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0f172a] text-sm">{item.title}</h4>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0f172a] to-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="/images/commercial-29-2.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-blue-900/90" />
        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">Let's Get Started</h2>
          <p className="text-xl mb-2">Start Your Fence Project</p>
          <p className="text-gray-300 mb-8">Contact us today at (847) 740-4655 for a FREE design consultation and quote.</p>
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
