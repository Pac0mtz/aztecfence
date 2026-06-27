import { motion } from "framer-motion";
import Seo from "../components/Seo";

export default function Terms() {
  return (
    <div>
      <Seo
        title="Terms & Conditions | Aztec Fence Company"
        description="Terms and conditions for using the Aztec Fence Company website and services."
        noindex
      />
      <section className="relative h-[40vh] min-h-[300px] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/Residential-wood-solid-privacy-fence-16.jpg" alt="Terms" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-[#0f172a]/40" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full text-center">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold">
              Terms and <span className="text-cyan-400">Conditions</span>
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-10">
            {[
              { title: "1. Introduction", text: "Welcome to Aztec Fence Company. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms. If you disagree with any part of these terms, please do not use our website." },
              { title: "2. Services", text: "Aztec Fence Company provides fencing installation, repair, and maintenance services for residential, commercial, and industrial properties in Northern Illinois. All services are subject to availability and require a formal quote and contract agreement." },
              { title: "3. Quotes and Estimates", text: "All quotes and estimates provided by Aztec Fence Company are valid for 30 days unless otherwise stated. Final pricing may vary based on site conditions, material availability, and project scope changes. A written contract is required before any work begins." },
              { title: "4. Payment Terms", text: "Payment terms are outlined in the individual project contract. Typically, a deposit is required to schedule work, with the balance due upon completion. We accept cash, checks, and major credit cards. Late payments may incur additional fees as specified in the contract." },
              { title: "5. Warranties", text: "Aztec Fence Company stands behind our workmanship with a satisfaction guarantee. Specific warranty terms for materials and labor are detailed in your project contract. Manufacturer warranties on materials are passed through to the customer as applicable." },
              { title: "6. Cancellation and Rescheduling", text: "Cancellations or rescheduling requests must be made at least 48 hours in advance. Deposits may be forfeited for cancellations made less than 48 hours before the scheduled work date, unless otherwise agreed upon in writing." },
              { title: "7. Intellectual Property", text: "All content on this website, including text, images, logos, and designs, is the property of Aztec Fence Company and is protected by copyright and other intellectual property laws. Unauthorized use of any content is strictly prohibited." },
              { title: "8. Limitation of Liability", text: "Aztec Fence Company shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services or website. Our total liability shall not exceed the amount paid for the specific service in question." },
              { title: "9. Governing Law", text: "These Terms and Conditions are governed by and construed in accordance with the laws of the State of Illinois. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Illinois." },
              { title: "10. Contact Information", text: "For questions about these Terms and Conditions, please contact us at:\nAztec Fence Company\n11 N Fairfield Rd, Round Lake, IL 60073\nPhone: (847) 740-4655\nEmail: sales@aztecfence.net" },
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <h2 className="text-xl font-bold text-[#0f172a] mb-3">{item.title}</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{item.text}</p>
              </motion.div>
            ))}
            <p className="text-gray-400 text-sm mt-10">Last updated: January 2024</p>
          </div>
        </div>
      </section>
    </div>
  );
}
