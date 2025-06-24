import React from "react";

function Hero() {
  return (
    <div
      className="w-screen h-screen absolute top-0 "
      style={{ backgroundImage: "url('/images/hero.png')" }}
    >
      <div className="flex justify-between items-end absolute w-full bottom-0 md:px-12 h-full md:py-6">
        <div className="w-1/3 h-fit p-4 bg-amber-200">text</div>
        <div className="w-fit h-fit p-4 bg-amber-200">review</div>
      </div>
    </div>
  );
}

export default Hero;
