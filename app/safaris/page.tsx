import type { Metadata } from "next";
import SafarisClient from "./SafarisClient";

export const metadata: Metadata = {
  // Use a descriptive title for this specific page
  title: "Sri Lanka Safari Tours & Packages | Nimal Safari",

  // Choose your preferred meta description from the options above
  description:
    "Explore the best safari tours and packages in Sri Lanka. From leopard safaris in Yala to elephant tours in Udawalawe, find your perfect wildlife adventure with our expert guides. and many more. Book your unforgettable safari experience today! including Yala, Udawalawa, Bundala, and Lunugamwehera National Parks.",

  keywords:
    "safari tours, safari packages, morning safari, Yala, Udawalawe, Bundala, Lunugamwehera, booking safari Sri Lanka, wildlife tours, Yala National Park, Udawalawe National Park, Bundala National Park, Lunugamwehera National Park, leopard safari, elephant safari, birdwatching tours, wildlife adventure, nature tours, eco-tourism, Sri Lanka wildlife",
};

const Page = () => {
  return <SafarisClient />;
};

export default Page;
