import type { Metadata } from "next";
import LunugamweheraClient from "./LunugamweheraClient";

export const metadata: Metadata = {
  title: "Lunugamwehera National Park | Nimal Safari",
  description:
    "Explore the serene beauty of Lunugamwehera National Park with Nimal Safari. Experience wildlife like never before.",
  icons: {
    icon: "/favicon.ico", // or "/favicon.png"
  },
  keywords: [
    "Lunugamwehera National Park",
    "Safari",
    "Wildlife",
    "Sri Lanka",
    "Nimal Safari",
    "Lunugamwehera",
    "nature safari",
    "Sri Lanka safari",
    "nature",
    "Elephant Sanctuary",
    "conservation",
    "safari tours",
    "birdwatching",
    "nature tours",
    "wildlife photography",
  ],
};

const Page = () => {
  return <LunugamweheraClient />;
};

export default Page;
