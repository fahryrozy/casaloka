"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchBar: React.FC = () => {
  const router = useRouter();
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);

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
              <span className="text-primary text-lg">📍</span>
              <select
                className="w-full bg-transparent text-black outline-none text-sm font-medium"
                defaultValue=""
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
          <div className="w-full flex flex-row justify-center sm:flex-col items-center gap-8 sm:gap-2 relative flex-grow">
            <label className=" flex w-1/2 sm:w-full items-center justify-end sm:justify-start text-sm font-medium text-gray-600">
              Harga
            </label>
            <button
              type="button"
              className="flex gap-2 items-center w-full text-left text-sm font-medium"
              onClick={() => setPriceDropdownOpen(!priceDropdownOpen)}
            >
              <span className="text-blue-600 text-lg">🏠</span>
              Atur Harga
            </button>
            {priceDropdownOpen && (
              <div className="flex flex-row gap-2 absolute top-full mt-4 left-0 bg-white shadow-lg border rounded-lg p-4 z-10 w-full">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                />
              </div>
            )}
          </div>
          {/* Search Button */}
          <button
            onClick={() => router.push("/search")}
            className="bg-primary w-full sm:w-1/2 text-white px-4 py-2 rounded-lg"
          >
            Cari Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
