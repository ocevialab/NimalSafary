"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About_Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLHRElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation timeline
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate line width and opacity
      headerTl.fromTo(
        lineRef.current,
        {
          width: 0,
          opacity: 0,
        },
        {
          width: "10%",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );

      // Animate title
      headerTl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Description animation
      gsap.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.8,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards animation with stagger
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const cardImage = card.querySelector(".card-image");
          const cardOverlay = card.querySelector(".card-overlay");
          const cardTitle = card.querySelector(".card-title");

          // Initial card animation
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 50,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.2,
              scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: "top 80%",
                end: "bottom 60%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Image scale animation
          if (cardImage) {
            gsap.fromTo(
              cardImage,
              {
                scale: 1.2,
                opacity: 0,
              },
              {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: index * 0.2 + 0.1,
                scrollTrigger: {
                  trigger: cardsContainerRef.current,
                  start: "top 80%",
                  end: "bottom 60%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Overlay animation
          if (cardOverlay) {
            gsap.fromTo(
              cardOverlay,
              {
                opacity: 0,
              },
              {
                opacity: 1,
                duration: 0.4,
                delay: index * 0.2 + 0.3,
                scrollTrigger: {
                  trigger: cardsContainerRef.current,
                  start: "top 80%",
                  end: "bottom 60%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Title animation
          if (cardTitle) {
            gsap.fromTo(
              cardTitle,
              {
                opacity: 0,
                y: 50,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                delay: index * 0.2 + 0.4,
                scrollTrigger: {
                  trigger: cardsContainerRef.current,
                  start: "top 80%",
                  end: "bottom 60%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Hover animations
          const handleMouseEnter = () => {
            gsap.to(card, {
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            });

            if (cardImage) {
              gsap.to(cardImage, {
                scale: 1.1,
                duration: 0.7,
                ease: "power2.out",
              });
            }

            if (cardOverlay) {
              gsap.to(cardOverlay, {
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent)",
                duration: 0.3,
              });
            }

            if (cardTitle) {
              gsap.to(cardTitle, {
                color: "#fde047", // yellow-300
                duration: 0.3,
              });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });

            if (cardImage) {
              gsap.to(cardImage, {
                scale: 1,
                duration: 0.7,
                ease: "power2.out",
              });
            }

            if (cardOverlay) {
              gsap.to(cardOverlay, {
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)",
                duration: 0.3,
              });
            }

            if (cardTitle) {
              gsap.to(cardTitle, {
                color: "#ffffff",
                duration: 0.3,
              });
            }
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);

          // Cleanup function will handle removing event listeners
          return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
          };
        }
      });

      // Images reveal animation - responsive timing and positioning
      const imagesTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: isMobile ? "top 95%" : "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
        },
      });

      // Define animation properties based on screen size
      const animationProps = {
        duration: isMobile ? 0.6 : 0.8,
        stagger: isMobile ? 0.2 : 0.4,
        initialY: isMobile ? 60 : 100,
        initialScale: isMobile ? 0.9 : 0.8,
        initialRotation: isMobile ? 8 : 15,
      };

      // First image animation
      if (image1Ref.current) {
        imagesTimeline.fromTo(
          image1Ref.current,
          {
            opacity: 0,
            y: animationProps.initialY,
            scale: animationProps.initialScale,
            rotationX: animationProps.initialRotation,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: animationProps.duration,
            ease: "power2.out",
          }
        );
      }

      // Second image animation with responsive stagger
      if (image2Ref.current) {
        imagesTimeline.fromTo(
          image2Ref.current,
          {
            opacity: 0,
            y: animationProps.initialY,
            scale: animationProps.initialScale,
            rotationX: animationProps.initialRotation,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: animationProps.duration,
            ease: "power2.out",
          },
          `-=${animationProps.stagger}` // Dynamic stagger based on screen size
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]); // Re-run when mobile state changes

  return (
    <div
      ref={containerRef}
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-10 lg:py-12 bg-background font-display h-fit block"
    >
      {/* Header Section */}
      <div
        ref={headerRef}
        className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center mb-6 sm:mb-8 md:mb-8"
      >
        <hr
          ref={lineRef}
          className="w-[15px] sm:w-[25px] md:w-[60px] lg:w-[100px] xl:w-[155px] bg-secondary border-primary"
        />
        <h2
          ref={titleRef}
          className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase text-primary"
        >
          About Us
        </h2>
      </div>
      <div className="w-full flex lg:flex-row flex-col-reverse gap-2 md:gap-3 lg:gap-4 xl:gap-6">
        <div
          className="lg:w-1/2 w-full h-fit flex flex-col gap-4 text-primary text-base sm:text-md md:text-lg lg:text-xl xl:text-2xl  mb-6 sm:mb-8 md:mb-8 leading-normal"
          ref={descriptionRef}
        >
          <p>
            We are a passionate team of wildlife enthusiasts and local guides
            offering expertly curated safaris across Sri Lanka&apos;s most
            iconic national parks. From tracking elusive leopards in Yala to
            witnessing herds of elephants in Udawalawe, we aim to create
            unforgettable, responsible wildlife experiences that connect you
            deeply with nature.
          </p>
          <p>
            As these heritage snapshots show, Nimal Safari has been a family-run
            adventure for over three generations, beginning with my
            grandfather&apos;s first homemade safari jeep in the 1960s. Since
            then, our passion for the wild has been passed down, evolving from
            humble bush outings to fully licensed, guided safaris across
            southern Sri Lanka. Every safari we conduct carries forward the same
            sense of wonder and respect for nature that first inspired us—rooted
            in tradition, yet refined for today&apos;s travelers.
          </p>
          <Link
            className="flex justify-center mt-4 sm:mt-4 md:mt-8"
            href="/aboutus"
          >
            <button
              ref={buttonRef}
              className="bg-accent hover:bg-accent/80 text-muted font-medium py-3 px-8 sm:px-10 md:px-12 rounded-2xl transition-all duration-300 transform hover:scale-105  hover:shadow-xl text-sm sm:text-base md:text-lg
          
          "
            >
              Learn More
            </button>
          </Link>
        </div>
        <div className="lg:w-1/2 w-full h-fit relative" ref={imageContainerRef}>
          {/* First image with responsive positioning */}
          <div
            ref={image1Ref}
            className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] h-auto mb-4 md:mb-2 mx-auto lg:absolute md:-top-20 md:right-0 lg:-top-16 xl:-top-20"
          >
            <Image
              src="/Images/about1.webp"
              alt="About 1"
              width={500}
              height={400}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 45vw, 40vw"
              className="w-full h-auto object-cover rounded-lg transition-all duration-300"
              priority={false}
            />
          </div>
          {/* Second image with responsive positioning */}
          <div
            ref={image2Ref}
            className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] h-auto mx-auto md:absolute md:top-48 lg:top-56 xl:top-60 md:right-0"
          >
            <Image
              src="/Images/about2.webp"
              alt="About 2"
              width={500}
              height={400}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 45vw, 40vw"
              className="w-full h-auto object-cover rounded-lg  transition-all duration-300"
              priority={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_Home;
