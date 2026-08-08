import Hero from "../sections/Hero";
import TrustIntro from "../sections/TrustIntro";
import ServicesSection from "../sections/ServicesSection";
import FeaturedProjects from "../sections/FeaturedProjects";
import InteriorsSection from "../sections/InteriorsSection";
import ProcessSection from "../sections/ProcessSection";
import WhyChooseUs from "../sections/WhyChooseUs";
import Testimonials from "../sections/Testimonials";
import CTA from "../sections/CTA";
import Seo from "../components/Seo";
import { localBusinessSchema, organizationSchema, serviceSchema, SITE_URL } from "../utils/seo";

export default function Home() {
  return (
    <>
      <Seo
        title="Sree Raam Shethu Constructions & Interiors | Builders & Interior Designers in Rameshwaram"
        description="Construction company, builders and interior designers in Rameshwaram, Tamil Nadu. Residential construction, commercial construction, interior design, renovation and turnkey projects."
        canonical={`${SITE_URL}/`}
        jsonLd={[localBusinessSchema(), organizationSchema(), serviceSchema()]}
      />
      <Hero />
      <TrustIntro />
      <ServicesSection />
      <FeaturedProjects />
      <InteriorsSection isHome={true} />
      <ProcessSection />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </>
  );
}