import React from "react";

function YouMustVisit() {
  // Animation variants

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-10 lg:py-12 bg-background font-display h-fit block ">
      {/* Header Section */}
      <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center mb-6 sm:mb-8 md:mb-8 ">
        <hr className="w-[15px] sm:w-[25px] md:w-[60px] lg:w-[100px] xl:w-[155px] bg-secondary border-primary" />
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl capitalize text-primary ">
          Popular among visitors
        </h2>
      </div>
      <div className="flex md:flex-row flex-col gap-4 w-full">
        <div className="w-1/2">
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1I53M-mqfiOy0Xr4HmEqh_t4cEu94C5w&ehbc=2E312F&noprof=1"
            width="640"
            height="480"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default YouMustVisit;
