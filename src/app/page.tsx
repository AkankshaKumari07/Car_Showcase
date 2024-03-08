import "tailwindcss/tailwind.css";
import HeroSection from "./components/Hero";
import SearchBar from "./components/SearchBar";
import CustomFilter from "./components/CustomFilter";
import { fetchCars } from "./utils";
import CarCard from "./components/CarCard";

export default async function Home() {
  const allCars = await fetchCars();
  console.log(allCars)

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <div
        className="mt-12 sm:px-16 px-6 py-4 max-w-[1440px] mx-auto"
        id="discover"
      >
        <div className="hflex flex-col items-start justify-start gap-y-2.5 text-black-100">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p className=" mt-4">Explore the cars you might like</p>
        </div>
        <div className="mt-12 w-full flex flex-between items-center flex-wrap gap-5">
          <SearchBar />
          <div className="flex justify-start flex-wrap items-center gap-2">
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="grid 2xl:grid-cols-3z xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
              {allCars?.map((car,index) => (
                <CarCard car={car} key={index} index={index}/>
              ))}
            </div>
          </section>
        ) : (
          <div className="mt-16 flex justify-center items-center flex-col gap-2">
            <h2 className="text-black text-xl">Oops no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
