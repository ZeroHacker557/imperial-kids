import FloatingElements from './components/FloatingElements';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import OurTeam from './components/OurTeam';
import OurStudents from './components/OurStudents';
import Programs from './components/Programs';
import Pricing from './components/Pricing';
import DailySchedule from './components/DailySchedule';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import ExpertTips from './components/ExpertTips';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen">
      <FloatingElements />
      <Navbar />
      <main>
        <Hero />
        <About />
        <OurTeam />
        <OurStudents />
        <Programs />
        <Pricing />
        <DailySchedule />
        <Gallery />
        <Testimonials />
        <ExpertTips />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

