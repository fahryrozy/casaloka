"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PriceFilter from "@app/components/priceFilter";
import { FaMapMarkerAlt } from "react-icons/fa";
import { fetchProvinces } from "@utils/api/services/regionService";
import useStore from "@store/useStore"; // Import the Zustand store
import { formatCapitalize } from "@utils/formatCapitalize";

interface Province {
  code: string;
  name: string;
}

const SearchBar: React.FC = () => {
  const router = useRouter();
  const {
    selectedLocation,
    setSelectedLocation,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  } = useStore(); // Use Zustand store
  const [provinces, setProvinces] = useState<Province[]>([]);

  const [isPriceError, setIsPriceError] = useState<boolean>(false);

  useEffect(() => {
    if (minPrice !== 0 && maxPrice !== 0) {
      setIsPriceError(minPrice < 1000 || maxPrice < minPrice);
    } else {
      setIsPriceError(false);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    const fetchProvincesData = async () => {
      try {
        const data = await fetchProvinces();
        const filteredProvinces = data.filter((province) =>
          ["31", "32", "36"].includes(province.code)
        );
        setProvinces(filteredProvinces);
      } catch (error) {
        throw error;
      }
    };

    fetchProvincesData();
  }, []);

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLocation(event.target.value);
  };

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (minPrice !== 0) query.append("minPrice", minPrice.toString());
    if (maxPrice !== 0) query.append("maxPrice", maxPrice.toString());
    if (selectedLocation) query.append("loc", selectedLocation);
    router.push(`/search`);
  };

  return (
    <div className="w-full px-8 mt-2">
      <div className="bg-white w-4/5 py-2 px-6 shadow-2xl drop-shadow-2xl rounded-lg mx-auto">
        <div className="flex w-full flex-col sm:flex-row items-center justify-between relative gap-2">
          <div className="absolute -top-10 px-10 left-1/2 transform -translate-x-1/2 bg-primary text-white py-1.5 rounded-t-3xl text-sm">
            Property
          </div>
          <div className="w-full flex flex-row justify-center items-center sm:flex-col gap-8 sm:gap-2 px-4 sm:py-2 rounded-lg flex-grow">
            <label className="w-1/2 sm:w-full flex justify-end sm:justify-start text-sm font-medium text-gray-600">
              Lokasi
            </label>
            <div className="w-full flex items-center gap-2 ">
              <FaMapMarkerAlt className="text-primary text-base" />
              <select
                className="w-full bg-transparent text-black outline-none text-sm font-medium"
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value="" disabled>
                  Select option
                </option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {formatCapitalize(province.name)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="sm:h-12 sm:w-[1px] hidden sm:flex sm:mx-4 w-3/4 h-1 bg-gray-400"></div>
          <hr className="sm:hidden w-full bg-gray-400" />
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
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
