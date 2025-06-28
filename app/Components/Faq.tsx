"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ChevronUp } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What should I bring on a safari?",
    answer:
      "We recommend wearing comfortable, neutral-colored clothing suitable for warm weather and dusty terrain. Don't forget essentials like sunscreen, a wide-brimmed hat or cap, sunglasses, and insect repellent. A camera or smartphone is a must for capturing wildlife moments, and please remember to bring your passport or national ID, as it is required at park entry gates.",
  },
  {
    question: "How do I book a safari?",
    answer:
      "Booking a safari with us is simple! You can contact us directly through our website contact form, WhatsApp, or phone. We'll discuss your preferred dates, group size, and specific interests to customize the perfect safari experience for you. We recommend booking in advance, especially during peak season (December to April).",
  },
  {
    question: "Can children join the safari?",
    answer:
      "Absolutely! We welcome families with children of all ages. Our experienced guides are great with kids and know how to make the safari educational and exciting for young wildlife enthusiasts. We provide child-friendly explanations about the animals and ensure a safe, comfortable experience for the whole family.",
  },
  {
    question: "Eco-friendly, respectful wildlife viewing",
    answer:
      "We are committed to responsible tourism and conservation. Our safaris follow strict ethical guidelines - we maintain safe distances from wildlife, never disturb their natural behavior, and support local conservation efforts. We use eco-friendly practices and contribute to community development programs that benefit both wildlife and local communities.",
  },
  {
    question: "Photography-friendly tours",
    answer:
      "Our tours are designed with photographers in mind! We position our vehicles for optimal lighting and angles, spend extra time at promising locations, and our guides know the best spots for wildlife photography. Whether you're using a smartphone or professional camera equipment, we'll help you capture stunning memories of Sri Lanka's incredible wildlife.",
  },
];

const FAQ = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLHRElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const faqContainerRef = useRef<HTMLDivElement>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

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

      // FAQ items staggered animation
      faqRefs.current.forEach((faq, index) => {
        if (faq) {
          gsap.fromTo(
            faq,
            {
              opacity: 0,
              y: 30,
              scale: 0.98,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: faqContainerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.8,
          scrollTrigger: {
            trigger: faqContainerRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Set initial state for content elements (except first one which is open)
      contentRefs.current.forEach((content, index) => {
        if (content) {
          if (index === 0) {
            // First item is open by default
            gsap.set(content, { height: "auto", opacity: 1 });
          } else {
            gsap.set(content, { height: 0, opacity: 0 });
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-10 lg:py-12 bg-background font-display h-fit block"
    >
      {/* Header Section */}
      <div
        ref={headerRef}
        className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center mb-8 sm:mb-10 md:mb-12"
      >
        <hr
          ref={lineRef}
          className="w-[15px] sm:w-[25px] md:w-[60px] lg:w-[100px] xl:w-[155px] bg-secondary border-primary"
        />
        <h2
          ref={titleRef}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase text-primary"
        >
          FREQUENTLY ASKED QUESTIONS
        </h2>
      </div>

      {/* FAQ Section */}
      <div ref={faqContainerRef} className="w-full mx-auto">
        {faqData.map((faq, index) => (
          <div
            key={index}
            ref={(el) => {
              faqRefs.current[index] = el;
            }}
            className="border-b border-gray-200 mb-2"
          >
            <button
              className="flex justify-between items-center w-full py-4 sm:py-5 text-left text-gray-800 hover:text-accent transition-colors duration-200 focus:outline-none focus:text-accent group"
              onClick={() => toggleAccordion(index)}
              type="button"
              aria-expanded={openIndex === index}
              aria-controls={`faq-content-${index}`}
            >
              <span className="text-base sm:text-lg md:text-xl font-medium pr-4 group-hover:text-accent transition-colors duration-200">
                {faq.question}
              </span>
              <div className="flex-shrink-0">
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-accent transition-colors duration-200" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-accent transition-colors duration-200" />
                )}
              </div>
            </button>

            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              id={`faq-content-${index}`}
              className="overflow-hidden"
              role="region"
              aria-labelledby={`faq-button-${index}`}
            >
              <div className="pb-4 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inquire More Button */}
      <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
        <button
          ref={buttonRef}
          className="bg-accent hover:bg-accent/80 text-muted font-medium py-3 px-8 sm:px-10 md:px-12 rounded-2xl transition-all duration-300 transform hover:scale-105  hover:shadow-xl text-sm sm:text-base md:text-lg
          
          "
        >
          Inquire More
        </button>
      </div>
    </div>
  );
};

export default FAQ;
