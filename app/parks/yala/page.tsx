"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Gallery from "@/app/Components/Gallery";
import Features from "../Features";
import Nav from "@/app/Components/Nav";
import FreePick from "../freePick";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const images = [
    "/Images/yala1.webp",
    "/Images/yala7.webp",
    "/Images/yala4.webp",
    "/Images/yala3.webp",
    "/Images/yala5.webp",
    "/Images/yala6.webp",
    "/Images/yala2.webp",
    "/Images/yala8.webp",
    "/Images/yala9.webp",
  ];

  // Hero section refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // First section refs
  const containerRef2 = useRef<HTMLDivElement>(null);
  const headerRef1 = useRef<HTMLDivElement>(null);
  const lineRef1 = useRef<HTMLDivElement>(null);
  const titleRef1 = useRef<HTMLHeadingElement>(null);
  const descriptionRef1 = useRef<HTMLDivElement>(null);

  // Second section refs
  const headerRef2 = useRef<HTMLDivElement>(null);
  const lineRef2 = useRef<HTMLDivElement>(null);
  const titleRef2 = useRef<HTMLHeadingElement>(null);
  const descriptionRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Hero section animation
      const heroTl = gsap.timeline();

      // Set initial states for hero section
      gsap.set([titleRef.current, buttonRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(containerRef.current, {
        opacity: 0,
        scale: 1.1,
      });

      // Hero animation sequence
      heroTl
        .to(containerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      // First section animations
      gsap.fromTo(
        lineRef1.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef1.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        titleRef1.current,
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef1.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          delay: 0.3,
        }
      );

      gsap.fromTo(
        descriptionRef1.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descriptionRef1.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Second section animations
      gsap.fromTo(
        lineRef2.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef2.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        titleRef2.current,
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef2.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          delay: 0.3,
        }
      );

      gsap.fromTo(
        descriptionRef2.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descriptionRef2.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Button hover animations
      const button = buttonRef.current;
      if (button) {
        const handleMouseEnter = () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mouseleave", handleMouseLeave);

        // Store cleanup functions
        return () => {
          button.removeEventListener("mouseenter", handleMouseEnter);
          button.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    });

    // Cleanup function
    return () => {
      ctx.revert();
    };
  }, []);

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const openWhatsAppChat = (packageName: string) => {
    // Basic validation for phone number
    if (!phoneNumber) {
      console.error(
        "WhatsApp phone number is not configured. Please set NEXT_PUBLIC_WHATSAPP_NUMBER environment variable in a real Next.js app."
      );
      return;
    }

    const message = encodeURIComponent(
      `Hello! I'm interested in booking the a safari for "${packageName}" ` +
        `Could you please provide more information or confirm availability?`
    );

    // Construct the WhatsApp URL with the '+' in the phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Nav textcolor="text-secondary" />
      {/* Hero Section */}
      <div
        ref={containerRef}
        className="w-full h-screen font-display text-secondary bg-center bg-cover relative"
        style={{
          backgroundImage: "url('/Images/yalabig.webp')",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 justify-end h-full w-full xl:py-24 md:px-12 px-6 lg:py-12 md:py-16 py-8 flex flex-col">
          <h1
            ref={titleRef}
            className="font-bold xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl mb-6"
          >
            Yala National Park
          </h1>
          <div
            ref={buttonRef}
            className="md:px-12 px-8 md:py-2 py-4 bg-accent text-muted font-medium rounded-lg w-fit md:text-md text-md cursor-pointer transition-all duration-300"
            onClick={() => openWhatsAppChat("Yala National Park")}
          >
            Book Your Safari Now
          </div>
          <FreePick />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section
        ref={containerRef2}
        className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-8 bg-background font-display overflow-hidden"
      >
        {/* First Header Section */}
        <div
          ref={headerRef1}
          className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center mb-6 sm:mb-8 md:mb-8"
        >
          <div
            ref={lineRef1}
            className="w-[15px] sm:w-[25px] md:w-[60px] lg:w-[100px] xl:w-[155px] h-0.5 bg-primary"
          />
          <h2
            ref={titleRef1}
            className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase text-primary"
          >
            Welcome to Yala
          </h2>
        </div>

        <div className="w-full flex lg:flex-row flex-col-reverse gap-2 md:gap-3 lg:gap-4 xl:gap-6">
          <div
            className="w-full h-fit flex flex-col gap-4 text-primary text-base sm:text-md md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-8 leading-normal"
            ref={descriptionRef1}
          >
            <p>
              Located in the southeastern corner of Sri Lanka, Yala National
              Park is the country&apos;s most visited and iconic wildlife
              reserve. Spanning over 1,200 square kilometers of diverse
              landscapes — from dry woodlands and grasslands to coastal lagoons
              — Yala is best known for offering one of the highest leopard
              densities in the world.
            </p>
            <p>
              Whether you&apos;re a wildlife photographer, a nature lover, or a
              first-time safari-goer, Yala promises an unforgettable journey
              into the heart of Sri Lanka&apos;s untamed wilderness.
            </p>
          </div>
        </div>

        {/* Second Header Section */}
        <div
          ref={headerRef2}
          className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center mb-6 sm:mb-8 mt-8 md:mb-8"
        >
          <div
            ref={lineRef2}
            className="w-[15px] sm:w-[25px] md:w-[60px] lg:w-[100px] xl:w-[155px] h-0.5 bg-primary"
          />
          <h2
            ref={titleRef2}
            className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase text-primary"
          >
            Why Yala Stands Apart on the Global Safari Map
          </h2>
        </div>

        <div className="w-full flex lg:flex-row flex-col-reverse gap-2 md:gap-3 lg:gap-4 xl:gap-6">
          <div
            className="w-full h-fit flex flex-col gap-4 text-primary text-base sm:text-md md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-8 leading-normal"
            ref={descriptionRef2}
          >
            <p className="items-center">
              Yala National Park is globally elite for{" "}
              <span className="text-accent font-bold">
                high leopard density and wildlife encounters
              </span>{" "}
              with only rare urban sites briefly matching its numbers.{" "}
              <span>
                <Link
                  className="bg-[#D9FFE2] border border-black text-xs rounded-full font-light italic py-2 px-4"
                  href={
                    "https://www.hindustantimes.com/cities/mumbai-news/new-study-sgnp-has-highest-documented-density-of-leopards-in-world-101646926548143.html"
                  }
                  target="blank"
                >
                  *hinustantimes
                </Link>
                <Link
                  className="bg-[#D9FFE2] border border-black text-xs rounded-full font-light italic py-2 px-4"
                  href={
                    "https://www.inspiringvacations.com/us/sri-lanka-tours/insight-articles/going-on-a-yala-national-park-safari-heres-what-to-expect/13733"
                  }
                  target="blank"
                >
                  *inspiringvacations
                </Link>
              </span>
            </p>
          </div>
        </div>
      </section>

      <Gallery title="Yala" images={images} />
      <Features packageName="Yala National Park" />
    </>
  );
};

export default Page;
