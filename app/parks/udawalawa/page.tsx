import type { Metadata } from "next";
import UdawalawaClient from "./UdawalawaClient";

export const metadata: Metadata = {
  title: "Udawalawa Safari Sri Lanka | Elephant & Wildlife Tours",
  description:
    "Book an Udawalawa safari in Sri Lanka with Nimal Safari. Udawalawa National Park is famous for its large elephant herds. Expert-guided wildlife tours with guaranteed elephant sightings.",
  keywords: [
    "udawalawa safari",
    "udawalawa national park",
    "safari in sri lanka",
    "sri lanka safari",
    "elephant safari sri lanka",
    "udawalawa elephant safari",
    "udawalawa safari packages",
    "udawalawa wildlife tour",
    "udawalawa safari agency",
    "wildlife safari sri lanka",
  ],
  alternates: {
    canonical: "https://nimalsafari.com/parks/udawalawa",
  },
  openGraph: {
    title: "Udawalawa Safari Sri Lanka | Elephant & Wildlife Tours",
    description:
      "Book an Udawalawa safari in Sri Lanka with Nimal Safari. Famous for its large elephant herds. Expert-guided wildlife tours with guaranteed elephant sightings.",
    url: "https://nimalsafari.com/parks/udawalawa",
    images: [{ url: "/og-udawalawa.jpg", width: 1200, height: 630, alt: "Udawalawa Safari Sri Lanka" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Udawalawa Safari Sri Lanka | Elephant Wildlife Tours",
    description:
      "Book an Udawalawa safari in Sri Lanka. Famous for large elephant herds. Expert-guided tours with Nimal Safari.",
    images: ["/og-udawalawa.jpg"],
  },
};

const udawalawaTouristTripJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Udawalawa Safari Tour Sri Lanka",
  description:
    "Expert-guided safari tour in Udawalawa National Park, renowned for its large herds of wild elephants and diverse birdlife in Sri Lanka.",
  provider: {
    "@type": "TouristInformationCenter",
    name: "Nimal Safari",
    url: "https://nimalsafari.com",
  },
  touristType: ["Wildlife enthusiasts", "Nature photographers", "Families", "Birdwatchers"],
  itinerary: {
    "@type": "Place",
    name: "Udawalawa National Park",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(udawalawaTouristTripJsonLd) }}
      />
      <UdawalawaClient />
    </>
  );
};

export default Page;
