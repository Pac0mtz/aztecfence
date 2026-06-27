import FenceStylePage from "../components/FenceStylePage";

export default function PrivacyFences() {
  return (
    <FenceStylePage
      title="Privacy"
      subtitle="Secure Your Space with Premium Privacy Fencing"
      seoTitle="Privacy Fence Installation in Northern Illinois | Aztec Fence"
      metaDescription="Wood, vinyl, and board-on-board privacy fences that block views, cut noise, and boost property value across Northern Illinois. Free quotes — call (847) 740-4655."
      description="Privacy fences create a secluded oasis in your backyard. Our privacy fence solutions block unwanted views and reduce noise, giving you the peace and tranquility you deserve. Built with high-quality materials and expert craftsmanship, our privacy fences stand strong against the elements while enhancing your property's value. Choose from wood, vinyl, or composite materials to match your style and budget."
      intro2="Whether you want the warm look of solid cedar, the staggered strength of board-on-board, or the maintenance-free finish of vinyl, we design full-height privacy fencing that turns your backyard into a true retreat."
      benefits={["Blocks unwanted views", "Reduces noise pollution", "Increases property value", "Wood, vinyl & board-on-board options", "Solid full-height coverage", "Expertly installed to last"]}
      heroImage="/images/Residential-wood-solid-privacy-fence-11.jpg"
      galleryImages={[
        "/images/Residential-wood-solid-privacy-fence-11.jpg",
        "/images/Residential-wood-solid-privacy-fence-01.jpg",
        "/images/Residential-wood-solid-privacy-fence-03.jpg",
        "/images/Residential-wood-solid-privacy-fence-05.jpg",
        "/images/Residential-wood-privacy-board-on-board-fence-07.jpg",
        "/images/Residential-wood-privacy-board-on-board-fence-02.jpg",
        "/images/Residential-wood-privacy-board-on-board-fence-04.jpg",
        "/images/Residential-vinyl-privacy-fence-10.jpg",
        "/images/Residential-vinyl-privacy-fence-12.jpg",
        "/images/Residential-vinyl-privacy-fence-03-1.jpg",
        "/images/Residential-vinyl-privacy-fence-06-1.jpg",
        "/images/Residential-wood-solid-privacy-fence-16.jpg",
      ]}
      faqs={[
        { q: "How tall can a privacy fence be?", a: "Most residential privacy fences are 6 feet tall, which is standard for full screening. Some municipalities allow up to 8 feet — we know the local codes across Northern Illinois and will confirm what's permitted at your address." },
        { q: "Which is better for privacy: wood or vinyl?", a: "Both fully block views. Wood (especially cedar or board-on-board) offers a natural, classic look at a lower upfront cost but needs periodic sealing. Vinyl costs a bit more initially but is virtually maintenance-free and won't rot or fade." },
        { q: "What is a board-on-board fence?", a: "Board-on-board uses overlapping vertical boards so there are no gaps — even as the wood naturally expands and contracts. It looks great from both sides and gives you maximum privacy with a premium, dimensional appearance." },
        { q: "Will a privacy fence really reduce noise?", a: "A solid, full-height privacy fence helps buffer and deflect noise from streets and neighbors. The taller and more solid the fence, the more sound it blocks." },
      ]}
    />
  );
}
