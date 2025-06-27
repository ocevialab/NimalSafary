"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion, Variants } from "framer-motion";

interface SafariItem {
  id: number;
  img: string;
  title: string;
  link: string;
}

function Popular(): React.JSX.Element {
  const popularSafaris: SafariItem[] = [
    {
      id: 1,
      img: "/images/popular1.webp",
      title: "Yala National Park Safari",
      link: "/popular/1/yala_national_park",
    },
    {
      id: 2,
      img: "/images/popular2.webp",
      title: "Udawala National Park Safari",
      link: "/popular/2/udawala_national_park",
    },
    {
      id: 3,
      img: "/images/popular3.webp",
      title: "Bundala Nation Park Safari",
      link: "/popular/3/bundala_national_park",
    },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const lineVariants: Variants = {
    hidden: {
      width: 0,
      opacity: 0,
    },
    visible: {
      width: "10%",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants: Variants = {
    hidden: {
      scale: 1.2,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const overlayVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.3,
      },
    },
  };

  const titleTextVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-10 lg:py-12 bg-background font-display h-fit block ">
      {/* Header Section */}
      <motion.div
        className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center mb-6 sm:mb-8 md:mb-8 "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.hr
          className="w-[15px] sm:w-[25px] md:w-[60px] lg:w-[100px] xl:w-[155px] bg-secondary border-primary"
          variants={lineVariants}
        />
        <motion.h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl capitalize text-primary "
          variants={titleVariants}
        >
          Popular among visitors
        </motion.h2>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-primary text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl w-full mb-6 sm:mb-8 md:mb-8  leading-normal"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={textVariants}
      >
        A safari in Sri Lanka offers an unforgettable mix of thrilling wildlife
        encounters, breathtaking landscapes, and rich biodiversity. These are
        some of the most popular safari experiences loved by visitors from
        around the world. Discover what makes each park unique.
      </motion.p>

      {/* Safari Cards - Fully responsive grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {popularSafaris.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
            className="w-full aspect-[4/5] sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[4/5] rounded-lg sm:rounded-xl relative block overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <Link href={item.link} className="block w-full h-full">
              <motion.div
                variants={imageVariants}
                className="w-full h-full relative"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 33vw, 450px"
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300"
                variants={overlayVariants}
              />

              <motion.h3
                className="text-white text-xs sm:text-sm  lg:text-lg xl:text-xl  m-2 sm:m-3 md:m-4 absolute left-0 bottom-0 z-10 group-hover:text-yellow-300 transition-colors duration-300 leading-tight drop-shadow-lg"
                variants={titleTextVariants}
              >
                {item.title}
              </motion.h3>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Popular;
