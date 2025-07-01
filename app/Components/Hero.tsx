// app/Components/Hero.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export default function Hero() {
  const heroImageList = [
    "/Images/hero.webp",
    "/Images/aboutbig.webp",
    "/Images/bubig.webp",
    "/Images/udabig.webp",
    "/Images/hero.webp",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  useEffect(() => {
    const interval = setInterval(() => {
      changeBackgroundImage();
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const changeBackgroundImage = () => {
    if (!backgroundRef.current || !overlayRef.current) return;

    const nextIndex = (currentImageIndex + 1) % heroImageList.length;

    // Create timeline for smooth transition
    const tl = gsap.timeline();

    // First, fade out and zoom in current image
    tl.to(backgroundRef.current, {
      scale: 1.1,
      opacity: 0.3,
      duration: 0.8,
      ease: "power2.inOut",
    })
      // Then change the background image and reset
      .call(() => {
        if (backgroundRef.current) {
          backgroundRef.current.style.backgroundImage = `url('${heroImageList[nextIndex]}')`;
          setCurrentImageIndex(nextIndex);
        }
      })
      // Finally, fade in and zoom out new image
      .to(backgroundRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      });
  };

  const openWhatsAppChat = () => {
    // Basic validation for phone number
    if (!phoneNumber) {
      console.error(
        "WhatsApp phone number is not configured. Please set NEXT_PUBLIC_WHATSAPP_NUMBER environment variable in a real Next.js app."
      );
      return;
    }

    const message = encodeURIComponent(
      `Hello! I'm interested in booking a safari with Namal Safari. Could you please share more details about the available packages and timings? Thank you!`
    );

    // Construct the WhatsApp URL with the '+' in the phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="relative w-full h-screen text-secondary overflow-hidden">
      {/* Background Image Container */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full bg-center bg-cover transition-all duration-1000"
        style={{
          backgroundImage: `url('${heroImageList[currentImageIndex]}')`,
          transform: "scale(1)",
        }}
      />

      {/* Optional overlay for better text readability */}
      <div ref={overlayRef} className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className=" z-10 absolute md:bottom-0 bottom-5 w-full md:px-12 px-6 md:py-8 py-4 flex md:flex-row flex-col md:justify-between md:items-end gap-4">
        <div className="md:w-2/5 w-4/5 flex flex-col gap-4 text-white">
          <motion.h1
            className="lg:text-7xl md:text-5xl text-3xl font-display font-semibold tracking-wide"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Experience the <span className="text-accent">Wild</span> Like Never
            Before
          </motion.h1>
          <motion.p
            className="lg:text-xl md:text-lg text-xs lg:pr-24 md:pr-12 pr-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Join <span className="text-accent">Nimal Safari</span> for
            unforgettable wildlife adventures in{" "}
            <span className="text-accent">Yala, Udawalawe, Bundala</span>, and
            more. Based in Tissamaharama, your gateway to Sri Lanka&#39;s best
            national parks.
          </motion.p>
          <motion.div
            className="md:px-8 px-4 md:py-2 py-1 bg-accent text-muted font-medium rounded-lg w-fit md:text-md text-sm cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
            }}
            viewport={{ once: true, amount: 0.1 }}
            onClick={() => openWhatsAppChat()}
          >
            Book Your Safari Now
          </motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Link
            className="w-fit h-fit p-4 bg-secondary/15 text-primary backdrop-opacity-10 backdrop-blur-2xl rounded-md flex flex-col gap-2 hover:drop-shadow-cyan-500/50 drop-shadow-sm font-display"
            href={
              "https://www.tripadvisor.com/Attraction_Review-g1102395-d5512904-Reviews-Nimal_Safari-Tissamaharama_Southern_Province.html"
            }
            target="blank"
          >
            <div className="text-secondary flex justify-between gap-10 items-center">
              <Image
                src="/Images/traveladvisor.png"
                width={24}
                height={24}
                alt="traveladvisorlog"
                className="w-6 h-6 opacity-80"
              />
              <h2 className="md:text-xl text-lg font-bold text-secondary">
                Tripadvisor
              </h2>
              <p className="md:text-xl text-lg font-bold text-accent">4.7</p>
            </div>
            <div className="text-secondary md:text-sm text-xs md:mt-4 mt-1">
              Sarah F
            </div>
            <div className="md:text-sm text-xs font-light md:w-[300px] w-full text-secondary md:line-clamp-none line-clamp-3">
              It was an amazing experience! We had a great driver and a lot of
              luck - got to see two leopards, elephants, water buffalos,
              different deers and birds and a crocodile. The landscape is
              beautiful as well. Would recommend a full day safari with a lovely
              stop for lunch at the beach. Very well organised and memories for
              a lifetime!
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Image Indicators (Optional) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImageList.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-accent w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => {
              setCurrentImageIndex(index);
              if (backgroundRef.current) {
                gsap.to(backgroundRef.current, {
                  scale: 1.05,
                  opacity: 0.5,
                  duration: 0.4,
                  ease: "power2.inOut",
                  onComplete: () => {
                    if (backgroundRef.current) {
                      backgroundRef.current.style.backgroundImage = `url('${heroImageList[index]}')`;
                      gsap.to(backgroundRef.current, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: "power2.inOut",
                      });
                    }
                  },
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
