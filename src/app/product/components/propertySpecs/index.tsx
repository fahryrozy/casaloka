import React from "react";
import { formatCurrency } from "@utils/formatCurrency";
import { FaShareAlt } from "react-icons/fa";

interface PropertySpecsProps {
  name: string;
  address: string;
  price: string;
  numberrOfBedrooms: string;
  numberrOfBathrooms: string;
  buildingArea: string;
  date: string; // Add date prop
}

const PropertySpecs: React.FC<PropertySpecsProps> = ({
  name,
  address,
  price,
  numberrOfBedrooms,
  numberrOfBathrooms,
  buildingArea,
  date, // Destructure date prop
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Casaloka",
        text: `Check out this property: ${name}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert("Web Share API is not supported in your browser.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div className="bg-white p-4 flex flex-col gap-4 shadow">
      <div className="flex items-center justify-between">
        <div className="text-blue-600 font-bold text-2xl mt-2">
          {formatCurrency(price)}
        </div>
        <button
          onClick={handleShare}
          className="text-blue-600 hover:text-blue-800"
          aria-label="Share"
        >
          <FaShareAlt size={24} />
        </button>
      </div>
      <h1 className="text-2xl font-bold">
        {numberrOfBedrooms} KT - {numberrOfBathrooms} KM - {buildingArea} m²
      </h1>
      <h1 className="text-xl font-bold">{name}</h1>
      <div className="flex items-end justify-between">
        <p className="w-full text-gray-500">{address}</p>
        <p className="text-gray-400 whitespace-nowrap">{formatDate(date)}</p>
      </div>
    </div>
  );
};

export default PropertySpecs;
