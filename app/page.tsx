import Gallery_Home from "./Components/Gallery_Home";
import Hero from "./Components/Hero";
import Nav from "./Components/Nav";
import Popular from "./Components/Popular";
import YouMustVisit from "./Components/YouMustVisit";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Popular />
      <YouMustVisit />
      <Gallery_Home />
    </>
  );
}
