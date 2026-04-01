import type { Metadata } from "next";
import BundalaClient from "./BundalaClient";

export const metadata: Metadata = {
  title: "Bundala Safari Sri Lanka | UNESCO Biosphere Birdwatching Tours",
  description:
    "Explore Bundala National Park with Nimal Safari — a UNESCO Biosphere Reserve in Sri Lanka famous for migratory birds, flamingos and coastal wildlife. Book your Bundala safari today.",
  keywords: [
    "bundala national park",
    "bundala safari",
    "safari in sri lanka",
    "sri lanka safari",
    "birdwatching sri lanka",
    "bundala birdwatching",
    "UNESCO biosphere sri lanka",
    "flamingo safari sri lanka",
    "coastal wildlife sri lanka",
    "bundala wildlife tour",
  ],
  alternates: {
    canonical: "https://nimalsafari.com/parks/bundala",
  },
  openGraph: {
    title: "Bundala Safari Sri Lanka | UNESCO Biosphere Birdwatching Tours",
    description:
      "Explore Bundala National Park — a UNESCO Biosphere Reserve in Sri Lanka famous for migratory birds and flamingos. Book with Nimal Safari.",
    url: "https://nimalsafari.com/parks/bundala",
    images: [{ url: "/og-bundala.jpg", width: 1200, height: 630, alt: "Bundala Safari Sri Lanka" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bundala Safari Sri Lanka | UNESCO Biosphere Birdwatching",
    description:
      "Bundala National Park — UNESCO Biosphere Reserve, famous for migratory birds & flamingos. Book with Nimal Safari.",
    images: ["/og-bundala.jpg"],
  },
};

const bundalaJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Bundala Safari Tour Sri Lanka",
  description:
    "Expert-guided safari tour in Bundala National Park, a UNESCO Biosphere Reserve in Sri Lanka renowned for migratory birds, flamingos and coastal wildlife.",
  provider: {
    "@type": "TouristInformationCenter",
    name: "Nimal Safari",
    url: "https://nimalsafari.com",
  },
  touristType: ["Birdwatchers", "Nature photographers", "Wildlife enthusiasts"],
  itinerary: {
    "@type": "Place",
    name: "Bundala National Park",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bundalaJsonLd) }}
      />
      <BundalaClient />
    </>
  );
};

export default Page;
