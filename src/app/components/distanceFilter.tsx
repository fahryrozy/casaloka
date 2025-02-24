import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import BackSpace from "@assets/icons/backspace.svg";

interface DistanceFilterProps {
  distanceDropdownOpen: boolean;
  setDistanceDropdownOpen: (value: boolean) => void;
  selectedDistance: string;
  handleDistanceChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  clearDistance: () => void;
}

const DistanceFilter: React.FC<DistanceFilterProps> = ({
  selectedDistance,
  handleDistanceChange,
  clearDistance,
  distanceDropdownOpen,
  setDistanceDropdownOpen,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDistanceDropdownOpen(false);
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
      <div className="flex items-center gap-2 w-full">
        <button
          type="button"
          className="flex gap-2 items-center w-full text-left text-sm font-medium"
          onClick={() => setDistanceDropdownOpen(!distanceDropdownOpen)}
        >
          <FaMapMarkerAlt className="text-blue-600 text-base" />
          {selectedDistance ? `${selectedDistance} KM` : "Atur Jarak"}
        </button>
        {selectedDistance && (
          <button
            type="button"
            className="w-10 text-sm"
            onClick={clearDistance}
          >
            <Image src={BackSpace} alt="Clear" width={16} height={16} />
          </button>
        )}
      </div>
      {distanceDropdownOpen && (
        <div
          ref={dropdownRef}
          className="w-full flex flex-row gap-2 absolute top-full mt-4 left-0 bg-white shadow-lg border rounded-lg p-4 z-10"
        >
          <select
            value={selectedDistance}
            onChange={handleDistanceChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          >
            <option value="">Pilih Jarak</option>
            <option value="10">10KM</option>
            <option value="20">20KM</option>
            <option value="30">30KM</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default DistanceFilter;
