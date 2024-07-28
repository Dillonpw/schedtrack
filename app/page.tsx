import Header from "@/components/Header";
import Nav from "@/components/Nav";
import AccountInfo from "@/components/AccountInfo";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/Features";
import TestimonialsSection from "@/components/Testimonials";
import Pricing from "@/components/pricing";
import Faq from "@/components/Faq";
import HeroBtn from "@/components/Herobtn";

const Home = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header>
        <Nav />
      </Header>
      <main className="flex-1">
        <AccountInfo />
        <HeroSection>
          {" "}
          <HeroBtn />
        </HeroSection>
        <FeaturesSection />
        <TestimonialsSection />
        <Faq />
        <Pricing />
      </main>
    </div>
  );
};

export default Home;
