import About_Home from "./Components/About_Home";
import FAQ from "./Components/Faq";

import Gallery_Home from "./Components/Gallery_Home";
import Hero from "./Components/Hero";
import Nav from "./Components/Nav";

import Popular from "./Components/Popular";
import WhyChooseUs from "./Components/WhyChooseUs";
import YouMustVisit from "./Components/YouMustVisit";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nimal Safari | Sri Lanka Safari Tours & Packages",
  description:
    "Experience the ultimate safari  tour in Sri Lanka with Nimal Safari. Book expertly guided tours and packages to Yala, Udawalawe & more. See leopards, elephants & incredible wildlife.",
  keywords:
    "safari tours, Sri Lanka safari, Yala safari, Udawalawe safari, wildlife tours, leopard tours, elephant tours, Sri Lanka wildlife, safari packages, guided tours, nature tours, adventure tours, eco tours, wildlife photography, Sri Lanka travel, safari experience, national parks, wildlife conservation",
};

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
