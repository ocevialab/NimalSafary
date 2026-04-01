import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Book Your Sri Lanka Safari | Contact Nimal Safari",
  description:
    "Get in touch with Nimal Safari to book your Sri Lanka safari. Contact us by phone, WhatsApp or email to plan your Yala safari, Udawalawa safari or any wildlife tour in Sri Lanka.",
  keywords: [
    "contact nimal safari",
    "book safari sri lanka",
    "safari booking sri lanka",
    "yala safari booking",
    "udawalawa safari booking",
    "safari agency contact",
    "sri lanka safari inquiry",
    "nimal safari contact",
  ],
  alternates: {
    canonical: "https://nimalsafari.com/contact",
  },
  openGraph: {
    title: "Book Your Sri Lanka Safari | Contact Nimal Safari",
    description:
      "Get in touch to book your Sri Lanka safari. Contact Nimal Safari by phone, WhatsApp or email to plan your Yala or Udawalawa wildlife tour.",
    url: "https://nimalsafari.com/contact",
    images: [{ url: "/og-contact.jpg", width: 1200, height: 630, alt: "Contact Nimal Safari" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Sri Lanka Safari | Contact Nimal Safari",
    description:
      "Book your Sri Lanka safari by contacting Nimal Safari via phone, WhatsApp or email.",
    images: ["/og-contact.jpg"],
  },
};

const Page = () => {
  return <ContactClient />;
};

export default Page;
