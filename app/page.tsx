import AccountInfo from "@/components/account-info";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import TestimonialsSection from "@/components/testimonial-section";
import Pricing from "@/components/pricing-section";
import Faq from "@/components/faq-section";
import HeroBtn from "@/components/hero-buttons";

const Home = () => {
  return (
    <div className="flex min-h-[100vh] flex-col w-full">
        <AccountInfo />
        <HeroSection>
          <HeroBtn />
        </HeroSection>
        <FeaturesSection />
        <TestimonialsSection />
        <Faq />
        <Pricing />
    </div>
  );
};

export default Home;
