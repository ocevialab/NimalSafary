import type { Metadata } from "next";
import BundalaClient from "./BundalaClient";

export const metadata: Metadata = {
  title: "Bundala National Park - Nimal Safari",
  description:
    "Explore the serene beauty of Bundala National Park, a UNESCO biosphere reserve known for its rich biodiversity and stunning landscapes. Book your safari today!",
  icons: {
    icon: "/favicon.ico", // or "/favicon.png"
  },
  keywords: [
    "Bundala National Park",
    "Safari",
    "Wildlife",
    "Sri Lanka",
    "Nimal Safari",
    "birdwatching",
    "nature tours",
    "wildlife photography",
  ],
};

const Page = () => {
  return <BundalaClient />;
};

export default Page;
