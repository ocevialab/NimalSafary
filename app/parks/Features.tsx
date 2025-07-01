"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureItem {
  id: number;
  icon: string;
  feature: string;
}

interface FeatureProp {
  packageName: string;
}

const Features: React.FC<FeatureProp> = ({ packageName }) => {
  // Refs for animation targets
  const containerRef2 = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLHRElement>(null);
  const titleRef2 = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const featuresGridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const secondButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const container = containerRef2.current;
    if (!container || typeof window === "undefined") return;

    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Header line animation
      gsap.fromTo(
        lineRef.current,
        {
          width: 0,
          opacity: 0,
        },
        {
          width: "10%",
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Title animation
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
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          delay: 0.3,
        }
      );

      // Description animation
      gsap.fromTo(
        descriptionRef.current,
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
            trigger: descriptionRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Features grid animation - animate each feature item
      const featureItems = container.querySelectorAll(".feature-item");
      gsap.fromTo(
        featureItems,
        {
          y: 40,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: featuresGridRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats section animation
      const statItems = container.querySelectorAll(".stat-item");
      gsap.fromTo(
        statItems,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate the numbers counting up
      const numberElements = container.querySelectorAll(".stat-number");
      numberElements.forEach((el) => {
        const element = el as HTMLElement;
        const finalValue = element.textContent || "0";
        const isDecimal = finalValue.includes(".");
        const numValue = parseFloat(finalValue);

        if (!isNaN(numValue)) {
          gsap.fromTo(
            element,
            { textContent: 0 },
            {
              textContent: numValue,
              duration: 2,
              ease: "power2.out",
              snap: isDecimal ? { textContent: 0.1 } : { textContent: 1 },
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
              delay: 0.5,
              onUpdate: function () {
                if (this.targets()[0]) {
                  const target = this.targets()[0] as HTMLElement;
                  const currentValue = gsap.getProperty(
                    target,
                    "textContent"
                  ) as number;
                  target.textContent = isDecimal
                    ? currentValue.toFixed(1)
                    : Math.round(currentValue).toString();
                }
              },
            }
          );
        }
      });

      // Primary button animation
      gsap.fromTo(
        buttonRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Secondary button animation
      gsap.fromTo(
        secondButtonRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: secondButtonRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          delay: 0.2,
        }
      );

      // Button hover animations
      const buttons = container.querySelectorAll(".animated-button");
      buttons.forEach((button) => {
        const buttonElement = button as HTMLElement;

        const handleMouseEnter = () => {
          gsap.to(buttonElement, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(buttonElement, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        buttonElement.addEventListener("mouseenter", handleMouseEnter);
        buttonElement.addEventListener("mouseleave", handleMouseLeave);

        // Store cleanup functions
        return () => {
          buttonElement.removeEventListener("mouseenter", handleMouseEnter);
          buttonElement.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    }, container);

    // Cleanup function
    return () => {
      ctx.revert();
    };
  }, []);

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
      `Hello! I'm interested in booking the "${packageName}" package. ` +
        `Could you please provide more information or confirm availability?`
    );

    // Construct the WhatsApp URL with the '+' in the phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  // Features data with proper typing
  const features: FeatureItem[] = [
    {
      id: 1,
      icon: "/Icons/jeep.png",
      feature: "Comfy Jeeps",
    },
    {
      id: 2,
      icon: "/Icons/compass.png",
      feature: "Expert Guides",
    },
    {
      id: 3,
      icon: "/Icons/guarantee.png",
      feature: "Safety",
    },
    {
      id: 4,
      icon: "/Icons/leaf.png",
      feature: "Eco-Friendly Safaris",
    },
    {
      id: 5,
      icon: "/Icons/bus.png",
      feature: "Flexible Pickup",
    },
    {
      id: 6,
      icon: "/Icons/binocular.png",
      feature: "Binoculars",
    },
    {
      id: 7,
      icon: "/Icons/wireless.png",
      feature: "Photo-Ready Tours",
    },
    {
      id: 8,
      icon: "/Icons/hilux.png",
      feature: "Hilux 4*4",
    },
  ];

  return (
    <section
      ref={containerRef2}
      className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-8 bg-background font-display overflow-hidden"
    >
      {/* Header Section */}
      <div
        ref={headerRef}
        className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center mb-6 sm:mb-8 md:mb-8"
      >
        <div
          ref={lineRef}
          className="h-0.5 bg-primary" // Changed from hr to div with height and background
          style={{ width: 0 }} // Start with width 0 for GSAP animation
        />
        <h2
          ref={titleRef2}
          className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase text-primary"
        >
          Explore. Discover. Safari with us.
        </h2>
      </div>

      <div className="w-full flex lg:flex-row flex-col-reverse gap-2 md:gap-3 lg:gap-4 xl:gap-6">
        <div
          className="w-full h-fit flex flex-col gap-4 text-primary text-base sm:text-md md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-8 leading-normal"
          ref={descriptionRef}
        >
          <p>
            Don&apos;t just dream it — experience it. Limited safari slots
            available daily.
          </p>
        </div>
      </div>

      <div
        ref={featuresGridRef}
        className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-items-center w-full"
      >
        {features.map((item) => (
          <div
            className="feature-item w-full max-w-[170px] h-fit flex flex-col gap-2 items-center p-2 sm:p-3 md:p-4"
            key={item.id}
          >
            <Image
              src={item.icon}
              alt={item.feature}
              width={100}
              height={100}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] object-contain"
              priority={item.id <= 4} // Prioritize first 4 images
            />
            <h4 className="text-sm sm:text-base md:text-lg text-center">
              {item.feature}
            </h4>
          </div>
        ))}
      </div>

      <div
        ref={statsRef}
        className="w-full h-fit flex flex-row justify-center mt-12 gap-12"
      >
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

      <div className="w-full flex flex-col items-center justify-center mt-12">
        <div
          ref={buttonRef}
          className="animated-button md:px-14 px-10 md:py-4 py-4 bg-accent text-muted font-medium rounded-xl w-fit md:text-2xl text-sm cursor-pointer transition-all duration-300"
          onClick={() => openWhatsAppChat()}
        >
          Book Your Safari Now
        </div>
        <div className="mt-1 md:text-sm text-xs">Contact via Whatsapp</div>
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-10">
        <Link
          href="/aboutus"
          ref={secondButtonRef}
          className="animated-button md:px-8 px-4 md:py-2 py-1 bg-accent text-muted font-medium rounded-lg w-fit md:text-md text-sm cursor-pointer transition-all duration-300"
        >
          Learn more about us
        </Link>
      </div>
    </section>
  );
};

export default Features;
