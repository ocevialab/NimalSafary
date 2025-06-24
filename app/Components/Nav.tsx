import React from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/safaris", label: "Safaris" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

function Nav() {
  return (
    <nav className="w-full flex justify-between items-center font-display font-medium text-lg relative text-secondary z-10 top-0 md:px-12 md:py-6">
      <Image
        src="/images/logo.png"
        width={50}
        height={50}
        alt="Nimal Safari Logo"
      />
      <ul className="flex gap-14">
        {navItems.map(({ href, label }) => (
          <li
            key={href}
            className="relative cursor-pointer font-body font-medium text-lg
              after:absolute after:bottom-0 after:left-0
              after:h-[2px] after:w-0 after:bg-secondary after:transition-all
              after:duration-300 after:ease-in-out hover:after:w-full"
          >
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
