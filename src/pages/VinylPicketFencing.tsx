import FenceStylePage from "../components/FenceStylePage";

export default function VinylPicketFencing() {
  return (
    <FenceStylePage
      title="Vinyl Picket"
      subtitle="Classic Charm with Modern Durability"
      seoTitle="Vinyl Picket Fence Installation in Northern Illinois | Aztec Fence"
      metaDescription="Low-maintenance vinyl picket fencing that never needs painting. Fade-, crack-, and warp-resistant with lifetime warranty options across Northern Illinois. Free quotes — (847) 740-4655."
      description="Vinyl picket fencing combines classic American charm with modern low-maintenance convenience. These beautiful fences resist fading, cracking, and warping while providing a welcoming boundary for your home. Available in various heights, colors, and picket styles, our vinyl picket fences add curb appeal without the burden of regular painting or staining."
      intro2="Engineered from UV-stabilized PVC, our vinyl pickets keep their bright finish year after year — no scraping, sanding, or repainting. Choose gothic, flat, or scalloped tops in white, tan, and more."
      benefits={["Never needs painting or staining", "Resists fading and cracking", "Classic American style", "Multiple colors & picket tops", "Wipes clean with a hose", "Lifetime warranty options"]}
      heroImage="/images/Residential-Vinyl-Picket-Fence-11.jpg"
      galleryImages={[
        "/images/Residential-Vinyl-Picket-Fence-11.jpg",
        "/images/Residential-Vinyl-Picket-Fence-12.jpg",
        "/images/Residential-Vinyl-Picket-Fence-01.jpg",
        "/images/Residential-Vinyl-Picket-Fence-02.jpg",
        "/images/Residential-Vinyl-Picket-Fence-06.jpg",
        "/images/Residential-Vinyl-Picket-Fence-08.jpg",
      ]}
      faqs={[
        { q: "Does vinyl picket fencing turn yellow over time?", a: "Quality vinyl like ours is made with UV inhibitors and titanium dioxide that resist yellowing and fading. That's why we offer lifetime warranty options on many vinyl products." },
        { q: "Is vinyl picket fencing strong enough for Illinois weather?", a: "Yes. Modern vinyl is flexible and impact-resistant, so it handles wind, snow, and temperature swings without cracking or rotting the way some materials can." },
        { q: "How do I clean a vinyl fence?", a: "It's easy — just spray it down with a garden hose, or use mild soap and water for any stubborn spots. No sanding, staining, or repainting required." },
        { q: "What colors and styles are available?", a: "We offer white, tan/almond, and other popular colors, with gothic, flat-top, and scalloped picket profiles in a range of heights to match your home." },
      ]}
    />
  );
}
