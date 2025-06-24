import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <div
      className="w-screen h-screen absolute top-0  text-secondary "
      style={{
        backgroundImage: "url('/images/hero.webp')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex justify-between items-end font-display absolute w-full bottom-0 md:px-12 h-full md:py-8">
        <div className="w-2/5 h-fit  flex flex-col gap-2">
          <h1 className="text-7xl font-display font-semibold tracking-wide leading-18">
            Experience the <span className="text-accent">Wild</span> Like Never
            Before
          </h1>
          <p className="text-md pr-24">
            Join <span className="text-accent"> Nimal Safari </span>for
            unforgettable wildlife adventures in{" "}
            <span className="text-accent">Yala, Udawalawe, Bundala,</span> and
            more. Based in Tissamaharama , your gateway to Sri Lanka’s best
            national parks.
          </p>
          <div className="px-8 p-2 bg-accent w-fit h-fit text-muted font-medium rounded-lg mt-4">
            Book Your Safari Now
          </div>
        </div>
        <div className="w-fit h-fit p-2 bg-secondary/15 text-primary backdrop-opacity-10 backdrop-blur-2xl rounded-md flex flex-col gap-2">
          <div className="text-secondary flex justify-between">
            <Image
              src="/images/traveladvisor.png"
              width={24}
              height={24}
              alt="traveladvisorlog"
            />
            <h2></h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
