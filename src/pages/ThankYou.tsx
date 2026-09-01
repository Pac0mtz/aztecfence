import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Phone } from "lucide-react";
import Seo from "../components/Seo";
import { reportLeadConversion } from "../lib/ads";

export default function ThankYou() {
  useEffect(() => {
    reportLeadConversion();
  }, []);

  return (
    <div>
      <Seo
        title="Thank You | Aztec Fence Company"
        description="We received your fence quote request and will contact you shortly."
        noindex
      />
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-24">
        <div className="max-w-xl w-full text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-4">Thank You</h1>
          <p className="text-gray-600 text-lg mb-3">
            We received your request and will contact you shortly about your fencing project.
          </p>
          <p className="text-gray-500 mb-10">Need to talk now? Call our Round Lake office.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:8477404655"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-cyan-500 text-white font-bold rounded-full hover:bg-cyan-400 transition-all"
            >
              <Phone size={18} />
              Call (847) 740-4655
            </a>
            <Link
              to="/"
              className="px-8 py-3.5 border-2 border-[#0f172a]/20 text-[#0f172a] font-bold rounded-full hover:bg-[#0f172a] hover:text-white transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
