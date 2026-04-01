import About_Home from "./Components/About_Home";
import FAQ from "./Components/Faq";

import Gallery_Home from "./Components/Gallery_Home";
import Hero from "./Components/Hero";
import Nav from "./Components/Nav";

import Popular from "./Components/Popular";
import WhyChooseUs from "./Components/WhyChooseUs";
import YouMustVisit from "./Components/YouMustVisit";
import ReadOurBlog from "./Components/ReadOurBlog";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nimal Safari | #1 Safari Agency in Sri Lanka",
  description:
    "Book the best safari in Sri Lanka with Nimal Safari. Expert-guided Yala safari, Udawalawa safari & more. See leopards, elephants & incredible Sri Lanka wildlife. Based in Tissamaharama.",
  keywords:
    "safari in sri lanka, sri lanka safari, yala safari, udawalawa safari, safari agency, wildlife tours sri lanka, leopard safari, elephant safari, yala national park, udawalawa national park, safari packages sri lanka, guided safari tours",
  alternates: {
    canonical: "https://nimalsafari.com",
  },
  openGraph: {
    title: "Nimal Safari | #1 Safari Agency in Sri Lanka",
    description:
      "Book the best safari in Sri Lanka with Nimal Safari. Expert-guided Yala safari, Udawalawa safari & more. See leopards, elephants & incredible wildlife.",
    url: "https://nimalsafari.com",
    images: [{ url: "/og-home.jpg", width: 1200, height: 630, alt: "Nimal Safari - Sri Lanka Safari Tours" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nimal Safari | #1 Safari Agency in Sri Lanka",
    description:
      "Book the best safari in Sri Lanka with Nimal Safari. Expert-guided Yala safari, Udawalawa safari & more.",
    images: ["/og-home.jpg"],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristInformationCenter",
  name: "Nimal Safari",
  url: "https://nimalsafari.com",
  description:
    "Sri Lanka's leading safari agency offering expert-guided wildlife tours in Yala, Udawalawa, Bundala and Lunugamwehera National Parks.",
  telephone: "+94767627295",
  email: "nimalsafariyala@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tissamaharama",
    addressRegion: "Southern Province",
    addressCountry: "LK",
  },
  areaServed: "Sri Lanka",
  priceRange: "$$",
  sameAs: [
    "https://web.facebook.com/profile.php?id=61579240436619",
    "https://www.instagram.com/nimalsafari",
    "https://www.tripadvisor.com/Attraction_Review-g1102395-d5512904-Reviews-Nimal_Safari-Tissamaharama_Southern_Province.html",
    "https://www.pinterest.com/nimalsafariyala/",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should I bring on a safari in Sri Lanka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We recommend wearing comfortable, neutral-colored clothing suitable for warm weather and dusty terrain. Don't forget essentials like sunscreen, a wide-brimmed hat or cap, sunglasses, and insect repellent. A camera or smartphone is a must for capturing wildlife moments, and please remember to bring your passport or national ID, as it is required at park entry gates.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book a safari with Nimal Safari?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Booking a safari with us is simple! You can contact us directly through our website contact form, WhatsApp, or phone. We'll discuss your preferred dates, group size, and specific interests to customize the perfect safari experience for you. We recommend booking in advance, especially during peak season (December to April).",
      },
    },
    {
      "@type": "Question",
      name: "Can children join the safari in Sri Lanka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! We welcome families with children of all ages. Our experienced guides are great with kids and know how to make the safari educational and exciting for young wildlife enthusiasts. We provide child-friendly explanations about the animals and ensure a safe, comfortable experience for the whole family.",
      },
    },
    {
      "@type": "Question",
      name: "Is the safari eco-friendly with respectful wildlife viewing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are committed to responsible tourism and conservation. Our safaris follow strict ethical guidelines — we maintain safe distances from wildlife, never disturb their natural behavior, and support local conservation efforts. We use eco-friendly practices and contribute to community development programs.",
      },
    },
    {
      "@type": "Question",
      name: "Are Nimal Safari tours photography-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our tours are designed with photographers in mind! We position our vehicles for optimal lighting and angles, spend extra time at promising locations, and our guides know the best spots for wildlife photography. Whether you're using a smartphone or professional camera equipment, we'll help you capture stunning memories of Sri Lanka's incredible wildlife.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav textcolor="text-secondary" />
      <Hero />
      <Popular />
      <YouMustVisit />
      <ReadOurBlog />
      <Gallery_Home />
      <About_Home />
      <WhyChooseUs />
      <FAQ />
    </>
  );
}
