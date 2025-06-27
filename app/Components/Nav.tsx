"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/safaris", label: "Safaris" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 md:px-12 font-display text-secondary relative z-10 bg-transparent">
      {/* LOGO */}
      <Image
        src="/images/logo.png"
        width={50}
        height={50}
        alt="Nimal Safari Logo"
        className="z-20"
      />

      {/* HAMBURGER */}
      <button
        className="md:hidden text-primary"
        aria-label="Toggle menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
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
            stroke="currentColor"
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

      {/* LINKS */}
      <ul
        className={`flex flex-col md:flex-row md:gap-14 md:static absolute bg-background md:bg-transparent w-full md:w-auto left-0 ${
          open ? "top-full" : "top-[-500px]"
        } transition-all duration-300 md:transition-none`}
      >
        {navItems.map(({ href, label }) => (
          <li
            key={href}
            className="relative cursor-pointer font-body font-medium md:text-lg px-6 py-3 md:py-0
              after:absolute after:bottom-1 after:left-0
              after:h-[2px] after:w-0 after:bg-primary
              after:transition-all after:duration-300 hover:after:w-full"
          >
            <Link href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
