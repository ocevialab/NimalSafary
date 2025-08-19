"use client";
import Link from "next/link";
import React from "react";
import ParallaxText from "./ParallaxText";
import Image from "next/image";

const Footer = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const openWhatsAppChat = () => {
    // Basic validation for phone number
    if (!phoneNumber) {
      console.error(
        "WhatsApp phone number is not configured. Please set NEXT_PUBLIC_WHATSAPP_NUMBER environment variable in a real Next.js app."
      );
      return;
    }

    const message = encodeURIComponent(
      `Hello! I’d like to get in touch with Nimal Safari. Could you please assist me with some information? Thank you!`
    );

    // Construct the WhatsApp URL with the '+' in the phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <footer className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-0 bg-gradient-to-b from-background to-[#D9FFE2]  font-display h-fit block ">
        <h2 className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-center">
          Explore Sri Lanka’s wild side with expert guides, comfy jeeps, and
          personalized safari experiences.
        </h2>
        <h3 className="xl:text-xl lg:text-lg md:text-md sm:text-sm text-xs  text-center xl:mt-4 lg:mt-4 md:mt-3 sm-mt-2 mt-1">
          Your journey into the wild begins with comfort, safety, and local
          knowledge.
        </h3>
        <div
          className="flex justify-center mt-4 sm:mt-4 md:mt-8"
          onClick={() => openWhatsAppChat()}
        >
          <button
            //   ref={buttonRef}
            className="bg-accent hover:bg-accent/80 text-muted font-medium py-3 px-8 sm:px-10 md:px-12 rounded-2xl transition-all duration-300 transform hover:scale-105  hover:shadow-xl text-sm sm:text-base md:text-lg
          
          "
          >
            Contact Via Whatsapp
          </button>
        </div>
        <div className="lg:flex-row flex flex-col lg:text-md md:text-sm text-xs lg:mt-8 md:mt-6 sm:mt-4 mt-2 lg:justify-between items-center gap-8 text-center">
          <div className="flex-row flex  gap-4 md:gap-4 lg:gap-6 xl:gap-8">
            <Link href={"/"} className="cursor-pointer hover:text-accent">
              Home
            </Link>
            <Link
              href={"/safaris"}
              className="cursor-pointer hover:text-accent"
            >
              Safaris
            </Link>
            <Link
              href={"/aboutus"}
              className="cursor-pointer hover:text-accent"
            >
              About Us
            </Link>
            <Link
              href={"/contact"}
              className="cursor-pointer hover:text-accent"
            >
              Contact
            </Link>
          </div>
          <div className="w-fit flex flex-row px-6 mt-4 justify-center gap-6 sm:gap-10">
            {[
              {
                href: "https://web.facebook.com/profile.php?id=61579240436619",
                src: "/Images/facebook.png",
                label: "Facebook",
              },
              {
                href: "https://www.instagram.com/nimalsafari?igsh=cGk0c3BuczhwYWpi&utm_source=ig_contact_invite",
                src: "/Images/insta.png",
                label: "Instagram",
              },
              {
                href: "https://www.tiktok.com/@nimalsafari?_t=ZS-8yhX4nqCP1l&_r=1",
                src: "/Images/tiktok.png",
                label: "TikTok",
              },
              {
                href: "https://www.pinterest.com/nimalsafariyala/",
                src: "/Images/pinterest.png",
                label: "Pinterest",
              },
              {
                href: "https://www.tripadvisor.com/Attraction_Review-g1102395-d5512904-Reviews-Nimal_Safari-Tissamaharama_Southern_Province.html",
                src: "/Images/trip.png",
                label: "TripAdvisor",
              },
            ].map(({ href, src, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group inline-flex items-center justify-center rounded-xl p-2 sm:p-2.5 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <Image
                  src={src}
                  alt={label}
                  width={36}
                  height={36}
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-7 md:h-7" // mobile upscales here
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
        {/* <h1 className="xl:text-[150px] lg:text-[120px] md:text-[100px] sm:text-[80px] text-[40px] h-fit p-0 m-0 font-bold overflow-hidden text-accent text-center w-full">
        {" "}
        NIMAL SAFARI
      </h1> */}
      </footer>
      <div className="text-center  text-sm pt-4  bg-[#D9FFE2] ">
        © 2025 Nimal Safari All Rights Reserved. A Ocevialab website{" "}
      </div>
      <div className="w-full bg-[#D9FFE2]  text-accent font-bold">
        <ParallaxText baseVelocity={-0.8} fontSize="text-[200px]">
          NIMAL SAFARI -
        </ParallaxText>
      </div>
    </>
  );
};

export default Footer;
