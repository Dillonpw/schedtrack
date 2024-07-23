import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/Features';
import TestimonialsSection from '@/components/Testimonials';
import Pricing from '@/components/pricing';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';

const Home = () => {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <Header />
            <main className="flex-1">
                <HeroSection />
                <FeaturesSection />
                <TestimonialsSection />
                <Faq />

                <Pricing />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
