import FenceStylePage from "../components/FenceStylePage";

export default function WoodPicketFencing() {
  return (
    <FenceStylePage
      title="Wood Picket"
      subtitle="Natural Beauty & Timeless Appeal"
      seoTitle="Wood Picket Fence Installation in Northern Illinois | Aztec Fence"
      metaDescription="Custom cedar wood picket fences that add timeless curb appeal to your Northern Illinois home. Spaced, scalloped, and gated designs. Free quotes — call (847) 740-4655."
      description="Wood picket fences offer timeless beauty and natural charm that complements any home style. Our wood picket fences are crafted from premium cedar and other durable wood species, ensuring lasting beauty and structural integrity. Whether you prefer a traditional white picket fence or a natural stained finish, we customize every detail to match your vision."
      intro2="Spaced pickets, scalloped or straight tops, decorative post caps, and matching arbor gates — every wood picket fence we build is tailored to your yard and finished to last through Illinois seasons."
      benefits={["Natural wood beauty", "Customizable stain or paint", "Traditional American style", "Premium cedar construction", "Decorative tops & gates", "Adds lasting property value"]}
      heroImage="/images/IMG_1111.jpg"
      galleryImages={[
        "/images/IMG_1111.jpg",
        "/images/IMG_1212.jpg",
        "/images/IMG_3222.jpg",
        "/images/IMG_7129.jpg",
        "/images/IMG_0176.jpg",
        "/images/IMG_0369.jpg",
        "/images/IMG_3219.jpg",
        "/images/IMG_1074.jpg",
        "/images/IMG_1090.jpg",
        "/images/IMG_1116.jpg",
        "/images/IMG_1857.jpg",
        "/images/IMG_3712.jpg",
      ]}
      faqs={[
        { q: "What wood do you use for picket fences?", a: "We primarily build with premium Western Red Cedar, which is naturally resistant to rot, insects, and warping. Cedar also takes stain and paint beautifully, so your fence keeps its character for years." },
        { q: "Should I stain or paint my wood picket fence?", a: "Both work well. A semi-transparent stain highlights the natural cedar grain and is easy to refresh, while paint (classic white is popular) gives a crisp, traditional look. We'll help you choose based on the maintenance level you want." },
        { q: "How much maintenance does a wood picket fence need?", a: "Plan to re-stain or re-seal every 2–4 years to protect the wood and keep it looking its best. Cedar is forgiving, and routine sealing dramatically extends the fence's lifespan." },
        { q: "Can you match a custom picket style or height?", a: "Yes. We customize picket spacing, width, top profile (straight, scalloped, or dog-ear), height, and post caps, plus matching gates and arbors to fit your home's style." },
      ]}
    />
  );
}
