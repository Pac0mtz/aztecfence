import { Phone, Mail, MapPin, Facebook } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-[#0f172a] text-white py-1.5 md:py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs md:text-sm min-h-8">
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <a
            href="tel:8477404655"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors font-semibold shrink-0"
          >
            <Phone size={13} />
            <span>(847) 740-4655</span>
          </a>
          <a
            href="mailto:sales@aztecfence.net"
            className="hidden sm:flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
          >
            <Mail size={13} />
            <span>sales@aztecfence.net</span>
          </a>
          <span className="hidden md:flex items-center gap-1.5 text-gray-300">
            <MapPin size={14} />
            11 N Fairfield Rd, Round Lake, IL 60073
          </span>
        </div>

        <span className="sm:hidden text-[11px] text-gray-300 truncate">
          Northern Illinois
        </span>

        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://www.facebook.com/aztecfencecompanyinc1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aztec Fence on Facebook"
            className="hover:text-cyan-400 transition-colors"
          >
            <Facebook size={16} />
          </a>
          <a
            href="https://www.yelp.com/biz/aztec-fence-company-round-lake"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors text-xs font-bold"
          >
            Yelp
          </a>
          <a
            href="https://maps.app.goo.gl/8dDyVNupUfeKmvx77"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors text-xs font-bold"
          >
            Maps
          </a>
        </div>
      </div>
    </div>
  );
}
