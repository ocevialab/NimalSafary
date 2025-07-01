"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from "@/app/Components/Nav";
import Link from "next/link";
import Image from "next/image";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface SafariItem {
  id: number;
  img: string;
  title: string;
  description: string;
  link: string;
}

const Page = () => {
  const popularSafaris: SafariItem[] = [
    {
      id: 1,
      img: "/Images/popular1.webp",
      title: "Yala National Park Safari - Morning",
      description:
        "Start your day with a sunrise safari in Yala, where you have the best chance of spotting leopards, elephants, and vibrant birdlife at their most active.",
      link: "/parks/yala",
    },
    {
      id: 2,
      img: "/Images/popular2.webp",
      title: "Udawalawe National Park Safari",
      description:
        "Explore the vast grasslands of Udawalawe, home to large herds of elephants, water buffalo, crocodiles, and over 200 species of birds.",
      link: "/parks/udawalawa",
    },
    {
      id: 3,
      img: "/Images/popular3.webp",
      title: "Bundala National Park Safari",
      description:
        "A birdwatcher's paradise, Bundala offers sightings of flamingos, storks, and crocodiles in a serene coastal wetland setting.",
      link: "/parks/bundala",
    },
    {
      id: 4,
      img: "/Images/popular1.webp",
      title: "Yala National Park Safari - Evening",
      description:
        "As the sun sets, experience Yala’s magical golden hour, when animals like leopards, sloth bears, and elephants emerge from the shadows.",
      link: "/parks/yala",
    },
    {
      id: 5,
      img: "/Images/yala3.webp",
      title: "Yala National Park Safari - Full Day",
      description:
        "Immerse yourself in a full-day expedition through Yala's diverse habitats, maximizing your chances of rare wildlife encounters and scenic beauty.",
      link: "/parks/yala",
    },
    {
      id: 6,
      img: "/Images/lunu2.webp",
      title: "Lunugamwehera National Park Safari",
      description:
        "Enjoy a peaceful safari in Lunugamwehera, a hidden gem rich in elephants, wild boar, peacocks, and unspoiled wilderness near Yala.",
      link: "/parks/lunugamwehera",
    },
  ];

  // Hero section refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Card animation refs
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Header section refs
  const headerSectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLHRElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);

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

      // Set initial states for cards
      gsap.set(cardRefs.current, {
        opacity: 0,
        y: 60,
        scale: 0.9,
      });

      // Set initial states for header section
      gsap.set(lineRef.current, {
        width: 0,
        opacity: 0,
      });

      gsap.set(headerTitleRef.current, {
        opacity: 0,
        x: -30,
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

      // Card reveal animation with ScrollTrigger
      if (cardsContainerRef.current) {
        gsap.to(cardRefs.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Header section reveal animation with ScrollTrigger
      if (headerRef.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        headerTl
          .to(lineRef.current, {
            width: "10%",
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          })
          .to(
            headerTitleRef.current,
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4"
          );
      }

      // Card hover animations
      cardRefs.current.forEach((card) => {
        if (card) {
          const cardImage = card.querySelector(".card-image");
          const cardTitle = card.querySelector(".card-title");
          const bookButton = card.querySelector(".book-button");

          const handleMouseEnter = () => {
            gsap.to(cardImage, {
              scale: 1.1,
              duration: 0.4,
              ease: "power2.out",
            });
            gsap.to(cardTitle, {
              y: -10,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(bookButton, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(cardImage, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
            gsap.to(cardTitle, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(bookButton, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);
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
      }
    });

    // Cleanup function
    return () => {
      ctx.revert();
      // Clean up event listeners
      cardRefs.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        }
      });

      if (buttonRef.current) {
        buttonRef.current.removeEventListener("mouseenter", () => {});
        buttonRef.current.removeEventListener("mouseleave", () => {});
      }
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
      `Hello! I'm interested in booking the "${packageName}" package. ` +
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
        className="w-full h-screen font-display text-secondary bg-center bg-cover"
        style={{
          backgroundImage: "url('/Images/safabig.webp')",
        }}
      >
        <div className="justify-end h-full w-full xl:py-24 md:px-12 px-6 lg:py-12 md:py-16 py-20 flex flex-col">
          <h1
            ref={titleRef}
            className="font-bold xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl mb-6"
          >
            Explore Our Wildlife <br />
            Safari Options
          </h1>
        </div>
      </div>

      {/* Header Section */}
      <div
        ref={headerSectionRef}
        className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-10 lg:py-12 bg-background font-display h-fit block"
      >
        <div
          ref={headerRef}
          className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center mb-6 sm:mb-8 md:mb-8"
        >
          <div
            ref={lineRef}
            className="h-[1px]  bg-primary w-[15px] sm:w-[25px] md:w-[60px] lg:w-[100px] xl:w-[155px]"
          ></div>
          <h2
            ref={headerTitleRef}
            className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase text-primary"
          >
            Popular among visitors
          </h2>
        </div>

        {/* Safari Cards Section */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {popularSafaris.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="w-full aspect-[4/5] sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[4/5] rounded-lg sm:rounded-xl relative block overflow-hidden group  hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image Section */}
              <div className="w-full aspect-[4/3] relative overflow-hidden">
                <Link href={item.link} className="block w-full h-full">
                  <div className="w-full h-full relative card-image">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover rounded-2xl"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 33vw, 450px"
                    />
                  </div>

                  <h3 className="card-title text-secondary text-lg lg:text-xl xl:text-2xl font-semibold m-4 absolute left-0 bottom-0 z-10 leading-tight drop-shadow-lg">
                    {item.title}
                  </h3>
                </Link>
              </div>

              {/* Content Section */}
              <div className="p-4 lg:p-6">
                <p className="text-gray-600 text-sm lg:text-base mb-4 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <div onClick={() => openWhatsAppChat(item.title)}>
                  <button className="book-button bg-accent w-full text-muted font-semibold py-3 px-6 rounded-xl  cursor-pointer">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
