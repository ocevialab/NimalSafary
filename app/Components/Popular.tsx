import Image from "next/image";
import Link from "next/link";
import React from "react";

function Popular() {
  const popularSafaris = [
    {
      id: 1,
      img: "/images/popular1.webp",
      title: "Yala National Park Safari",
      link: "/popular/1/yala_national_park", // Use actual ID
    },
    {
      id: 2,
      img: "/images/popular2.webp",
      title: "Udawala National Park Safari",
      link: "/popular/2/udawala_national_park", // Use actual ID
    },
    {
      id: 3,
      img: "/images/popular3.webp",
      title: "Bundala Nation Park Safari",
      link: "/popular/3/bundala_national_park", // Use actual ID
    },
  ];

  return (
    <div className="w-full md:px-12 px-6 md:py-12 py-6 bg-background font-display h-fit block absolute top-full">
      <div className="flex flex-row gap-3 items-center lg:mb-12 mb-6">
        <hr className="lg:w-[155px] w-[20px] md:w-[100px] bg-secondary border-primary"></hr>{" "}
        <h2 className="lg:text-4xl md:text-3xl text-2xl capitalize text-primary">
          Popular among visitors
        </h2>
      </div>
      <p className="text-primary lg:text-3xl md:text-2xl text-xl w-full lg:mb-12 mb-6">
        A safari in Sri Lanka offers an unforgettable mix of thrilling wildlife
        encounters, breathtaking landscapes, and rich biodiversity. These are
        some of the most popular safari experiences loved by visitors from
        around the world. Discover what makes each park unique.
      </p>
      <div className="flex flex-wrap gap-4 justify-between">
        {popularSafaris.map((item, key) => (
          <Link
            key={key}
            className="w-[450px] h-[500px] rounded-xl relative block overflow-hidden"
            href={item.link}
          >
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover"
              sizes="450px"
            />
            <div className="absolute inset-0 bg-black/20"></div>{" "}
            {/* Optional overlay */}
            <h3 className="text-white lg:text-2xl text-xl m-3 absolute left-0 bottom-0 z-10">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Popular;
