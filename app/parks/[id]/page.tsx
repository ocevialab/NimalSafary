"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Page = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Set initial states
    gsap.set([titleRef.current, buttonRef.current], {
      opacity: 0,
      y: 50,
    });

    gsap.set(containerRef.current, {
      opacity: 0,
      scale: 1.1,
    });

    // Animation sequence
    tl.to(containerRef.current, {
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

      // Cleanup
      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen font-display text-secondary bg-center bg-cover"
      style={{
        backgroundImage: "url('/Images/yalabig.webp')",
      }}
    >
      <div className="justify-end h-full w-full xl:py-24 md:px-12 px-6 lg:py-12 md:py-16 py-20 flex flex-col">
        <h1
          ref={titleRef}
          className="font-bold xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl mb-6"
        >
          Yala National Park
        </h1>
        <div
          ref={buttonRef}
          className="md:px-8 px-4 md:py-2 py-1 bg-accent text-muted font-medium rounded-lg w-fit md:text-md text-sm cursor-pointer transition-all duration-300"
        >
          Book Your Safari Now
        </div>
      </div>
    </div>
  );
};

export default Page;
