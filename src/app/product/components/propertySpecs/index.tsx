import React from "react";
import { formatCurrency } from "@/app/utils/formatCurrency";

interface PropertySpecsProps {
  name: string;
  address: string;
  price: string;
  numberrOfBedrooms: string;
  numberrOfBathrooms: string;
  buildingArea: string;
  numberOfFloors: string;
}

const PropertySpecs: React.FC<PropertySpecsProps> = ({
  name,
  address,
  price,
  numberrOfBedrooms,
  numberrOfBathrooms,
  buildingArea,
}) => {
  return (
    <div className="bg-white p-4 flex flex-col gap-4 shadow mt-4">
      <div className="text-blue-600 font-bold text-2xl mt-2">
        {formatCurrency(price)}
      </div>
      <h1 className="text-2xl font-bold">
        {numberrOfBedrooms} KT - {numberrOfBathrooms} KM - {buildingArea} m²
      </h1>
      <h1 className="text-xl font-bold">{name}</h1>
      <p className="text-gray-500">{address}</p>
    </div>
  );
};

export default PropertySpecs;
