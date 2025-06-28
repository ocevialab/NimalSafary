"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ChevronUp } from "lucide-react";

import Image from "next/image";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface FAQ {
  title: string;
  content: string;
}

const faqs: FAQ[] = [
  {
    title: "Comfortable, well-maintained jeeps",
    content:
      "Experience the wild in comfort with our Toyota Hilux 4×4 jeeps — spacious, reliable, and built for off-road adventure. Each vehicle is well-maintained and equipped to ensure a smooth and safe journey across all terrain",
  },
  {
    title: "Knowledgeable and friendly guides",
    content:
      "Our guides are locals with deep knowledge of the parks and wildlife, making every tour informative and engaging.",
  },
  {
    title: "Flexible pickup times from your hotel",
    content:
      "We offer convenient, flexible pickup schedules tailored to your location and preferred safari timing.",
  },
  {
    title: "Expert in all four surrounding parks",
    content:
      "We follow responsible safari practices that protect wildlife habitats and minimize our environmental impact.",
  },
  {
    title: "Eco-friendly, respectful wildlife viewing",
    content:
      "Guidance on travel arrangements, accommodation, and adjusting to a new environment.",
  },
  {
    title: "Photography-friendly tours",
    content:
      "Our tours are designed for photographers, with optimal lighting, angles, and enough time to capture stunning wildlife shots.",
  },
];

const WhyChooseUs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Refs for GSAP animations
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLHRElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const faqsContainerRef = useRef<HTMLDivElement>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number): void => {
    const isOpening = openIndex !== index;
    const targetContent = contentRefs.current[index];

    if (targetContent) {
      if (isOpening) {
        // Close previously open accordion
        if (openIndex !== null && contentRefs.current[openIndex]) {
          gsap.to(contentRefs.current[openIndex], {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
        }

        // Open new accordion
        gsap.set(targetContent, { height: "auto" });
        const autoHeight = targetContent.offsetHeight;
        gsap.set(targetContent, { height: 0 });

        gsap.to(targetContent, {
          height: autoHeight,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });

        setOpenIndex(index);
      } else {
        // Close current accordion
        gsap.to(targetContent, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
        setOpenIndex(null);
      }
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header line animation
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
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 50,
          rotationX: 10,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // FAQ items staggered animation
      faqRefs.current.forEach((faq, index) => {
        if (faq) {
          gsap.fromTo(
            faq,
            {
              opacity: 0,
              x: 50,
              y: 20,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: faqsContainerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Set initial state for content elements
      contentRefs.current.forEach((content) => {
        if (content) {
          gsap.set(content, { height: 0, opacity: 0 });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-8 bg-background font-display overflow-hidden"
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
          WHY CHOOSE US
        </h2>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-6 md:gap-8 items-center">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2">
          {/* <img
            ref={imageRef}
            src={chooseImage}
            alt="Counseling Session"
            className="rounded-xl w-full h-116 aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] object-cover shadow-lg"
          /> */}
          <Image
            ref={imageRef}
            src="/Images/choose.webp"
            alt="Counseling Session"
            className="rounded-xl w-full h-116 aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] object-cover shadow-lg"
            width={400}
            height={400}
          />
        </div>

        {/* Right FAQ Section */}
        <div ref={faqsContainerRef} className="w-full lg:w-1/2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => {
                faqRefs.current[index] = el;
              }}
              className="border-b border-gray-300"
            >
              <button
                className="flex justify-between items-center w-full py-4 sm:py-6 text-lg sm:text-2xl  text-left hover:text-accent transition-colors duration-200"
                onClick={() => toggleAccordion(index)}
                type="button"
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <span>{faq.title}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {/* Animated Content */}
              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                id={`faq-content-${index}`}
                className="overflow-hidden"
                role="region"
                aria-labelledby={`faq-button-${index}`}
              >
                <p className="text-gray-600 pb-4 px-2 text-base sm:text-lg">
                  {faq.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
