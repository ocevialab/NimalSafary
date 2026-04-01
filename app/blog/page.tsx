import { BlogContent } from "./BlogClient";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sri Lanka Safari Blog | Wildlife Tips, Guides & Stories",
  description:
    "Expert safari guides, wildlife photography tips, and in-depth articles about Sri Lankan national parks. Leopard spotting in Yala, elephant encounters in Udawalawa, birdwatching in Bundala & more.",
  keywords: [
    "sri lanka safari blog",
    "safari tips sri lanka",
    "yala safari guide",
    "udawalawa safari tips",
    "wildlife photography sri lanka",
    "safari in sri lanka guide",
    "leopard spotting yala",
    "elephant viewing udawalawa",
    "bundala birdwatching",
    "safari travel tips",
    "sri lanka wildlife guide",
    "safari experiences sri lanka",
  ],
  alternates: {
    canonical: "https://nimalsafari.com/blog",
  },
  openGraph: {
    title: "Sri Lanka Safari Blog | Wildlife Tips, Guides & Stories",
    description:
      "Expert safari guides, wildlife photography tips, and in-depth articles about Sri Lankan national parks. Yala, Udawalawa, Bundala & more.",
    url: "https://nimalsafari.com/blog",
    images: [{ url: "/og-blog.jpg", width: 1200, height: 630, alt: "Sri Lanka Safari Blog" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Safari Blog | Wildlife Tips, Guides & Stories",
    description:
      "Expert safari guides and wildlife tips for Sri Lanka. Yala, Udawalawa, Bundala & more.",
    images: ["/og-blog.jpg"],
  },
};

const Page = () => {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary text-lg">Loading blog...</div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
};

export default Page;

