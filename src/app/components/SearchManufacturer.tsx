"use client";
import React, { useState, Fragment } from "react";
import { SearchManufacturerProps } from "../types";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/legacy/image";
import { manufacturers } from "../constants";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const carLogo = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="32" height="32"
viewBox="0 0 32 32">
<path fill="#747A88" d="M16,3C8.832,3,3,8.832,3,16s5.832,13,13,13s13-5.832,13-13S23.168,3,16,3z M19.783,5.684l-3.708,7.881l-3.73-7.928	C13.491,5.232,14.717,5,16,5C17.331,5,18.601,5.25,19.783,5.684z M10.526,6.472L14.539,15h3.072l3.979-8.457	c1.322,0.785,2.466,1.835,3.357,3.082L19.836,21.56L17.691,17h-3.232l-2.145,4.56L7.148,9.497C8.052,8.27,9.2,7.237,10.526,6.472z M5,16c0-1.542,0.322-3.01,0.898-4.343l6.268,14.64C7.988,24.736,5,20.716,5,16z M12.276,26.337l3.799-8.073l3.777,8.027	C18.651,26.742,17.356,27,16,27C14.691,27,13.441,26.758,12.276,26.337z M20.011,26.232l6.164-14.397C26.704,13.121,27,14.526,27,16	C27,20.649,24.096,24.625,20.011,26.232z"></path>
</svg>`;

  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
      <div className="flex-1 max-sm:w-full flex justify-start items-center">
        <Combobox value={manufacturer} onChange={setManufacturer}>
          <div className="relative w-full">
            <Combobox.Button className="absolute top-[14px] ml-4">
              <Image
                src={`data:image/svg+xml;base64,${btoa(carLogo)}`}
                alt="carlogo"
                width={20}
                height={20}
              />
            </Combobox.Button>
            <Combobox.Input
              className=" w-full h-[48px] pl-12 p-4 bg-light-white rounded-r-full shadow-lg max-sm:rounded-full outline-none cursor-pointer text-sm"
              placeholder="Volkswagen..."
              displayValue={(manufacturer: string) => manufacturer}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options>
                {
                 filteredManufacturers.map((item)=>(
                  <Combobox.Option key={item}     className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? " bg-[#2B59FF] text-white" : "text-gray-900"
                  }`
                } value={item}>
                  {({selected,active})=>(
                    <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {item}
                    </span>
                      {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active? "text-white": " text-purple-600"}`}
                          ></span>
                        ) : null}
                      </>
                  )}
                </Combobox.Option>
                 )
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
 
  );
};

export default SearchManufacturer;
