import React from "react";
import Nav from "../Components/Nav";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";

const page = () => {
  return (
    <>
      <Nav textcolor="text-black" />
      <section className="w-full px-6 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-8  bg-background font-display overflow-hidden ">
        <div className="lg:w-1/2 w-full flex flex-col gap-2">
          <h1 className="lg:text-6xl text-3xl xl:mt-30 mt-20 font-bold">
            We&#39;re Here To Help!
          </h1>
          <p className="md:text-xl text-lg lg:pr-24 pr-4 ">
            Whether you have questions, need help choosing the right safari, or
            are ready to book your adventure, our team is here to assist you
            every step of the way.
          </p>
        </div>
        <div className="flex md:flex-row flex-col justify-between xl:mt-12 lg:mt-10 md:mt-8 sm:mt-6 mt-4 xl:gap-8 lg:gap-6 md:gap-4 sm:gap-2 gap-1">
          <div className="md:w-1/2 w-full flex flex-col xl:gap-8 lg:gap-6 md:gap-4 sm:gap-2 gap-1 justify-between my-8">
            <div className="flex flex-row lg:gap-12 gap-4">
              <IoMailOutline className="lg:text-2xl text-xl" />
              <p className="lg:text-xl text-lg"> info@nimalsafari.com</p>
            </div>
            <div className="flex flex-row lg:gap-12 gap-4">
              <FiPhoneCall className="lg:text-2xl text-xl" />
              <p className="lg:text-xl text-lg gap-4">
                {" "}
                +94 xxx xxx xx / +94 xxx xxx xx
              </p>
            </div>
            <div className="flex flex-row lg:gap-12 gap-4">
              <FaWhatsapp className="lg:text-2xl text-xl " />
              <p className="lg:text-xl text-lg"> +94 xxx xxx xx</p>
            </div>
            <div className="flex flex-row lg:gap-12 gap-4">
              <FaInstagram className="lg:text-2xl text-xl" />
              <p className="lg:text-xl text-lg"> @nimalsafari</p>
            </div>
            <div className="flex flex-row lg:gap-12 gap-4">
              <IoLocationOutline className="lg:text-2xl text-xl" />
              <p className="lg:text-xl text-lg"> Tissamaharama, Sri Lanka</p>
            </div>
          </div>
          <div className="md:w-1/2 w-full h-[400px] rounded-2xl border-2 border-black ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31726.68993695896!2d81.24724206370938!3d6.285245657899344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae69cf60fdb4ae7%3A0x85fb3380b084b28a!2sTissamaharama!5e0!3m2!1sen!2slk!4v1751290862996!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-2xl "
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
