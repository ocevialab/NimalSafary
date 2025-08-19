"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "../Components/Nav";
import { FaWhatsapp } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import Image from "next/image";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ContactPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contactItemsRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([headerRef.current, mapRef.current], {
        opacity: 0,
        y: 50,
      });

      // Get contact items and set them individually
      const contactItems =
        contactItemsRef.current?.querySelectorAll(".contact-item");
      if (contactItems) {
        gsap.set(contactItems, {
          opacity: 0,
          y: 30,
        });
      }

      // Header animation
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Contact items animation
      if (contactItems) {
        gsap.to(contactItems, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.6,
        });
      }

      // Map animation
      gsap.to(mapRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Hover animations for contact items
      if (contactItems) {
        contactItems.forEach((item) => {
          const element = item as HTMLElement;

          element.addEventListener("mouseenter", () => {
            gsap.to(element, {
              x: 10,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          element.addEventListener("mouseleave", () => {
            gsap.to(element, {
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }

      // Map hover effect
      if (mapRef.current) {
        const mapElement = mapRef.current;

        mapElement.addEventListener("mouseenter", () => {
          gsap.to(mapElement, {
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        mapElement.addEventListener("mouseleave", () => {
          gsap.to(mapElement, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      }
    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <>
      <Nav textcolor="text-black" />
      <section
        ref={containerRef}
        className="w-full px-6 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-8 bg-background font-display overflow-hidden"
      >
        <div ref={headerRef} className="lg:w-1/2 w-full flex flex-col gap-2">
          <h1 className="lg:text-6xl text-3xl xl:mt-30 mt-20 font-bold">
            We&#39;re Here To Help!
          </h1>
          <p className="md:text-xl text-lg lg:pr-24 pr-4">
            Whether you have questions, need help choosing the right safari, or
            are ready to book your adventure, our team is here to assist you
            every step of the way.
          </p>
        </div>

        <div className="flex md:flex-row flex-col justify-between xl:mt-12 lg:mt-10 md:mt-8 sm:mt-6 mt-4 xl:gap-8 lg:gap-6 md:gap-4 sm:gap-2 gap-1">
          <div
            ref={contactItemsRef}
            className="md:w-1/2 w-full flex flex-col xl:gap-8 lg:gap-6 md:gap-4 sm:gap-2 gap-1 justify-between my-8"
          >
            <div className="contact-item flex flex-row lg:gap-12 gap-4 cursor-pointer">
              <IoMailOutline className="lg:text-2xl text-xl" />
              <p className="lg:text-xl text-lg">nimalsafariyala@gmail.com</p>
            </div>

            <div className="contact-item flex flex-row lg:gap-12 gap-4 cursor-pointer">
              <FiPhoneCall className="lg:text-2xl text-xl" />
              <p className="lg:text-xl text-lg">+94767627295</p>
            </div>

            <div className="contact-item flex flex-row lg:gap-12 gap-4 cursor-pointer">
              <FaWhatsapp className="lg:text-2xl text-xl" />
              <p className="lg:text-xl text-lg">+94767627295</p>
            </div>

            {/* <div className="contact-item flex flex-row lg:gap-12 gap-4 cursor-pointer">
              <FaInstagram className="lg:text-2xl text-xl" />
              <p className="lg:text-xl text-lg">@nimalsafari</p>
            </div> */}

            <div className="contact-item flex flex-row lg:gap-12 gap-4 cursor-pointer">
              <IoLocationOutline className="lg:text-2xl text-xl" />
              <p className="lg:text-xl text-lg">Tissamaharama, Sri Lanka</p>
            </div>
            <div className="w-full flex flex-row px-6 mt-4 justify-start gap-14">
              <div className="cursor-pointer hover:bg-amber-200 p-2 rounded-xl w-fit h-fit items-center">
                <a
                  href="https://web.facebook.com/profile.php?id=61579240436619"
                  className="flex flex-col justify-center items-center"
                >
                  <Image
                    src="/Images/facebook.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
              <div className="cursor-pointer hover:bg-amber-200 p-2 rounded-xl w-fit h-fit items-center">
                <a
                  href="https://www.instagram.com/nimalsafari?igsh=cGk0c3BuczhwYWpi&utm_source=ig_contact_invite"
                  className="flex flex-col justify-center items-center"
                >
                  <Image
                    src="/Images/insta.png"
                    alt="Instagram"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
              <div className="cursor-pointer hover:bg-amber-200 p-2 rounded-xl w-fit h-fit items-center">
                <a
                  href="https://www.tiktok.com/@nimalsafari?_t=ZS-8yhX4nqCP1l&_r=1"
                  className="flex flex-col justify-center items-center"
                >
                  <Image
                    src="/Images/tiktok.png"
                    alt="TikTok"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
              <div className="cursor-pointer hover:bg-amber-200 p-2 rounded-xl w-fit h-fit items-center">
                <a
                  href="https://www.pinterest.com/nimalsafariyala/"
                  className="flex flex-col justify-center items-center"
                >
                  <Image
                    src="/Images/pinterest.png"
                    alt="Pinterest"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
              <div className="cursor-pointer hover:bg-amber-200 p-2 rounded-xl w-fit h-fit items-center">
                <a
                  href="https://www.tripadvisor.com/Attraction_Review-g1102395-d5512904-Reviews-Nimal_Safari-Tissamaharama_Southern_Province.html"
                  className="flex flex-col justify-center items-center"
                >
                  <Image
                    src="/Images/trip.png"
                    alt="TripAdvisor"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            </div>
          </div>

          <div
            ref={mapRef}
            className="md:w-1/2 w-full h-[400px] rounded-2xl border-2 border-black cursor-pointer"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31726.68993695896!2d81.24724206370938!3d6.285245657899344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae69cf60fdb4ae7%3A0x85fb3380b084b28a!2sTissamaharama!5e0!3m2!1sen!2slk!4v1751290862996!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-2xl"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
