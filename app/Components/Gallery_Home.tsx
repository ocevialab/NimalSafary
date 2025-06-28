"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Gallery_Home() {
  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLHRElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const images = [
    "/Images/gallery1.webp",
    "/Images/gallery7.webp",
    "/Images/gallery4.webp",
    "/Images/gallery3.webp",
    "/Images/gallery5.webp",
    "/Images/gallery6.webp",
    "/Images/gallery2.webp",
    "/Images/gallery8.webp",
    "/Images/gallery9.webp",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation timeline
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          end: "bottom 65%",
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
          x: -30,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Gallery images animation with stagger
      imageRefs.current.forEach((imageContainer, index) => {
        if (imageContainer) {
          const image = imageContainer.querySelector("img");

          // Container animation
          gsap.fromTo(
            imageContainer,
            {
              opacity: 0,
              y: 60,
              scale: 0.8,
              rotationX: 45,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: galleryRef.current,
                start: "top 80%",
                end: "bottom 60%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Image scale animation
          if (image) {
            gsap.fromTo(
              image,
              {
                scale: 1.3,
                opacity: 0,
                filter: "blur(10px)",
              },
              {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power2.out",
                delay: index * 0.1 + 0.2,
                scrollTrigger: {
                  trigger: galleryRef.current,
                  start: "top 80%",
                  end: "bottom 60%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Hover animations
          const handleMouseEnter = () => {
            gsap.to(imageContainer, {
              scale: 1.02,
              rotationY: 5,
              duration: 0.4,
              ease: "power2.out",
            });

            if (image) {
              gsap.to(image, {
                scale: 1.1,
                duration: 0.6,
                ease: "power2.out",
              });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(imageContainer, {
              scale: 1,
              rotationY: 0,
              duration: 0.4,
              ease: "power2.out",
            });

            if (image) {
              gsap.to(image, {
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
              });
            }
          };

          imageContainer.addEventListener("mouseenter", handleMouseEnter);
          imageContainer.addEventListener("mouseleave", handleMouseLeave);

          // Cleanup function
          return () => {
            imageContainer.removeEventListener("mouseenter", handleMouseEnter);
            imageContainer.removeEventListener("mouseleave", handleMouseLeave);
          };
        }
      });

      // Additional parallax effect for gallery container
      gsap.to(galleryRef.current, {
        y: -20,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-8 bg-background font-display overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="flex items-center gap-4 mb-8">
        <hr
          ref={lineRef}
          className="w-16 sm:w-20 md:w-24 bg-secondary border-primary h-0.5"
        />
        <h2
          ref={titleRef}
          className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase text-primary"
        >
          Sri Lanka&apos;s Untamed Safari Wonders
        </h2>
      </div>

      {/* Masonry Gallery */}
      <div
        ref={galleryRef}
        className="columns-2 sm:columns-2 md:columns-3 gap-2 sm:gap-3 space-y-2 sm:space-y-3"
      >
        {images.map((src, index) => (
          <div
            key={index}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="w-full overflow-hidden rounded-md sm:rounded-lg shadow-md sm:shadow-lg break-inside-avoid cursor-pointer transform-gpu"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              width={400}
              height={400}
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 33vw"
              className="w-full h-auto object-cover transition-all duration-300"
              priority={index < 3}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery_Home;
