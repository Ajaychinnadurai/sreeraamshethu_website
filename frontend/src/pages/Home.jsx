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
import {
  localBusinessSchema,
  organizationSchema,
  serviceSchema,
  websiteSchema,
  SITE_URL,
} from "../utils/seo";

export default function Home() {
  return (
    <>
      <Seo
        title="Civil Contractor & Interior Designer in Rameswaram | Sree Raam Shethu Constructions"
        description="Sree Raam Shethu Constructions & Interiors — trusted civil construction company in Rameswaram, Tamil Nadu. House construction, building repair, renovation, waterproofing, interior design, modular kitchen and turnkey projects. Call +91 95666 15030."
        canonical={`${SITE_URL}/`}
        jsonLd={[localBusinessSchema(), organizationSchema(), serviceSchema(), websiteSchema()]}
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