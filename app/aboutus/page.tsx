"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "../Components/Nav";
import Image from "next/image";
// import Gallery from "../Components/Gallery";
import AboutGal from "./AboutGal";
import WhyChooseUs from "../Components/WhyChooseUs";

import type { Metadata } from "next";

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

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const images = [
    "/Images/about11.webp",
    "/Images/about4.webp",
    "/Images/about21.webp",
    "/Images/about3.webp",
    "/Images/about5.webp",
    "/Images/about6.webp",
  ];

  // Hero section refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const containerRef2 = useRef<HTMLDivElement>(null);
  const headerRef1 = useRef<HTMLDivElement>(null);
  const lineRef1 = useRef<HTMLDivElement>(null);
  const titleRef1 = useRef<HTMLHeadingElement>(null);
  const subtitleRef1 = useRef<HTMLHeadingElement>(null); // Added separate ref for subtitle
  const descriptionRef1 = useRef<HTMLDivElement>(null);

  // Second section refs
  const headerRef2 = useRef<HTMLDivElement>(null);
  const lineRef2 = useRef<HTMLDivElement>(null);
  const titleRef2 = useRef<HTMLHeadingElement>(null);
  const descriptionRef2 = useRef<HTMLDivElement>(null);

  // Gallery refs
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      // Animate subtitle separately
      gsap.fromTo(
        subtitleRef1.current,
        {
          x: -30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descriptionRef1.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          delay: 0.1,
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

      // Second section animations (if you have them)
      if (headerRef2.current) {
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
      }

      // Gallery images animation
      imageRefs.current.forEach((imageRef, index) => {
        if (imageRef) {
          gsap.fromTo(
            imageRef,
            {
              y: 50,
              opacity: 0,
              scale: 0.9,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: imageRef,
                start: "top 90%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.1,
            }
          );
        }
      });

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

  return (
    <>
      <Nav textcolor="text-secondary" />
      <div
        ref={containerRef}
        className="w-full h-screen font-display text-secondary bg-center bg-cover"
        style={{
          backgroundImage: "url('/Images/aboutbig.webp')",
        }}
      >
        <div className="justify-end h-full w-full xl:py-24 md:px-12 px-6 lg:py-12 md:py-16 py-20 flex flex-col">
          <h1
            ref={titleRef}
            className="font-bold xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl mb-6"
          >
            Our Story & <br></br>What Makes Us Different
          </h1>
        </div>
      </div>
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
            Who We Are
          </h2>
        </div>

        <div className="w-full flex lg:flex-row flex-col-reverse gap-2 md:gap-3 lg:gap-4 xl:gap-6">
          <div
            className="lg:w-1/2 w-full h-fit flex flex-col gap-4 text-primary text-base sm:text-md md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-8 lg:mt-0 mt-4 leading-normal text-justify"
            ref={descriptionRef1}
          >
            <h4 className="font-bold" ref={subtitleRef1}>
              A Legacy of Safari Excellence Since 1976
            </h4>
            <p>
              Nimal Safari is more than just a tour company — it&#39;s the
              result of a lifelong passion for wildlife and nature.
            </p>
            <p>
              Our story began in <span className="font-bold">1976</span>, when{" "}
              <span className="font-bold">Mr. Nimal</span>, a dedicated and
              adventurous local, began his journey as a safari jeep driver in
              <span className="font-bold">Yala National Park</span>. With a deep
              love for the wild and unmatched knowledge of the land, Mr. Nimal
              quickly became known for his skill in spotting elusive animals,
              including the famous Sri Lankan leopard.
            </p>
            <p>
              Over the years, what began as one man&#39;s humble journey grew
              into a full-fledged family business. Today, Nimal Safari proudly
              offers
              <span className="font-bold">
                {" "}
                guided jeep tours to Yala, Udawalawe, Bundala, and Lunugamwehera
                National Parks,
              </span>{" "}
              continuing Mr. Nimal&#39;s legacy of safe, respectful, and
              unforgettable safari adventures.
            </p>
            <p>
              We remain proudly{" "}
              <span className="font-bold">family-owned and operated,</span>
              based in <span className="font-bold"> Tissamaharama,</span> just
              minutes from Sri Lanka&#39;s most iconic wildlife destinations
            </p>
          </div>
          <div className=" lg:w-1/2 w-full flex-col flex gap-4">
            <div className="w-full h-fit flex lg:flex-col flex-row justify-center xl:mt-8 lg:mt-8 md:mt-8 sm:mt-6 mt-4 gap-12">
              <div className="stat-item flex flex-col items-center gap-2">
                <div className="md:text-sm text-xs text-center">
                  Tripadvisor Rating
                </div>
                <div className="md:text-5xl text-2xl flex gap-1 font-bold">
                  <div className="stat-number">4.7</div>
                </div>
              </div>
              <div className="stat-item flex flex-col items-center gap-2">
                <div className="md:text-sm text-xs text-center">Years</div>
                <div className="md:text-5xl text-2xl flex gap-1 font-bold">
                  <div className="stat-number">45</div>
                  <div>+</div>
                </div>
              </div>
              <div className="stat-item flex flex-col items-center gap-2">
                <div className="md:text-sm text-xs text-center">Customers</div>
                <div className="md:text-5xl text-2xl flex gap-1 font-bold">
                  <div className="stat-number">2000</div>
                  <div>+</div>
                </div>
              </div>
            </div>
            <Image
              className="self-center-safe xl:w-xs lg:w-2xs w-3xs "
              src="/Images/logoBig.webp"
              alt="logo"
              width={200}
              height={200}
            />
          </div>
        </div>
      </section>
      <AboutGal images={images} />
      <WhyChooseUs />
    </>
  );
};

export default Page;
