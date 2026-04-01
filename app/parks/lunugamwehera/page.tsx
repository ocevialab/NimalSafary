import type { Metadata } from "next";
import LunugamweheraClient from "./LunugamweheraClient";

export const metadata: Metadata = {
  title: "Lunugamwehera Safari Sri Lanka | Hidden Gem Wildlife Tours",
  description:
    "Discover Lunugamwehera National Park with Nimal Safari — Sri Lanka's hidden gem for elephant and wildlife safaris. Fewer crowds, pristine wilderness. Book your tour today.",
  keywords: [
    "lunugamwehera national park",
    "lunugamwehera safari",
    "safari in sri lanka",
    "sri lanka safari",
    "elephant safari sri lanka",
    "lunugamwehera wildlife tour",
    "hidden gem safari sri lanka",
    "wildlife safari sri lanka",
    "lunugamwehera tour",
  ],
  alternates: {
    canonical: "https://nimalsafari.com/parks/lunugamwehera",
  },
  openGraph: {
    title: "Lunugamwehera Safari Sri Lanka | Hidden Gem Wildlife Tours",
    description:
      "Discover Lunugamwehera National Park — Sri Lanka's hidden gem safari destination. Fewer crowds, pristine wilderness. Book with Nimal Safari.",
    url: "https://nimalsafari.com/parks/lunugamwehera",
    images: [{ url: "/og-lunugamwehera.jpg", width: 1200, height: 630, alt: "Lunugamwehera Safari Sri Lanka" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lunugamwehera Safari Sri Lanka | Hidden Gem Wildlife Tours",
    description:
      "Sri Lanka's hidden gem safari — Lunugamwehera National Park. Fewer crowds, amazing wildlife. Book with Nimal Safari.",
    images: ["/og-lunugamwehera.jpg"],
  },
};

const lunugamweheraJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Lunugamwehera Safari Tour Sri Lanka",
  description:
    "Expert-guided safari tour in Lunugamwehera National Park, Sri Lanka's less-visited gem offering pristine wilderness, elephants and diverse wildlife.",
  provider: {
    "@type": "TouristInformationCenter",
    name: "Nimal Safari",
    url: "https://nimalsafari.com",
  },
  touristType: ["Wildlife enthusiasts", "Nature photographers", "Adventure travelers"],
  itinerary: {
    "@type": "Place",
    name: "Lunugamwehera National Park",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Southern Province",
      addressCountry: "LK",
    },
  },
};

const Page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lunugamweheraJsonLd) }}
      />
      <LunugamweheraClient />
    </>
  );
};

export default Page;
