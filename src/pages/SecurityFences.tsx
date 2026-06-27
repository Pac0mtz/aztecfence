import FenceStylePage from "../components/FenceStylePage";

export default function SecurityFences() {
  return (
    <FenceStylePage
      title="Security"
      subtitle="Maximum Protection for Your Property"
      seoTitle="Commercial & Industrial Security Fencing in Northern Illinois | Aztec Fence"
      metaDescription="Heavy-duty security fencing — galvanized chain link, barbed wire, privacy slats, and access gates — for commercial and industrial sites across Northern Illinois. Free quotes — (847) 740-4655."
      description="Security fencing provides formidable protective barriers safeguarding inventory, equipment, and restricted areas from intrusions. Our secure fence options include heavy-gauge chain link, barbed and razor wire toppers, privacy-slatted enclosures, and reinforced access gates. Whether you need perimeter security for a commercial facility, industrial site, or residential property, we have the expertise to deliver robust solutions that deter unauthorized access."
      intro2="From warehouse storage cages and utility enclosures to full industrial perimeters with controlled gate access, Aztec Fence builds commercial-grade security fencing that stands up to demanding environments."
      benefits={["Heavy-gauge galvanized steel", "Barbed & razor wire toppers", "Privacy slats & windscreen", "Reinforced access & slide gates", "Interior storage cages", "Commercial-grade strength"]}
      heroImage="/images/Commercial-Fences-06-2.jpg"
      galleryImages={[
        "/images/Commercial-Fences-06-2.jpg",
        "/images/Commercial-Fences-05-2.jpg",
        "/images/commercial-24-2.jpg",
        "/images/Commercial-Fences-20-2.jpg",
        "/images/commercial-33.jpg",
        "/images/Commercial-Fences-22-2.jpg",
        "/images/commercial-29-2.jpg",
        "/images/Commercial-Fences-47-2.jpg",
        "/images/Commercial-Fences-49-2.jpg",
        "/images/Commercial-Fences-32-2.jpg",
        "/images/commercial-35-2.jpg",
        "/images/Commercial-Fences-15-2.jpg",
      ]}
      faqs={[
        { q: "What makes a fence 'security grade'?", a: "Security fencing uses heavier-gauge materials, deeper-set posts, taller heights, and add-ons like barbed or razor wire, anti-climb mesh, and reinforced gates. We spec each project to the level of protection the site requires." },
        { q: "Do you install fencing for commercial and industrial sites?", a: "Yes. We handle warehouse storage cages, utility and equipment enclosures, loading-yard perimeters, and full industrial site fencing — with code-compliant installation and controlled-access gates." },
        { q: "Can you add gates and access control?", a: "Absolutely. We install swing and slide gates sized for vehicles and pedestrians, and can accommodate access-control hardware and operators for automated entry." },
        { q: "How quickly can security fencing be installed?", a: "Timelines depend on the size and materials, but we provide a clear schedule with your quote and keep commercial projects moving so your site stays secure and on track." },
      ]}
    />
  );
}
