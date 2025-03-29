import AccountInfo from "@/components/account-info";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import TestimonialsSection from "@/components/testimonial-section";
import Pricing from "@/components/pricing-section";
import Faq from "@/components/faq-section";
import CallToAction from "@/components/call-to-action";
const Home = () => {
  return (
    <div className="flex min-h-[100vh] w-full flex-col items-center">
      <AccountInfo />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToAction />
      <Faq />
      <Pricing />
    </div>
  );
};

export default Home;
