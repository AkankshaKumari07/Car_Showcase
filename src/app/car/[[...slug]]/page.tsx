"use client";
import React, { useEffect, useState } from "react";
import { CarProps } from "../../types";
import { fetchCars, generateCarImageUrl } from "@/app/utils";
import Image from "next/image";

const Singlepage = ({ params }: any) => {
  const [carData, setCarData] = useState<CarProps[]>([]);

  // Fetch car data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const cars = await fetchCars();
      setCarData(cars);
    };

    fetchData();
  }, []);

  const index = params.slug[0];
  const carIndex = Number(index);
  const carName = params.slug[1];

  const car = carData[carIndex];

  if (isNaN(carIndex) || carIndex < 0 || carIndex >= carData.length) {
    // Handle cases where the index is invalid
    return <div>Invalid car index</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="mt-[97px] h-[800px] w-[1400px]">
        <Image
          src="/images/pattern.png"
          alt="bg"
         fill
           objectFit="contain"
        />
        <div className="relative rounded-lg flex flex-col justify-center items-center ">
          <Image
            src={generateCarImageUrl(car)}
            alt="car"
            width={900}
            height={500}
            objectFit="contain"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="relative rounded-lg flex flex-col justify-center items-center">
            <Image
              src={generateCarImageUrl(car, "29")}
              alt="car"
              width={400}
              height={200}
              objectFit="contain"
            />
          </div>
          <div className="relative rounded-lg flex flex-col justify-center items-center">
            <Image
              src={generateCarImageUrl(car, "33")}
              alt="car"
              width={400}
              height={200}
              objectFit="contain"
            />
          </div>
          <div className="relative rounded-lg flex flex-col justify-center items-center">
            <Image
              src={generateCarImageUrl(car, "13")}
              alt="car"
              width={400}
              height={200}
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      <div className="h-auto text-center mt-16">
        <h2 className="font-extrabold text-6xl capitalize">
          {car.make} {car.model}
        </h2>
        <div className="flex justify-center items-center mt-10 mb-10">
          <div className="w-[840px] p-4 rounded-lg shadow-lg bg-white ">
            {Object.entries(car).map(([key, value]) => (
              <div className="flex text-2xl justify-between mb-5" key={key}>
                <h4 className="text-gray-600 text-2xl w-1/2 text-left capitalize">
                  <span className="font-semibold">
                    {key.split("_").join(" ")}
                  </span>
                </h4>
                <p className="text-gray-600 text-2xl w-1/2 text-right font-bold">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singlepage;
