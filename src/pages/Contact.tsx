import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MapPin, Send, AlertCircle, Loader2 } from "lucide-react";
import Seo, { SITE_URL } from "../components/Seo";
import QuotePhotoUpload from "../components/QuotePhotoUpload";
import { getAdsParams, saveLeadUserData } from "../lib/ads";

const inputClass =
  "w-full min-w-0 px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-lg sm:rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-white text-base";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [botcheck, setBotcheck] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setLoading(true);
    setError(null);

    try {
      const fd = new FormData(formEl);
      fd.set("ads", JSON.stringify(getAdsParams()));
      const email = String(fd.get("email") || "");
      const phone = String(fd.get("phone") || "");

      const res = await fetch("/api/contact", {
        method: "POST",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));

      if (data.success) {
        if (botcheck) return;
        saveLeadUserData({ email, phone });
        window.location.assign("/thank-you/");
        return;
      }
      setError(data.message || "Something went wrong. Please call us at (847) 740-4655.");
    } catch {
      setError("Network error. Please call us at (847) 740-4655 or email sales@aztecfence.net.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f172a]">
      <Seo
        title="Free Fence Quote | Aztec Fence Company Northern Illinois"
        description="Get a free Aztec Fence quote. Send photos of your yard, fence type, and property address. Call (847) 740-4655 or request an estimate online."
        keywords="free fence quote, fence estimate Northern Illinois, Round Lake fence quote, upload fence photos"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "ContactPage", name: "Free Fence Quote | Aztec Fence Company", url: `${SITE_URL}/contact/`, about: { "@id": `${SITE_URL}/#business` } },
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Free Quote" },
            ] },
          ],
        }}
      />

      <section className="relative text-white">
        <div className="absolute inset-0">
          <img src="/images/aluminum-21.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0f172a]/88" />
        </div>

        <div className="relative max-w-3xl mx-auto px-3 sm:px-4 py-5 sm:py-8 md:py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4 sm:mb-6">
            <p className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-1.5 sm:mb-2">Free, no-obligation</p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-3 leading-tight">Get Your Quote</h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Tell us about the job and add photos of the yard. We typically follow up within one business day.
            </p>
            <a href="tel:8477404655" className="inline-flex items-center gap-2 mt-3 sm:mt-4 text-cyan-300 font-bold hover:text-white">
              <Phone size={18} /> (847) 740-4655
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white text-[#0f172a] rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-2xl space-y-4 sm:space-y-5"
          >
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

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="contact-name" className="block text-[13px] sm:text-sm font-bold mb-1.5 sm:mb-2">Full name *</label>
                <input id="contact-name" name="name" autoComplete="name" required type="text" className={inputClass} placeholder="Jane Smith" />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-[13px] sm:text-sm font-bold mb-1.5 sm:mb-2">Phone *</label>
                <input id="contact-phone" name="phone" autoComplete="tel" required type="tel" className={inputClass} placeholder="(847) 740-4655" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-[13px] sm:text-sm font-bold mb-1.5 sm:mb-2">Email *</label>
                <input id="contact-email" name="email" autoComplete="email" required type="email" className={inputClass} placeholder="you@email.com" />
              </div>
            </div>

            <div>
              <label htmlFor="contact-address" className="block text-[13px] sm:text-sm font-bold mb-1.5 sm:mb-2">Property address *</label>
              <input
                id="contact-address"
                name="address"
                autoComplete="street-address"
                required
                type="text"
                className={inputClass}
                placeholder="Street, city, ZIP"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="contact-service" className="block text-[13px] sm:text-sm font-bold mb-1.5 sm:mb-2">Fence type *</label>
                <select id="contact-service" name="service" required className={inputClass}>
                  <option value="">Select a style</option>
                  <option value="wood">Wood / privacy wood</option>
                  <option value="privacy">Privacy fence</option>
                  <option value="vinyl">Vinyl</option>
                  <option value="aluminum">Aluminum</option>
                  <option value="chain-link">Chain link</option>
                  <option value="gates">Gates</option>
                  <option value="commercial">Commercial / industrial</option>
                  <option value="residential">Residential — not sure yet</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-length" className="block text-[13px] sm:text-sm font-bold mb-1.5 sm:mb-2">Approx. length</label>
                <input id="contact-length" name="length" type="text" className={inputClass} placeholder="e.g. 120 ft or 3 sides of yard" />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-[13px] sm:text-sm font-bold mb-1.5 sm:mb-2">Project details</label>
              <textarea
                id="contact-message"
                name="message"
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="Height, gates, replacing an old fence, pool code, dog, slope…"
              />
            </div>

            <QuotePhotoUpload />

            <p className="text-xs text-gray-500">
              By submitting, you agree to our{" "}
              <Link to="/privacy-policy/" className="text-cyan-700 underline hover:text-cyan-600">
                Privacy Policy
              </Link>{" "}
              and consent to be contacted about this fencing project.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending quote request…
                </>
              ) : (
                <>
                  <Send size={20} />
                  Get my free quote
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
              <MapPin size={14} /> 11 N Fairfield Rd, Round Lake, IL 60073
            </p>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
