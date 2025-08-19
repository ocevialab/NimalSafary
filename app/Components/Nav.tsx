"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

// nav items
const navItems = [
  { href: "/", label: "Home" },
  { href: "/safaris", label: "Safaris" },
  { href: "/aboutus", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

// socials
const socials = [
  {
    href: "https://web.facebook.com/profile.php?id=61579240436619",
    src: "/images/facebook.png",
    alt: "Facebook",
  },
  {
    href: "https://www.instagram.com/nimalsafari",
    src: "/images/insta.png",
    alt: "Instagram",
  },
  {
    href: "https://www.tiktok.com/@nimalsafari",
    src: "/images/tiktok.png",
    alt: "TikTok",
  },
  {
    href: "https://www.pinterest.com/nimalsafariyala/",
    src: "/images/pinterest.png",
    alt: "Pinterest",
  },
  {
    href: "https://www.tripadvisor.com/Attraction_Review-g1102395-d5512904-Reviews-Nimal_Safari-Tissamaharama_Southern_Province.html",
    src: "/images/trip.png",
    alt: "Tripadvisor",
  },
];

interface NavProps {
  textcolor: string;
}

export default function Nav({ textcolor }: NavProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const navItemsRef = useRef<HTMLLIElement[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const addToRefs = (el: HTMLLIElement | null) => {
    if (el && !navItemsRef.current.includes(el)) navItemsRef.current.push(el);
  };

  const openMenu = () => {
    if (
      !menuRef.current ||
      !overlayRef.current ||
      navItemsRef.current.length === 0
    )
      return;
    if (timelineRef.current) timelineRef.current.kill();

    gsap.set(menuRef.current, { y: "-100%", opacity: 0 });
    gsap.set(navItemsRef.current, { y: -30, opacity: 0 });
    gsap.set(overlayRef.current, { opacity: 0 });

    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.to(menuRef.current, {
      y: "0%",
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    })
      .to(overlayRef.current, { opacity: 1, duration: 0.3 }, 0.1)
      .to(
        navItemsRef.current,
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: "power2.out" },
        0.2
      );
  };

  const closeMenu = () => {
    if (
      !menuRef.current ||
      !overlayRef.current ||
      navItemsRef.current.length === 0
    )
      return;
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.to(navItemsRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.2,
      stagger: 0.05,
      ease: "power2.in",
    })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, 0.1)
      .to(
        menuRef.current,
        { y: "-100%", opacity: 0, duration: 0.3, ease: "power2.in" },
        0.2
      );
  };

  return (
    <nav
      className={`w-full flex items-center justify-between px-6 py-4 md:px-12 font-display ${
        textcolor ? textcolor : "text-secondary"
      } absolute z-50`}
    >
      {/* Logo + Nav links LEFT */}
      <div className="hidden md:flex items-center gap-10">
        <Image
          src="/Images/logo.png"
          width={50}
          height={50}
          alt="Nimal Safari Logo"
          className="z-20 relative"
        />
        <ul className="flex gap-8">
          {navItems.map(({ href, label }) => (
            <li
              key={href}
              className={`relative cursor-pointer font-body font-medium md:text-lg
                after:absolute after:bottom-1 after:left-0
                after:h-[2px] after:w-0  
                ${
                  textcolor === "text-black"
                    ? "after:bg-black"
                    : "after:bg-secondary"
                }
                after:transition-all after:duration-300 hover:after:w-full`}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Center nav links (optional keep, can remove if only left is needed) */}
      {/* 
      <ul className="hidden md:flex flex-1 justify-center gap-12">
        ...
      </ul>
      */}

      {/* Desktop socials + phone RIGHT */}
      <div className="hidden md:flex items-center gap-4">
        {socials.map(({ href, src, alt }) => (
          <a
            key={alt}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-[22px] h-[22px]    ${
              textcolor === "text-black"
                ? "inline-flex items-center justify-center w-9 h-9 rounded-xl hover:bg-white/10 transition"
                : "inline-flex items-center justify-center w-9 h-9 rounded-xl hover:bg-white/10 transition invert sepia saturate-200 hue-rotate-120"
            }`}
          >
            <Image src={src} alt={alt} width={20} height={20} />
          </a>
        ))}
        <a
          href="tel:+94767627295"
          className="ml-4 font-light hover:text-accent transition-colors"
        >
          +94 76 762 7295
        </a>
      </div>

      {/* Hamburger mobile */}
      <button
        className="md:hidden text-primary z-20 relative"
        onClick={() => (open ? closeMenu() : openMenu(), setOpen(!open))}
      >
        {open ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke={textcolor === "text-secondary" ? "white" : "black"}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm md:hidden z-10 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ opacity: 0 }}
        onClick={closeMenu}
      />

      {/* Mobile menu */}
      <ul
        ref={menuRef}
        className={`flex flex-col md:hidden fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-black via-black/95 to-black/90 pt-24 px-6 z-15 text-secondary ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ transform: "translateY(-100%)", opacity: 0 }}
      >
        {navItems.map(({ href, label }) => (
          <li
            key={href}
            ref={addToRefs}
            className="text-2xl py-4 border-b border-secondary/20 hover:text-accent transition-colors"
          >
            <Link href={href} onClick={closeMenu}>
              {label}
            </Link>
          </li>
        ))}

        {/* Mobile socials + phone */}
        <div className="mt-auto pb-10 pt-6 flex flex-col items-center gap-6">
          <div className="flex gap-4">
            {socials.map(({ href, src, alt }) => (
              <a
                key={alt}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10"
              >
                <Image src={src} alt={alt} width={26} height={26} />
              </a>
            ))}
          </div>
          <a
            href="tel:+94767627295"
            className="font-semibold hover:text-accent transition-colors text-lg"
          >
            +94 76 762 7295
          </a>
        </div>
      </ul>
    </nav>
  );
}
