"use client";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

// Recent 3 blog posts data
const recentBlogs: BlogPost[] = [
  {
    id: 1,
    title: "The Ultimate Safari Guide: Spotting Leopards in Yala National Park",
    excerpt:
      "Embark on an unforgettable safari adventure in Yala National Park, where nature's most elusive predator awaits.",
    image: "/Images/yala1.webp",
    category: "Wildlife",
    date: "2024-01-15",
    readTime: "15 min read",
  },
  {
    id: 2,
    title: "Safari Adventure: Elephant Encounters in Udawalawe's Natural Paradise",
    excerpt:
      "Experience the magic of an authentic safari adventure as you watch wild elephants roam freely in their natural habitat.",
    image: "/Images/lunu3.webp",
    category: "Wildlife",
    date: "2024-01-10",
    readTime: "12 min read",
  },
  {
    id: 3,
    title: "Nature's Symphony: Birdwatching Safari in Bundala's Wetland Paradise",
    excerpt:
      "Discover the incredible bird diversity of Bundala on an immersive safari experience through this Ramsar wetland site.",
    image: "/Images/bu1.webp",
    category: "Birdwatching",
    date: "2024-01-05",
    readTime: "14 min read",
  },
];

function ReadOurBlog() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs for GSAP animations
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLHRElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % recentBlogs.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, isTransitioning]);

  // GSAP animations for header
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

      // Initial slider animation
      gsap.fromTo(
        slidesContainerRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sliderWrapperRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Perfect slide transition using GSAP
  useEffect(() => {
    if (!slidesContainerRef.current) return;

    setIsTransitioning(true);
    
    // Calculate the correct translation based on slide width
    // Each slide takes up 100 / recentBlogs.length % of the container
    const slideWidth = 100 / recentBlogs.length;
    const translateX = -currentSlide * slideWidth;
    
    // Set initial position if first render
    if (currentSlide === 0) {
      gsap.set(slidesContainerRef.current, { x: '0%' });
    }
    
    gsap.to(slidesContainerRef.current, {
      x: `${translateX}%`,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        setIsTransitioning(false);
      },
    });
  }, [currentSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % recentBlogs.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + recentBlogs.length) % recentBlogs.length);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section
      ref={containerRef}
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-10 lg:py-12 bg-background font-display"
    >
      {/* Header Section */}
      <header
        ref={headerRef}
        className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center mb-6 sm:mb-8"
      >
        <hr
          ref={lineRef}
          className="w-[15px] sm:w-[25px] md:w-[60px] lg:w-[100px] xl:w-[155px] bg-secondary border-primary h-0.5"
        />
        <h2
          ref={titleRef}
          className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase text-primary"
        >
          Read Our Blog
        </h2>
      </header>

      {/* Slider Container */}
      <div
        ref={sliderWrapperRef}
        className="relative w-full max-w-6xl mx-auto"
      >
        {/* Slides Wrapper with overflow hidden */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          {/* Slides Container - moves horizontally */}
          <div
            ref={slidesContainerRef}
            className="flex"
            style={{ width: `${recentBlogs.length * 100}%` }}
          >
            {recentBlogs.map((blog, index) => (
              <Link
                key={blog.id}
                href={`/blog?post=${blog.id}`}
                className="block w-full flex-shrink-0 group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ width: `${100 / recentBlogs.length}%` }}
              >
                <div className="flex flex-col md:flex-row h-[400px] sm:h-[450px] md:h-[500px]">
                  {/* Left Side - Content */}
                  <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 bg-background">
                    {/* Category Badge */}
                    <div className="mb-3 sm:mb-4">
                      <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-accent text-muted rounded-full font-semibold text-xs sm:text-sm">
                        {blog.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4 leading-tight line-clamp-2 group-hover:text-accent transition-colors duration-300">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-5 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                      <span>{formatDate(blog.date)}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>

                    {/* Read More Button */}
                    <div className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-muted font-semibold py-2.5 px-5 sm:py-3 sm:px-6 rounded-full transition-all duration-300 text-sm sm:text-base shadow-md hover:shadow-lg group-hover:scale-105 w-fit">
                      <span>Read More</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Right Side - Image */}
                  <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-full relative overflow-hidden bg-gray-200">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
          disabled={isTransitioning}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white backdrop-blur-sm text-primary p-2.5 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
          disabled={isTransitioning}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white backdrop-blur-sm text-primary p-2.5 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {recentBlogs.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                goToSlide(index);
              }}
              disabled={isTransitioning}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "bg-accent w-8 h-2.5"
                  : "bg-white/60 hover:bg-white/80 w-2.5 h-2.5"
              } disabled:cursor-not-allowed`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReadOurBlog;
