import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/Features';
import TestimonialsSection from '@/components/Testimonials';
import Pricing from '@/components/pricing';
import Footer from '@/components/Footer';

const Home = () => {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <Header />
            <main className="flex-1">
                <HeroSection />
                <FeaturesSection />
                <TestimonialsSection />
                <Pricing />
                {/* <ScheduleGen /> */}
            </main>
            <Footer />
        </div>
    );
};

export default Home;
