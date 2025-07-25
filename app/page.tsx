import About_Home from "./Components/About_Home";
import FAQ from "./Components/Faq";

import Gallery_Home from "./Components/Gallery_Home";
import Hero from "./Components/Hero";
import Nav from "./Components/Nav";

import Popular from "./Components/Popular";
import WhyChooseUs from "./Components/WhyChooseUs";
import YouMustVisit from "./Components/YouMustVisit";

export default function Home() {
  return (
    <>
      <Nav textcolor="text-secondary" />
      <Hero />
      <Popular />
      <YouMustVisit />
      <Gallery_Home />
      <About_Home />
      <WhyChooseUs />
      <FAQ />
    </>
  );
}
