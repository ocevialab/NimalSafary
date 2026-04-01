import type { Metadata } from "next";
import YalaClient from "./YalaClient";

export const metadata: Metadata = {
  title: "Yala Safari Sri Lanka | Expert Wildlife Tours at Yala National Park",
  description:
    "Experience the ultimate Yala safari in Sri Lanka with Nimal Safari. Yala National Park has the world's highest density of leopards. Book your expert-guided Yala wildlife tour today.",
  keywords: [
    "yala safari",
    "yala national park",
    "safari in sri lanka",
    "sri lanka safari",
    "leopard safari sri lanka",
    "yala safari packages",
    "yala wildlife tour",
    "yala safari agency",
    "yala national park tour",
    "wildlife safari sri lanka",
  ],
  alternates: {
    canonical: "https://nimalsafari.com/parks/yala",
  },
  openGraph: {
    title: "Yala Safari Sri Lanka | Expert Wildlife Tours at Yala National Park",
    description:
      "Experience the ultimate Yala safari in Sri Lanka. Home to the world's highest density of leopards. Book your expert-guided Yala wildlife tour with Nimal Safari.",
    url: "https://nimalsafari.com/parks/yala",
    images: [{ url: "/og-yala.jpg", width: 1200, height: 630, alt: "Yala Safari Sri Lanka" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yala Safari Sri Lanka | Yala National Park Wildlife Tours",
    description:
      "Experience the ultimate Yala safari in Sri Lanka. World's highest density of leopards. Book with Nimal Safari.",
    images: ["/og-yala.jpg"],
  },
};

const yalaTouristTripJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Yala Safari Tour Sri Lanka",
  description:
    "Expert-guided safari tour in Yala National Park, Sri Lanka's most visited wildlife reserve, home to the world's highest density of leopards.",
  provider: {
    "@type": "TouristInformationCenter",
    name: "Nimal Safari",
    url: "https://nimalsafari.com",
  },
  touristType: ["Wildlife enthusiasts", "Nature photographers", "Adventure travelers", "Families"],
  itinerary: {
    "@type": "Place",
    name: "Yala National Park",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tissamaharama",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(yalaTouristTripJsonLd) }}
      />
      <YalaClient />
    </>
  );
};

export default Page;
