"use client";
import Image from "next/image";
import SearchManufacturer from "./SearchManufacturer";
import { useState } from "react";
import  { useRouter } from "next/navigation";

const magnifying = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="20" fill="white"/>
<path d="M28 28L24.1333 24.1333M26.2222 19.1111C26.2222 23.0385 23.0385 26.2222 19.1111 26.2222C15.1838 26.2222 12 23.0385 12 19.1111C12 15.1838 15.1838 12 19.1111 12C23.0385 12 26.2222 15.1838 26.2222 19.1111Z" stroke="url(#paint0_linear_1_2)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_1_2" x1="4.76191" y1="9.71428" x2="48.9524" y2="39.0476" gradientUnits="userSpaceOnUse">
<stop stop-color="#5D5FC0"/>
<stop offset="1" stop-color="#FFD2CC"/>
</linearGradient>
</defs>
</svg>`;

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-11 z-10 ${otherClasses}`}>
    <Image
      src={`data:image/svg+xml;base64,${btoa(magnifying)}`}
      alt="search"
      width={40}
      height={40}
      objectFit="contain"
    />
  </button>
);

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [modal, setModal] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === "" && modal === "") {
      return alert("please fil in the search bar");
    }
    updateSearchParams(modal.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (modal: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (modal) {
      searchParams.set("modal", modal);
    } else {
      searchParams.delete("modal");
    }

    // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }
     
       // Generate the new pathname with the updated search parameters
       const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

       router.push(newPathname);
     }; 


  return (
    <form
      className="flex items-center justify-start max-sm:flex-col w-full relative max-sm:gap-4 max-w-3xl"
      onSubmit={handleSearch}
    >
      <div className="flex-1 max-sm:w-full flex justify-start items-center relative">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="flex-1 max-sm:w-full flex justify-start items-center relative ">
        <div className="absolute w-[20px] ml-4">
          <Image
            width={25}
            height={25}
            src="/images/model-icon.png"
            alt="car modal"
          />
        </div>
        <input
          type="text"
          name="modal"
          value={modal}
          onChange={(e) => setModal(e.target.value)}
          placeholder="Tiguan"
          className=" w-full h-[48px] pl-12 p-4 rounded shadow-lg max-sm:rounded-full outline-none cursor-pointer text-sm"
        />
        <SearchButton otherClasses="sm:hideen" />
   
      </div>
    </form>
  );
};

export default SearchBar;
