import FenceStylePage from "../components/FenceStylePage";

export default function AluminumFences() {
  return (
    <FenceStylePage
      title="Premium Aluminum"
      subtitle="Elegant, Rust-Free Aluminum Fencing"
      seoTitle="Aluminum Fence Installation in Northern Illinois | Aztec Fence"
      metaDescription="Ornamental aluminum fencing that's rust-free, low-maintenance, and backed by a lifetime warranty. Pool-code options across Northern Illinois. Free quotes — call (847) 740-4655."
      description="Aluminum fences offer the perfect blend of strength, beauty, and low maintenance. Resistant to rust and corrosion, aluminum fencing is ideal for any climate. With ornamental designs available, these fences enhance curb appeal while providing reliable security for your property. Our premium aluminum fences come with a lifetime warranty and require virtually no upkeep."
      intro2="Powder-coated in classic black and other finishes, our ornamental aluminum fencing delivers the wrought-iron look without the rust — perfect for front yards, gardens, and pool enclosures that meet local safety codes."
      benefits={["Rust and corrosion resistant", "Elegant ornamental designs", "Virtually no maintenance", "Lifetime warranty", "Pool-code compliant options", "Ideal for any climate"]}
      heroImage="/images/aluminum-02.jpg"
      galleryImages={[
        "/images/aluminum-01.jpg",
        "/images/aluminum-02.jpg",
        "/images/aluminum-03.jpg",
        "/images/aluminum-04.jpg",
        "/images/aluminum-05.jpg",
        "/images/aluminum-07.jpg",
        "/images/aluminum-09.jpg",
        "/images/aluminum-10.jpg",
        "/images/aluminum-11.jpg",
        "/images/aluminum-14.jpg",
        "/images/aluminum-15.jpg",
        "/images/aluminum-17.jpg",
        "/images/aluminum-18.jpg",
        "/images/aluminum-19.jpg",
        "/images/aluminum-21.jpg",
      ]}
      faqs={[
        { q: "Is aluminum fencing strong enough for security?", a: "Yes. Our aluminum fencing uses heavy-duty, structural-grade rails and pickets. While it has the elegant look of ornamental iron, it's engineered for real security and durability — without the rust." },
        { q: "Does aluminum fencing rust?", a: "No. Aluminum doesn't rust, and our fences are powder-coated for an extra layer of protection. That's why we can offer a lifetime warranty and why aluminum is ideal for Illinois's wet, snowy climate." },
        { q: "Can aluminum fencing be used around a pool?", a: "Absolutely — it's one of the most popular choices for pools. We install pool-code-compliant aluminum fencing with self-closing, self-latching gates and proper picket spacing to meet local safety requirements." },
        { q: "How much maintenance does aluminum fencing need?", a: "Virtually none. An occasional rinse with a hose keeps it looking new. There's no staining, sealing, or repainting — making aluminum one of the lowest-maintenance fencing options available." },
      ]}
    />
  );
}
