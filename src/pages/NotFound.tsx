import { Link } from "react-router-dom";
import { PAGES } from "../../shared/routes.mjs";
import Seo from "../components/Seo";

const links = PAGES.filter((page) => page.linkLabel && page.path !== "/contact/");

export default function NotFound() {
  return (
    <div>
      <Seo
        title="Page not found | Aztec Fence Company"
        description="That page is not on the Aztec Fence site. Browse our fencing services or request a free quote."
        noindex
        omitCanonical
      />
      <section className="bg-white px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-cyan-600 text-sm font-semibold tracking-widest uppercase mb-3">404</p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-4">Page not found</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            That address is not on this site. These pages are.
          </p>
          <ul className="space-y-2 text-gray-700 mb-10">
            {links.map((page) => (
              <li key={page.path}>
                <Link to={page.path} className="underline decoration-gray-300 underline-offset-4 hover:text-cyan-600">
                  {page.linkLabel}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/contact/"
            className="inline-flex px-8 py-3.5 btn-primary font-bold rounded-full hover:brightness-110 transition-all"
          >
            Request a free quote
          </Link>
        </div>
      </section>
    </div>
  );
}
