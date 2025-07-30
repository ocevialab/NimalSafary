import UdawalawaClient from "./UdawalawaClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Udawalawa National Park | Nimal Safari",
  description:
    "Explore Udawalawa National Park, a premier destination for wildlife enthusiasts. Experience the thrill of seeing elephants in their natural habitat and enjoy a unique safari adventure.",
  icons: {
    icon: "/favicon.ico", // or "/favicon.png"
  },
  keywords: [
    "Udawalawa National Park",
    "Safari",
    "Wildlife",
    "Sri Lanka",
    "Nimal Safari",
    "nature safari",
    "Sri Lanka safari",
    "Elephant Sanctuary",
    "conservation",
    "safari tours",
    "birdwatching",
    "nature tours",
    "wildlife photography",
  ],
};

// Register ScrollTrigger plugin

const Page = () => {
  return <UdawalawaClient />;
};

export default Page;
