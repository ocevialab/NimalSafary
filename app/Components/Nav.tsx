import React from "react";
import Image from "next/image";
function Nav() {
  return (
    <nav className="w-full justify-between flex items-center font-display font-medium text-lg relative text-secondary z-10 top-0 md:px-12 h-full md:py-6">
      <Image
        src={"/images/logo.png"}
        width={50}
        height={50}
        alt="Namalsafari Logo"
      />

      <ul className="w-fit  flex justify-between list-none gap-14">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">Safaris</li>
        <li className="cursor-pointer">About Us</li>
        <li className="cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
}

export default Nav;
