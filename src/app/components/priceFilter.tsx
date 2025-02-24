"use client";

import React, { useState, useEffect, useRef } from "react";
import { formatCurrency } from "@utils/formatCurrency";
import Image from "next/image";
import { FaTag } from "react-icons/fa";
import BackSpace from "@assets/icons/backspace.svg";

interface PriceFilterProps {
  showLabel?: boolean;
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  showLabel = true,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => {
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value.replace(/[^0-9]/g, ""));
    setMinPrice(value);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value.replace(/[^0-9]/g, ""));
    setMaxPrice(value);
  };

  const clearPrices = () => {
    setMinPrice(0);
    setMaxPrice(0);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setPriceDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex flex-row justify-center sm:flex-col items-center gap-8 sm:gap-2 relative flex-grow">
      {showLabel && (
        <label className=" flex w-1/2 sm:w-full items-center justify-end sm:justify-start text-sm font-medium text-gray-600">
          Harga
        </label>
      )}
      <div className="flex items-center gap-2 w-full">
        <button
          type="button"
          className="flex gap-2 items-center w-full text-left text-sm font-medium"
          onClick={() => setPriceDropdownOpen(!priceDropdownOpen)}
        >
          <FaTag className="text-blue-600 text-base" />
          {(minPrice && minPrice !== 0) || (maxPrice && maxPrice !== 0)
            ? `${formatCurrency(minPrice.toString())} s/d ${formatCurrency(
                maxPrice.toString()
              )}`
            : "Atur Harga"}
        </button>
        {minPrice !== 0 && maxPrice !== 0 && (
          <button type="button" className="w-10 text-sm" onClick={clearPrices}>
            <Image src={BackSpace} alt="Clear" width={16} height={16} />
          </button>
        )}
      </div>
      {priceDropdownOpen && (
        <div
          ref={dropdownRef}
          className="w-full flex flex-row gap-2 absolute top-full mt-4 left-0 bg-white shadow-lg border rounded-lg p-4 z-10"
        >
          <input
            type="text"
            placeholder="Min"
            value={formatCurrency(minPrice.toString())}
            onChange={handleMinChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            min={1000000}
            step={100}
          />
          <input
            type="text"
            placeholder="Max"
            value={maxPrice !== null ? formatCurrency(maxPrice.toString()) : ""}
            onChange={handleMaxChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            min={minPrice}
            step={100}
          />
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
