import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us - Nimal Safari",
  description:
    "Learn about Nimal Safari's legacy and commitment to wildlife tours.",
  icons: {
    icon: "/favicon.ico", // or "/favicon.png"
  },
  keywords: [
    "Nimal Safari",
    "About Us",
    "Wildlife Tours",
    "Sri Lanka",
    "Nature",
    "Conservation",
    "history",
    "1976",
  ],
};

const Page = () => {
  return <AboutClient />;
};

export default Page;
