"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/safaris", label: "Safaris" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Nav(): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const navItemsRef = useRef<HTMLLIElement[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const navItems = navItemsRef.current;
    const overlay = overlayRef.current;

    if (open) {
      // Opening animation
      const tl = gsap.timeline();

      // Set initial states
      gsap.set(menu, { y: "-100%", opacity: 0 });
      gsap.set(navItems, { y: -30, opacity: 0 });
      gsap.set(overlay, { opacity: 0 });

      // Animate menu container
      tl.to(menu, {
        y: "0%",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
        // Animate overlay
        .to(
          overlay,
          {
            opacity: 1,
            duration: 0.3,
          },
          0.1
        )
        // Stagger animate nav items
        .to(
          navItems,
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
          },
          0.2
        );
    } else {
      // Closing animation
      const tl = gsap.timeline();

      tl.to(navItems, {
        y: -20,
        opacity: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in",
      })
        .to(
          overlay,
          {
            opacity: 0,
            duration: 0.2,
          },
          0.1
        )
        .to(
          menu,
          {
            y: "-100%",
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          0.2
        );
    }
  }, [open]);

  // Add refs to nav items
  const addToRefs = (el: HTMLLIElement | null): void => {
    if (el && !navItemsRef.current.includes(el)) {
      navItemsRef.current.push(el);
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 md:px-12 font-display text-secondary absolute z-50">
      {/* LOGO */}
      <Image
        src="/Images/logo.png"
        width={50}
        height={50}
        alt="Nimal Safari Logo"
        className="z-20 relative"
      />

      {/* HAMBURGER */}
      <button
        className="md:hidden text-primary z-20 relative"
        aria-label="Toggle menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <svg
            className="w-6 h-6 transition-transform duration-300 rotate-180"
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
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            stroke="white"
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

      {/* OVERLAY (for mobile) */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm md:hidden z-10 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* DESKTOP LINKS */}
      <ul className="hidden md:flex md:flex-row md:gap-14">
        {navItems.map(({ href, label }) => (
          <li
            key={href}
            className="relative cursor-pointer font-body font-medium md:text-lg
              after:absolute after:bottom-1 after:left-0
              after:h-[2px] after:w-0 after:bg-primary
              after:transition-all after:duration-300 hover:after:w-full"
          >
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>

      {/* MOBILE LINKS */}
      <ul
        ref={menuRef}
        className={`flex flex-col md:hidden fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-black via-black/95 to-black/90 pt-24 px-6 z-15 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {navItems.map(({ href, label }) => (
          <li
            key={href}
            ref={addToRefs}
            className="relative cursor-pointer font-body font-medium text-2xl py-4 border-b border-secondary/20 last:border-b-0
              hover:text-primary transition-colors duration-300"
          >
            <Link
              href={href}
              onClick={() => setOpen(false)}
              className="block w-full h-full"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
