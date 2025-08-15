// app/about/page.tsx (Server Component)
import type { Metadata } from "next";

import YalaClient from "./YalaClient";

export const metadata: Metadata = {
  title: "Yala National Park - Nimal Safari",
  description:
    "Explore the wonders of Yala National Park with Nimal Safari. National Park is renowned for its rich biodiversity, including the highest density of leopards in the world. Join us for an unforgettable safari experience. Safari in Sri Lanka.",
  icons: {
    icon: "/favicon.ico", // or "/favicon.png"
  },
  keywords: [
    "Yala National Park",
    "Sri Lanka safari",
    "wildlife tours",
    "leopard safari",
    "elephant safari",
    "birdwatching tours",
    "nature tours",
    "eco-tourism",
    "Nimal Safari",
    "Yala safari packages",
    "Yala wildlife adventure",
    "Yala National Park tours",
  ],
};

const Page = () => {
  return <YalaClient />;
};

export default Page;
