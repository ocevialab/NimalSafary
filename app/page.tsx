import About_Home from "./Components/About_Home";
import FAQ from "./Components/Faq";
import Footer from "./Components/Footer";
import Gallery_Home from "./Components/Gallery_Home";
import Hero from "./Components/Hero";
import Nav from "./Components/Nav";
import Popular from "./Components/Popular";
import WhyChooseUs from "./Components/WhyChooseUs";
import YouMustVisit from "./Components/YouMustVisit";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Popular />
      <YouMustVisit />
      <Gallery_Home />
      <About_Home />
      <WhyChooseUs />
      <FAQ />
      <Footer />
    </>
  );
}
