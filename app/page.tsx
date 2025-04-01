import AccountInfo from "@/components/account-info";
import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import TestimonialsSection from "@/components/landing/testimonial-section";
import Pricing from "@/components/landing/pricing-section";
import Faq from "@/components/landing/faq-section";
import CallToAction from "@/components/landing/call-to-action";
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
