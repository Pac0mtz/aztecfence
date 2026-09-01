import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Seo, { SITE_URL } from "../components/Seo";
import { getAdsParams, saveLeadUserData } from "../lib/ads";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  // honeypot — bots fill this; humans don't see it
  const [botcheck, setBotcheck] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, botcheck, ads: getAdsParams() }),
      });

      const data = await res.json();

      if (data.success) {
        if (botcheck) {
          setSubmitted(true);
          return;
        }
        saveLeadUserData({ email: form.email, phone: form.phone });
        window.location.assign("/thank-you/");
        return;
      } else {
        setError(data.message || "Something went wrong. Please call us at (847) 740-4655.");
      }
    } catch {
      setError("Network error. Please call us at (847) 740-4655 or email sales@aztecfence.net.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Seo
        title="Contact Aztec Fence Company | Free Fence Quote in Northern Illinois"
        description="Contact Aztec Fence Company for a free fencing consultation and quote. Call (847) 740-4655 or visit us at 11 N Fairfield Rd, Round Lake, IL 60073."
        keywords="contact fence company, free fence quote, fence estimate Northern Illinois, Round Lake fence contractor"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "ContactPage", name: "Contact Aztec Fence Company", url: `${SITE_URL}/contact/`, about: { "@id": `${SITE_URL}/#business` } },
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Contact" },
            ] },
          ],
        }}
      />
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/aluminum-21.jpg" alt="Contact" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-[#0f172a]/40" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">Contact <span className="text-cyan-400">Us</span></h1>
              <p className="text-gray-300 text-xl max-w-2xl mx-auto">Ready to start your fencing project? Get in touch with our team for a free consultation and quote.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-30" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/3">
              <h2 className="text-3xl font-bold text-[#0f172a] mb-8">Get In Touch</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Address", value: "11 N Fairfield Rd, Round Lake, IL 60073", isLink: false },
                  { icon: Mail, label: "Email", value: "sales@aztecfence.net", isLink: true, href: "mailto:sales@aztecfence.net" },
                  { icon: Phone, label: "Phone", value: "(847) 740-4655", isLink: true, href: "tel:8477404655" },
                ].map((item, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center shrink-0 group-hover:shadow-md transition-shadow">
                      <item.icon size={20} className="text-cyan-600" />
                    </div>
                    <div>
                      <p className="font-bold text-[#0f172a] text-sm">{item.label}</p>
                      {item.isLink ? (
                        <a href={item.href!} className="text-gray-600 hover:text-cyan-600 transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-gray-600">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0f172a] text-sm">Business Hours</p>
                    <p className="text-gray-600 text-sm">Mon - Fri: 7:00 AM to 5:00 PM</p>
                    <p className="text-gray-600 text-sm">Saturday: 7:00 AM to 11:00 AM</p>
                    <p className="text-red-500 text-sm font-medium">Sunday: Closed</p>
                  </div>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 rounded-2xl overflow-hidden shadow-xl shadow-gray-200/40 border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2951.3777232346844!2d-88.10641492352565!3d42.27433887119966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880f9f6f5a5a5a5b%3A0x1234567890abcdef!2s11%20N%20Fairfield%20Rd%2C%20Round%20Lake%2C%20IL%2060073!5e0!3m2!1sen!2sus!4v1700000000000"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Aztec Fence Location"
                />
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-2/3">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/40 border border-gray-100">
                {submitted ? (
                  <div className="text-center py-16">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                      <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-[#0f172a] mb-3">Thank You!</h3>
                    <p className="text-gray-600 text-lg">We have received your request and will contact you shortly.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Request a Free Consultation</h2>
                    <p className="text-gray-500 text-sm mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Honeypot — hidden from real users, catches bots */}
                      <input
                        type="checkbox"
                        name="botcheck"
                        className="hidden"
                        style={{ display: "none" }}
                        tabIndex={-1}
                        autoComplete="off"
                        checked={!!botcheck}
                        onChange={(e) => setBotcheck(e.target.value)}
                      />
                      {error && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
                          <AlertCircle size={18} className="shrink-0 mt-0.5" />
                          <p className="text-sm">{error}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="contact-name" className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                          <input id="contact-name" name="name" autoComplete="name" required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-gray-50/50" placeholder="John Doe" />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                          <input id="contact-email" name="email" autoComplete="email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-gray-50/50" placeholder="john@example.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="contact-phone" className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                          <input id="contact-phone" name="phone" autoComplete="tel" required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-gray-50/50" placeholder="(847) 740-4655" />
                        </div>
                        <div>
                          <label htmlFor="contact-service" className="block text-sm font-bold text-gray-700 mb-2">Service Interested In</label>
                          <select id="contact-service" name="service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-gray-50/50">
                            <option value="">Select a service</option>
                            <option value="wood">Wood Fences</option>
                            <option value="privacy">Privacy Fences</option>
                            <option value="chain-link">Chain Link Fences</option>
                            <option value="vinyl">Vinyl Fences</option>
                            <option value="aluminum">Aluminum Fences</option>
                            <option value="commercial">Commercial Fences</option>
                            <option value="residential">Residential Fences</option>
                            <option value="gates">Custom Gates</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="contact-message" className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                        <textarea id="contact-message" name="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-gray-50/50 resize-none" placeholder="Tell us about your project..." />
                      </div>
                      <p className="text-xs text-gray-500">
                        By submitting, you agree to our{" "}
                        <Link to="/privacy-policy/" className="text-cyan-700 underline hover:text-cyan-600">
                          Privacy Policy
                        </Link>{" "}
                        and consent to be contacted about your fencing project.
                      </p>
                      <button
                        type="submit"
                        disabled={loading}
                        className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#0f172a] to-blue-900 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Submit Request
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
