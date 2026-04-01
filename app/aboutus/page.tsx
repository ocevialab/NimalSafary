import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Nimal Safari | Trusted Sri Lanka Safari Agency",
  description:
    "Learn about Nimal Safari — a trusted Sri Lanka safari agency with decades of experience guiding wildlife tours in Yala, Udawalawa & more. Expert local guides, responsible tourism.",
  keywords: [
    "nimal safari",
    "safari agency sri lanka",
    "about nimal safari",
    "trusted safari agency",
    "sri lanka wildlife tour agency",
    "yala safari guide",
    "local safari guide sri lanka",
    "responsible tourism sri lanka",
  ],
  alternates: {
    canonical: "https://nimalsafari.com/aboutus",
  },
  openGraph: {
    title: "About Nimal Safari | Trusted Sri Lanka Safari Agency",
    description:
      "Nimal Safari — a trusted Sri Lanka safari agency with decades of experience. Expert local guides for Yala, Udawalawa & more.",
    url: "https://nimalsafari.com/aboutus",
    images: [{ url: "/og-about.jpg", width: 1200, height: 630, alt: "About Nimal Safari" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nimal Safari | Trusted Sri Lanka Safari Agency",
    description:
      "Trusted Sri Lanka safari agency with decades of experience. Expert local guides for Yala, Udawalawa & more.",
    images: ["/og-about.jpg"],
  },
};

const Page = () => {
  return <AboutClient />;
};

export default Page;
