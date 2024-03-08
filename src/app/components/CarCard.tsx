"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { CarProps } from "../types";
import CustomButton from "./CustomButton";
import { calculateCarRent, generateCarImageUrl } from "../utils";
import Link from "next/link";

interface CarCardProps {
  car: CarProps;
  index: number;
}

const steeringWheel = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
    d="M10 0C4.49383 0 0 4.4941 0 10C0 15.5063 4.4941 20 10 20C15.5063 20 20 15.5059 20 10C20 4.49383 15.5059 0 10 0ZM10 2.38281C13.8017 2.38281 16.9617 5.18234 17.527 8.82812H15.495C14.2067 8.82812 12.9826 8.31113 12.1367 7.40973C10.9805 6.17746 9.01965 6.17707 7.86328 7.40969C7.01738 8.31113 5.79332 8.82812 4.50492 8.82812H2.47297C3.03832 5.18234 6.19832 2.38281 10 2.38281ZM10 12.3438C9.03078 12.3438 8.24219 11.5552 8.24219 10.5859C8.24219 9.61664 9.03078 8.82812 10 8.82812C10.9693 8.82812 11.7578 9.61664 11.7578 10.5859C11.7578 11.5552 10.9693 12.3438 10 12.3438ZM2.90703 12.7772C3.57773 12.5141 4.06203 12.3438 4.72656 12.3438C6.86281 12.3438 8.52418 14.2474 8.20238 16.3863H8.20102C8.1532 16.7137 8.05914 17.0309 7.92348 17.3295C5.6282 16.6783 3.77074 14.9755 2.90703 12.7772ZM12.077 17.3293C11.9376 17.0229 11.8456 16.7057 11.799 16.3863H11.7976C11.4227 13.8939 13.7234 11.8374 16.1083 12.4435C16.3597 12.5074 16.6743 12.613 17.0929 12.7773C16.2293 14.9754 14.372 16.6781 12.077 17.3293Z"
    fill="#5D5FC0" />
</svg>`;

const tireImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path fill="#FF905E"
    d="M320 0H192V41.3c-14.9 4.4-29.1 10.4-42.6 17.6L120.2 29.7 29.7 120.2l29.2 29.2c-7.3 13.4-13.2 27.7-17.6 42.6H0V320H41.3c4.4 14.9 10.4 29.1 17.6 42.6L29.7 391.8l90.5 90.5 29.2-29.2c13.4 7.3 27.7 13.2 42.6 17.6V512H320V470.7c14.9-4.4 29.1-10.4 42.6-17.6l29.2 29.2 90.5-90.5-29.2-29.2c7.3-13.4 13.2-27.7 17.6-42.6H512V192H470.7c-4.4-14.9-10.4-29.1-17.6-42.6l29.2-29.2L391.8 29.7 362.6 58.9c-13.4-7.3-27.7-13.2-42.6-17.6V0zM256 128a128 128 0 1 1 0 256 128 128 0 1 1 0-256zm0 80a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm-61.1 2.9a24 24 0 1 0 -14.8 45.7 24 24 0 1 0 14.8-45.7zm106.7 30.2a24 24 0 1 0 45.7-14.8 24 24 0 1 0 -45.7 14.8zm-22.7 87.2a24 24 0 1 0 38.8-28.2 24 24 0 1 0 -38.8 28.2zm-51.1-33.5a24 24 0 1 0 -28.2 38.8 24 24 0 1 0 28.2-38.8z" />
</svg>`;
const gasImage = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.8431 5.30944H16.6212L16.0575 3.72046C16.0039 3.56928 15.8829 3.4516 15.7302 3.40239L15.0039 3.16784C14.7328 3.08026 14.4425 3.22899 14.3551 3.49984C14.2676 3.77075 14.4163 4.06124 14.6871 4.14863L15.1711 4.30497L15.5274 5.30941H15.3743C15.273 5.30941 15.181 5.36882 15.1393 5.46134L14.7215 6.38915C14.7046 6.42676 14.6969 6.46797 14.6992 6.50915L14.8564 9.34366C14.864 9.4802 14.9769 9.58706 15.1137 9.58706H15.2743V15.7318C15.2743 16.4175 14.8849 17.0136 14.3159 17.3116V13.4788C14.3159 13.1015 14.1798 12.7555 13.9544 12.4867V1.92049C13.9545 0.861536 13.093 0 12.034 0H3.157C2.09804 0 1.23657 0.861536 1.23657 1.92049V12.4866C1.01114 12.7553 0.875 13.1013 0.875 13.4787V18.4538C0.875 19.3064 1.56863 20 2.42125 20H12.7697C13.5403 20 14.1808 19.4335 14.297 18.6951C15.6009 18.3403 16.5628 17.1466 16.5628 15.7318V9.58712H16.8431C16.9854 9.58712 17.1008 9.47176 17.1008 9.32944V5.56719C17.1008 5.42487 16.9854 5.30944 16.8431 5.30944ZM7.59548 14.0523C6.38842 14.0523 5.40988 13.0737 5.40988 11.8667C5.40988 10.6596 7.59548 8.35016 7.59548 8.35016C7.59548 8.35016 9.78101 10.6597 9.78101 11.8667C9.78101 13.0737 8.80244 14.0523 7.59548 14.0523ZM11.893 5.51458H3.29808V2.0615H11.893V5.51458V5.51458Z" fill="#47AE58"/>
</svg>
`;
const rightIcon = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.3">
<path d="M20 0H10C4.47715 0 0 4.47715 0 10V20C0 25.5228 4.47715 30 10 30H20C25.5228 30 30 25.5228 30 20V10C30 4.47715 25.5228 0 20 0Z" fill="white"/>
</g>
<path d="M9.1667 15H20.8334" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6667 10.8331L20.8334 14.9998L16.6667 19.1665" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const CarCard = ({ car, index }: CarCardProps) => {
  const {
    city_mpg,
    combination_mpg,
    cylinders,
    displacement,
    drive,
    fuel_type,
    highway_mpg,
    make,
    model,
    transmission,
    year,
  } = car;

  const carRent = calculateCarRent(city_mpg, year);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col p-6 justify-center items-start text-black bg-blue-100 hover:bg-white hover:shadow-md rounded-3xl group">
      <div className="w-full flex justify-between items-start gap-2 font-bold">
        <h2 className="text-[22px] leading-[26px] font-bold capitalize">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}

        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image src={generateCarImageUrl(car)} alt="car model" priority fill />
      </div>
      <div className="relative flex w-full mt-2 ">
        <div className="flex group-hover:invisible w-full justify-between text-gray-700">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={`data:image/svg+xml;base64,${btoa(steeringWheel)}`}
              alt="steering wheel"
              height={20}
              width={20}
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={`data:image/svg+xml;base64,${btoa(tireImage)}`}
              alt="tire"
              height={20}
              width={20}
            />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={`data:image/svg+xml;base64,${btoa(gasImage)}`}
              alt="gas Image"
              height={20}
              width={20}
            />
            <p className="text-[14px]">{city_mpg}MPG</p>
          </div>
        </div>
        <div className="hidden group-hover:flex absolute bottom-0 w-full z-10">
          <Link href={`/car/[index]`} as={`/car/${index}`} className="w-full">
            <CustomButton
              title="View More"
              containerStyles="w-full py-[16px] rounded-full bg-[#2B59FF]"
              textStyles="text-white text-[14px] leading-[17px] font-bold"
              rightIcon={`data:image/svg+xml;base64,${btoa(rightIcon)}`}
              handleClick={() => setIsOpen(true)}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
