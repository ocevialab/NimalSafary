// app/Components/Hero.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div
      className="w-full md:h-screen h-full absolute top-0 text-secondary bg-center bg-cover "
      style={{
        backgroundImage: "url('/images/hero.webp')",
      }}
    >
      <div className="absolute bottom-0 w-full md:px-12 px-6 md:py-8 py-4 flex md:flex-row flex-col md:justify-between md:items-end gap-4">
        <div className="md:w-2/5 w-4/5 flex flex-col gap-4 text-white">
          <motion.h1
            className="lg:text-7xl md:text-5xl text-3xl font-display font-semibold tracking-wide"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Experience the <span className="text-accent">Wild</span> Like Never
            Before
          </motion.h1>
          <motion.p
            className="md:text-md text-sm pr-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Join <span className="text-accent">Nimal Safari</span> for
            unforgettable wildlife adventures in{" "}
            <span className="text-accent">Yala, Udawalawe, Bundala</span>, and
            more. Based in Tissamaharama, your gateway to Sri Lanka’s best
            national parks.
          </motion.p>
          <motion.div
            className="px-8 py-2 bg-accent text-muted font-medium rounded-lg w-fit cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
            }}
            viewport={{ once: true, amount: 0.1 }}
          >
            Book Your Safari Now
          </motion.div>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Link
            className="w-fit h-fit p-4 bg-secondary/15 text-primary backdrop-opacity-10 backdrop-blur-2xl rounded-md flex flex-col gap-2 hover:drop-shadow-cyan-500/50 drop-shadow-sm  font-display "
            href={
              "https://www.tripadvisor.com/Attraction_Review-g1102395-d5512904-Reviews-Nimal_Safari-Tissamaharama_Southern_Province.html"
            }
            target="black"
          >
            <div className="text-secondary flex justify-between gap-10 items-center">
              <Image
                src="/images/traveladvisor.png"
                width={24}
                height={24}
                alt="traveladvisorlog"
                className="w-6 h-6 opacity-80"
              />
              <h2 className="text-xl font-bold text-secondary ">Tripadvisor</h2>
              <p className="text-xl font-bold text-accent">4.7</p>
            </div>
            <div className=" text-secondary text-sm mt-4">Sarah F</div>
            <div className="text-sm  font-light w-[300px] text-secondary  ">
              It was an amazing experience! We had a great driver and a lot of
              luck - got to see teo leopards, elephants, water buffalos,
              different deers and birds and a crocodile. The landscape is
              beautiful as well. Would recommend a full day safari with a lovely
              stop for lunch at the beach. Very well organised and memories for
              a lifetime!
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
