"use client";
import React from "react";
import CustomButton from "./CustomButton";
import Image from "next/image";

const HeroSection = () => {
  const handleScroll = () => {};
  return (
    <div className="flex xl:flex-row flex-col gap-5 relative z-0 max-w-[1440px] mx-auto">
      <div className="flex-1 pt-36 px-5">
        <h1 className="2xl:text-7xl sm:text-5xl text-4xl font-extrabold">
          Find, book, or rent a car - quickly and easily!
        </h1>
        <p className="text-[27px] text-black-100 font-light mt-5">
          Streamline your car rental experience with our effortless booking
          process.
        </p>
        <CustomButton
          title="Explore Cars"
          containerStyles="bg-[#2B59FF] text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>
      <div className="xl:flex-[1.5] flex justify-end items-end w-full xl:h-screen mt-20">
    
        <div className="relative xl:w-full w-[90%] xl:h-full h-[590px] z-0">
          <Image
            src="/images/hero.png"
            alt="hero_png_image"
          fill
          className="object-contain"
          />
           </div>
          <div className="absolute xl:-top-24 xl:-right-1/2 -right-1/4 bg-repeat-round -z-10 w-full xl:h-screen h-[590px] overflow-hidden">
            <Image src="/images/hero-bg.png" alt="hero bg" fill/>
          </div>
      </div>
    </div>
  );
};

export default HeroSection;
