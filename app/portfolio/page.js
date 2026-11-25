import Navbar from '../../components/Navbar';
import Projects from '../../components/Projects';
import Footer from '../../components/Footer';
import AOSInit from '../../components/AOSInit';

export const metadata = {
  title: 'Portfolio · Hitotobi Games'
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <Projects full />
      </main>
      <Footer />
      <AOSInit />
    </>
  );
}
