import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Seo from "./Seo";
import SiteImage from "./SiteImage";
import { landingByPath, landingJsonLd, placePath } from "../../shared/landings.mjs";
import { SERVICE_AREAS } from "../../shared/service-areas.mjs";

export default function LandingPage({ pagePath }: { pagePath: string }) {
  const page = landingByPath(pagePath);
  if (!page) return null;

  return (
    <div>
      <Seo
        title={page.title}
        description={page.description}
        path={page.path}
        image={page.image}
        jsonLd={landingJsonLd(page)}
      />
      <section className="relative min-h-[460px] text-white overflow-hidden">
        <div className="absolute inset-0">
          <SiteImage
            src={page.image}
            alt={page.imageAlt}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/85 to-[#0f172a]/35" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-300 mb-5 flex flex-wrap gap-x-2">
            <Link to="/" className="hover:text-cyan-300">Home</Link>
            {page.path.startsWith("/service-areas/") && page.path !== "/service-areas/" && (
              <>
                <span aria-hidden="true">/</span>
                <Link to="/service-areas/" className="hover:text-cyan-300">Service areas</Link>
              </>
            )}
            <span aria-hidden="true">/</span>
            <span className="text-cyan-300">{page.h1}</span>
          </nav>
          <p className="text-cyan-300 text-sm font-semibold tracking-widest uppercase mb-3">{page.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold max-w-3xl">{page.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg text-gray-200">{page.paragraphs[0]}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/contact/" className="px-8 py-3.5 btn-primary font-bold rounded-full hover:brightness-110">Free quote</Link>
            <a href="tel:8477404655" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/70 font-bold rounded-full hover:bg-white hover:text-[#0f172a]">
              <Phone size={18} /> (847) 740-4655
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            {page.paragraphs.slice(1).map((paragraph: string) => (
              <p key={paragraph.slice(0, 40)} className="text-gray-600 leading-relaxed text-lg mb-5">{paragraph}</p>
            ))}
            {page.points && (
              <ul className="mt-6 space-y-3">
                {page.points.map((point: string) => (
                  <li key={point} className="flex gap-3 text-gray-700">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
            {page.areas && (
              <div className="mt-10 space-y-8">
                {page.areas.map((area: { id: string; name: string; text: string }) => (
                  <div key={area.id} id={area.id}>
                    <h2 className="text-2xl font-bold text-[#0f172a] mb-2">{area.name}</h2>
                    <p className="text-gray-600 leading-relaxed">{area.text}</p>
                  </div>
                ))}
              </div>
            )}
            {page.listAllAreas && (
              <div className="mt-10 space-y-8">
                {SERVICE_AREAS.map((group) => (
                  <div key={group.state}>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-600 mb-3">{group.state}</h2>
                    <ul className="columns-2 md:columns-3 text-gray-700 leading-relaxed">
                      {group.places.map((place) => {
                        const href = placePath(place);
                        return (
                          <li key={place} className="break-inside-avoid py-0.5">
                            {href ? <Link to={href} className="text-cyan-700 hover:underline">{place}</Link> : place}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          <aside className="bg-gray-50 rounded-2xl p-6 h-fit border border-gray-100">
            <h2 className="text-xl font-bold text-[#0f172a] mb-3">Aztec Fence Company</h2>
            <p className="text-gray-600">11 N Fairfield Rd<br />Round Lake, IL 60073</p>
            <a href="tel:8477404655" className="mt-3 inline-flex items-center gap-2 font-bold text-cyan-700">
              <Phone size={16} /> (847) 740-4655
            </a>
            <p className="text-sm text-gray-500 mt-4">Monday–Friday 7:00 AM to 5:00 PM. Saturday 7:00 AM to 11:00 AM. Sunday closed.</p>
            <p className="text-sm text-gray-500 mt-3">Family-owned since 1994. Licensed and insured.</p>
            <Link to="/contact/" className="mt-6 inline-block px-5 py-3 btn-primary text-sm font-bold rounded-full">Request a quote</Link>
          </aside>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-5">Related pages</h2>
          <ul className="flex flex-wrap gap-3">
            {page.related.map((link: { href: string; label: string }) => (
              <li key={link.href}>
                <Link to={link.href} className="inline-block px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-semibold text-[#0f172a] hover:border-cyan-400 hover:text-cyan-700">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/photo-gallery/" className="inline-block px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-semibold text-[#0f172a] hover:border-cyan-400 hover:text-cyan-700">Photo gallery</Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
