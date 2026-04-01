import type { Metadata } from "next";
import SafarisClient from "./SafarisClient";

export const metadata: Metadata = {
  title: "Sri Lanka Safari Packages | Yala, Udawalawa & More",
  description:
    "Browse expert-guided safari packages in Sri Lanka. Yala safari, Udawalawa safari, Bundala & Lunugamwehera tours. Book your Sri Lanka wildlife adventure with Nimal Safari today.",
  keywords:
    "sri lanka safari packages, safari in sri lanka, yala safari, udawalawa safari, bundala safari, lunugamwehera safari, sri lanka safari agency, wildlife tours sri lanka, safari booking, morning safari sri lanka, leopard safari, elephant safari",
  alternates: {
    canonical: "https://nimalsafari.com/safaris",
  },
  openGraph: {
    title: "Sri Lanka Safari Packages | Yala, Udawalawa & More",
    description:
      "Browse expert-guided safari packages in Sri Lanka. Yala safari, Udawalawa safari, Bundala & Lunugamwehera tours. Book your wildlife adventure today.",
    url: "https://nimalsafari.com/safaris",
    images: [{ url: "/og-safaris.jpg", width: 1200, height: 630, alt: "Safari Packages in Sri Lanka" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Safari Packages | Yala, Udawalawa & More",
    description:
      "Browse expert-guided safari packages in Sri Lanka — Yala, Udawalawa, Bundala & Lunugamwehera.",
    images: ["/og-safaris.jpg"],
  },
};

const Page = () => {
  return <SafarisClient />;
};

export default Page;
