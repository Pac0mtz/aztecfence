import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img src="/images/aluminum-02.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0f172a]/98 to-[#0f172a]" />
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">Contact Us</h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-cyan-400" />
                </div>
                <span>11 N Fairfield Rd, Round Lake, IL 60073</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-cyan-400" />
                </div>
                <a href="mailto:sales@aztecfence.net" className="hover:text-cyan-400 transition-colors">sales@aztecfence.net</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-cyan-400" />
                </div>
                <a href="tel:8477404655" className="hover:text-cyan-400 transition-colors">(847) 740-4655</a>
              </div>
            </div>
            <Link to="/contact/" className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-105">
              Request a Free Consultation
            </Link>
          </motion.div>

          {/* Business Hours */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">Business Hours</h3>
            <div className="space-y-4 text-sm text-gray-300">
              {[
                { label: "Mon - Fri", value: "7:00 AM to 5:00 PM" },
                { label: "Saturday", value: "7:00 AM to 11:00 AM" },
                { label: "Sunday", value: "Closed", red: true },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{item.label}</p>
                    <p className={item.red ? "text-red-400" : ""}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">Find Us</h3>
            <div className="rounded-xl overflow-hidden shadow-lg shadow-gray-900/40 border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2951.3777232346844!2d-88.10641492352565!3d42.27433887119966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880f9f6f5a5a5a5b%3A0x1234567890abcdef!2s11%20N%20Fairfield%20Rd%2C%20Round%20Lake%2C%20IL%2060073!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aztec Fence Location"
              />
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-6">
            <Link to="/terms-and-conditions/" className="hover:text-cyan-400 transition-colors">Terms and Conditions</Link>
          </div>
          <div className="flex items-center gap-3">
            <span>Website Designed & Developed by</span>
            <a href="http://webprochicago.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
              Web Pro Chicago
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
