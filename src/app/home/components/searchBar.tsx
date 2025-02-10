"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PriceFilter from "@/app/components/priceFilter";
import { FaMapMarkerAlt } from "react-icons/fa";

const SearchBar: React.FC = () => {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const [isPriceError, setIsPriceError] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    if (minPrice !== 0 && maxPrice !== 0) {
      setIsPriceError(minPrice < 1000 || maxPrice < minPrice);
    } else {
      setIsPriceError(false);
    }
  }, [minPrice, maxPrice]);

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLocation(event.target.value);
  };

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (minPrice !== 0) query.append("minPrice", minPrice.toString());
    if (maxPrice !== 0) query.append("maxPrice", maxPrice.toString());
    if (selectedLocation) query.append("location", selectedLocation);
    router.push(`/search?${query.toString()}`);
  };

  return (
    <div className="w-full px-8 mt-2">
      <div className="bg-white w-4/5 py-2 px-6 shadow-2xl drop-shadow-2xl rounded-lg mx-auto">
        <div className="flex w-full flex-col sm:flex-row items-center justify-between relative gap-2">
          {/* Property Tab */}
          <div className="absolute -top-10 px-10 left-1/2 transform -translate-x-1/2 bg-primary text-white py-1.5 rounded-t-3xl text-sm">
            Property
          </div>
          {/* Location Input */}
          <div className="w-full flex flex-row justify-center items-center sm:flex-col gap-8 sm:gap-2 px-4 sm:py-2 rounded-lg flex-grow">
            <label className="w-1/2 sm:w-full flex justify-end sm:justify-start text-sm font-medium text-gray-600">
              Lokasi
            </label>
            <div className="w-full flex items-center gap-2 ">
              <FaMapMarkerAlt className="text-primary text-lg" />
              <select
                className="w-full bg-transparent text-black outline-none text-sm font-medium"
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value="" disabled>
                  Select option
                </option>
                <option value="jakarta">Jakarta</option>
                <option value="bandung">Bandung</option>
              </select>
            </div>
          </div>
          <div className="sm:h-12 sm:w-[1px] hidden sm:flex sm:mx-4 w-3/4 h-1 bg-gray-400"></div>
          <hr className="sm:hidden w-full bg-gray-400" />
          {/* Price Filter */}
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
          {/* Search Button */}
          <button
            disabled={isPriceError}
            onClick={handleSearch}
            className={`bg-primary w-full sm:w-1/2 text-white px-4 py-2 rounded-lg ${
              isPriceError ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Cari Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
