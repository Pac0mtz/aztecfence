import FenceStylePage from "../components/FenceStylePage";

export default function ChainLinkFences() {
  return (
    <FenceStylePage
      title="Chain Link"
      subtitle="Durable & Affordable Chain Link Fencing Solutions"
      seoTitle="Chain Link Fence Installation in Northern Illinois | Aztec Fence"
      metaDescription="Galvanized & vinyl-coated chain link fencing for homes, businesses, and industrial sites across Northern Illinois. Durable, low-maintenance, and affordable. Free quotes — call (847) 740-4655."
      description="Chain link fencing offers a practical and cost-effective solution for residential, commercial, and industrial properties. Known for their durability and low maintenance, chain link fences provide security without obstructing views. Perfect for backyards, sports fields, dog runs, and commercial perimeters. Our galvanized and vinyl-coated options ensure long-lasting protection against rust and corrosion."
      intro2="From simple residential enclosures to heavy-gauge commercial perimeters with privacy slats, gates, and barbed-wire toppers, Aztec Fence installs chain link systems built to handle Illinois weather and daily wear for decades."
      benefits={["Cost-effective solution", "Low maintenance", "Long-lasting durability", "Does not obstruct views", "Galvanized & vinyl-coated options", "Privacy slats & gates available"]}
      heroImage="/images/chain-link-fences.jpg"
      galleryImages={[
        "/images/chain-link-fences.jpg",
        "/images/Commercial-Fences-06-2.jpg",
        "/images/Commercial-Fences-22-2.jpg",
        "/images/commercial-24-2.jpg",
        "/images/Commercial-Fences-15-2.jpg",
        "/images/commercial-29-2.jpg",
        "/images/Commercial-Fences-20-2.jpg",
        "/images/Commercial-Fences-30-1.jpg",
        "/images/commercial-35-2.jpg",
        "/images/Commercial-Fences-36-2.jpg",
        "/images/Commercial-Fences-49-2.jpg",
        "/images/Commercial-Fences-47-2.jpg",
      ]}
      faqs={[
        { q: "How long does a chain link fence last?", a: "A properly installed galvanized or vinyl-coated chain link fence typically lasts 20–30 years or more. The zinc galvanizing and PVC coating protect against the rust and corrosion that Illinois winters can cause." },
        { q: "What's the difference between galvanized and vinyl-coated chain link?", a: "Galvanized chain link has a silver, zinc-coated finish that's economical and extremely durable. Vinyl-coated chain link adds a colored PVC layer (usually black, green, or brown) for a sleeker look and extra corrosion resistance — it blends into landscaping more naturally." },
        { q: "Can chain link fences be made private?", a: "Yes. We install privacy slats woven through the mesh in a range of colors, or windscreen fabric, to block views and add curb appeal while keeping the affordability of chain link." },
        { q: "Is chain link good for dog runs and commercial security?", a: "Absolutely. Chain link is one of the most popular choices for dog runs, sports fields, and commercial perimeters because it's strong, see-through for visibility, and can be topped with barbed wire for added security." },
      ]}
    />
  );
}
