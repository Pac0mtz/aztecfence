import { motion } from "framer-motion";
import { Check, Shield, Award, Users, Quote } from "lucide-react";
import Seo, { SITE_URL } from "../components/Seo";

export default function About() {
  return (
    <div>
      <Seo
        title="About Aztec Fence Company | 30+ Years in Northern Illinois"
        description="Family-owned since 1994, Aztec Fence Company has installed quality residential & commercial fencing across Northern Illinois for 30+ years. Licensed & insured."
        keywords="about Aztec Fence, fence company history, licensed fence contractor, Northern Illinois fencing"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "AboutPage", name: "About Aztec Fence Company", url: `${SITE_URL}/about-us/`, about: { "@id": `${SITE_URL}/#business` } },
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "About Us" },
            ] },
          ],
        }}
      />
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/aluminum-05.jpg" alt="About Aztec Fence" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-[#0f172a]/40" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">About <span className="text-cyan-400">Us</span></h1>
              <p className="text-gray-300 text-xl">The Aztec Fence Journey</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-30" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center gap-14">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2">
              <p className="text-cyan-600 font-bold text-sm mb-3 uppercase tracking-widest">Who We Are</p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-6">About Us</h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">Established back in 1994 by family members in Round Lake, IL, Aztec Fence had a humble start. They began with a beat-up truck, basic tools, and a shared love for fences, rooted in their experiences constructing agricultural barriers. The brothers discovered a joint talent for crafting robust wooden boundaries and took pride in their work.</p>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">What initially involved fulfilling requests from family and friends grew into a thriving fencing company. Proudly serving the greater Northern Illinois area and Chicagoland Suburbs, Aztec Fence now boasts a team of 50 skilled employees. This dedicated team adheres to professional standards, ethical business practices, and a craftsmanship that is often overlooked in today's construction industry.</p>
              <p className="text-gray-600 leading-relaxed text-lg">At Aztec Fence, our approach is a seamless blend of time-honored techniques and cutting-edge technologies. This ensures that our fences not only stand the test of time but also redefine the artistry of functional spaces.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-3xl blur-xl opacity-40" />
                <img src="/images/AZTEC-Fence-1.png" alt="Aztec Fence" className="relative w-full h-auto rounded-3xl shadow-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative bg-[#0f172a] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="/images/aluminum-19.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 to-blue-900/95" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <p className="text-6xl md:text-8xl font-bold text-cyan-400">30+</p>
            <p className="text-gray-300 text-xl mt-3 tracking-wide">Years In Business</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-40" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">Our Value</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Old-Fashioned Work Ethic", desc: "Some view manual labor as just a job, but we find joy and pride in our work. Our crew wakes up early and puts care into every cut, nail, and detail. We handle messy demolition, heavy lifting, concrete mixing, and more with smiles on our faces." },
              { title: "Our Vision", desc: "At Aztec Fence, our vision is to be the most trusted and sought-after fencing company in Northern area of Illinois for residential, commercial, and industrial properties. We aim to transform ordinary outdoor spaces into functional, safe, and beautiful sanctuaries that bring joy for years through exceptional craftsmanship and customer care." },
              { title: "Our Mission", desc: "Our mission is to deliver fence and gate installations plus repairs that check all the boxes when it comes to quality, aesthetics, durability, and value. By listening closely to home and business owners, we match solutions to functional and style needs while simplifying the process from estimating to permitting to lifetime maintenance." },
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }} whileHover={{ y: -8 }} className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/40 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote size={48} className="text-cyan-500" />
                </div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-4">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Satisfaction Guarantee", desc: "Experience service excellence backed by our promise." },
              { icon: Award, title: "Quality Materials", desc: "Our quality materials ensure durability." },
              { icon: Users, title: "Experience", desc: "30 years of making fences and gates in Northern Illinois." },
              { icon: Check, title: "Custom Fences", desc: "No pre-made panels - Customized to your needs." },
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={32} className="text-cyan-500" />
                </div>
                <h4 className="font-bold text-[#0f172a] mb-2">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
