import FloatingElements from './components/FloatingElements';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen">
      <FloatingElements />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <Gallery />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
