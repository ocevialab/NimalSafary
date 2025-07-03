"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
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

  // Mobile state
  const [isMobile, setIsMobile] = useState(false);

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
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set up 3D perspective on container
      gsap.set(containerRef.current, {
        perspective: 1000,
        transformStyle: "preserve-3d",
      });

      // Initial state - gallery starts tilted
      gsap.set(galleryRef.current, {
        rotationX: isMobile ? 15 : 20, // Start tilted
        scale: isMobile ? 0.8 : 0.95, // Start slightly smaller
        y: 0,
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
      });

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

      // Animate title with upward translation
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

      // 3D ROTATION SCROLL EFFECT
      gsap.timeline({
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1.5,
          onUpdate: (self) => {
            const progress = self.progress;

            // Rotation: from tilted to flat
            const startRotation = isMobile ? 15 : 20;
            const rotation = startRotation * (1 - progress);

            // Scale: from small to normal
            const startScale = isMobile ? 0.8 : 0.95;
            const endScale = 1;
            const scale = startScale + (endScale - startScale) * progress;

            // Y translation: slight upward movement
            const translateY = -50 * progress;

            gsap.set(galleryRef.current, {
              rotationX: rotation,
              scale: scale,
              y: translateY,
            });
          },
        },
      });

      // Header translation during scroll
      gsap.to(headerRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      // Gallery images animation with stagger
      imageRefs.current.forEach((imageContainer, index) => {
        if (imageContainer) {
          const image = imageContainer.querySelector("img");

          // Container animation
          gsap.fromTo(
            imageContainer,
            {
              opacity: 0,
              y: 40,
              scale: 0.9,
              rotationY: isMobile ? 5 : 10,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.05,
              scrollTrigger: {
                trigger: galleryRef.current,
                start: "top 70%",
                end: "bottom 50%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Image scale animation
          if (image) {
            gsap.fromTo(
              image,
              {
                scale: 1.2,
                opacity: 0,
                filter: "blur(5px)",
              },
              {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power2.out",
                delay: index * 0.05 + 0.1,
                scrollTrigger: {
                  trigger: galleryRef.current,
                  start: "top 70%",
                  end: "bottom 50%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Normal hover animations (no tilt)
          const handleMouseEnter = () => {
            gsap.to(imageContainer, {
              scale: 1.05,
              y: -8,
              duration: 0.3,
              ease: "power2.out",
            });

            if (image) {
              gsap.to(image, {
                scale: 1.1,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(imageContainer, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });

            if (image) {
              gsap.to(image, {
                scale: 1,
                duration: 0.4,
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

      // Additional parallax effect after main animation
      gsap.to(galleryRef.current, {
        y: -20,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "bottom 20%",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-16 bg-background font-display overflow-hidden"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Header */}
      <div ref={headerRef} className="flex items-center gap-4 mb-12">
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

      {/* 3D Rotating Gallery */}
      <div
        ref={galleryRef}
        className="columns-2 sm:columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="w-full overflow-hidden rounded-lg shadow-lg break-inside-avoid cursor-pointer transform-gpu"
            style={{
              transformStyle: "preserve-3d",
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
