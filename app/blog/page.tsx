import { BlogContent } from "./BlogClient";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Safari Blog | Nimal Safari - Wildlife Safari Stories, Tips & Guides",
  description:
    "Discover expert safari guides, wildlife photography tips, and in-depth articles about Sri Lankan national parks. Learn about leopard spotting in Yala, elephant encounters in Udawalawe, birdwatching in Bundala, and essential safari travel tips from experienced guides.",
  keywords: [
    "safari blog",
    "Sri Lanka wildlife blog",
    "safari tips",
    "wildlife photography tips",
    "Yala safari blog",
    "Udawalawe safari stories",
    "Bundala birdwatching",
    "safari experiences",
    "wildlife conservation",
    "leopard spotting guide",
    "elephant viewing tips",
    "safari photography",
    "Sri Lanka national parks guide",
    "safari travel tips",
    "wildlife viewing guide",
  ],
  openGraph: {
    title: "Safari Blog | Nimal Safari - Wildlife Safari Stories & Tips",
    description: "Expert safari guides, wildlife photography tips, and in-depth articles about Sri Lankan national parks.",
    type: "website",
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

