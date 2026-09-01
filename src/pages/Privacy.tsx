import { motion } from "framer-motion";
import Seo, { SITE_URL } from "../components/Seo";

export default function Privacy() {
  return (
    <div>
      <Seo
        title="Privacy Policy | Aztec Fence Company"
        description="How Aztec Fence Company collects, uses, and protects information from our website, quote form, and advertising, including Google Ads conversion tracking."
        keywords="Aztec Fence privacy policy, website privacy, Google Ads tracking disclosure"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "PrivacyPolicy",
          name: "Aztec Fence Company Privacy Policy",
          url: `${SITE_URL}/privacy-policy/`,
          publisher: { "@id": `${SITE_URL}/#business` },
        }}
      />
      <section className="relative h-[40vh] min-h-[300px] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/aluminum-02.jpg" alt="Privacy Policy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-[#0f172a]/40" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full text-center">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold">
              Privacy <span className="text-cyan-400">Policy</span>
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-10">
            {[
              {
                title: "1. Who we are",
                text: "Aztec Fence Company (we, us) is a fence contractor based at 11 N Fairfield Rd, Round Lake, IL 60073. This policy explains how we collect and use information when you visit aztecfence.net, request a quote, call us, or arrive from an advertisement (including Google Ads).",
              },
              {
                title: "2. Information we collect",
                text: "When you use our quote form we collect your name, email address, phone number, property address, the fencing service you selected, any message you send, and optional photos of the job site. We also receive the phone number when you tap Call. Our servers may log technical data such as IP address, browser type, and the page you visited. If you click a Google Ad, Google may pass click identifiers (such as gclid) so we can measure which ads led to a quote request or call.",
              },
              {
                title: "3. How we use information",
                text: "We use this information to respond to quote requests, schedule consultations, improve our website, and measure advertising performance. We do not sell your personal information. We do not share it with third parties except as needed to operate the site (hosting and email delivery) or as required by law.",
              },
              {
                title: "4. Advertising and conversion tracking",
                text: "We use Google Ads and related Google tags to understand whether ads result in quote requests or phone calls. These tools may set cookies or similar identifiers on your device and may record that you visited our site after clicking an ad. Google may also receive hashed versions of email or phone numbers you submit (enhanced conversions) so conversion measurement is more accurate. You can learn how Google uses data at https://policies.google.com/technologies/ads and opt out of personalized ads at https://adssettings.google.com.",
              },
              {
                title: "5. Cookies",
                text: "Our site uses cookies and similar technologies that are necessary to run the website and to measure ads (for example Googles conversion linker cookie). You can block cookies in your browser settings. Blocking advertising cookies may not stop ads from showing, but it can make conversion tracking less accurate.",
              },
              {
                title: "6. How we retain and protect information",
                text: "Quote requests are sent to sales@aztecfence.net and kept as long as needed to serve your project and our records. We use HTTPS and limit access to business staff who need the information to respond to you.",
              },
              {
                title: "7. Your choices",
                text: "You may email sales@aztecfence.net or call (847) 740-4655 to request a copy of the information we have about you, ask us to correct it, or ask us not to contact you for marketing. If you submitted a form in error, tell us and we will delete that request where we are not required to keep it.",
              },
              {
                title: "8. Children",
                text: "This website is intended for adults seeking fencing services. We do not knowingly collect information from children under 13.",
              },
              {
                title: "9. Changes",
                text: "We may update this policy as our site or advertising tools change. The Last updated date below shows the latest revision. Continued use of the site after a change means you accept the updated policy.",
              },
              {
                title: "10. Contact",
                text: "Questions about privacy:\nAztec Fence Company\n11 N Fairfield Rd, Round Lake, IL 60073\nPhone: (847) 740-4655\nEmail: sales@aztecfence.net",
              },
            ].map((item, idx) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <h2 className="text-xl font-bold text-[#0f172a] mb-3">{item.title}</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{item.text}</p>
              </motion.div>
            ))}
            <p className="text-gray-400 text-sm mt-10">Last updated: September 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}
