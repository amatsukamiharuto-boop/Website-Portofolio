import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Status from '../components/Status';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AOSInit from '../components/AOSInit';

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Status />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <AOSInit />
    </>
  );
}
