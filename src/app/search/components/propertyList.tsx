"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Property {
  id: number;
  title: string;
  slug: string;
  location: string;
  price: string;
  oldPrice?: string;
  image: string;
  details: string[];
  description: string[];
}

interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  const router = useRouter();

  const navigateToProperty = (property: Property) => {
    router.push(`/product/${property.slug}`);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="flex items-center bg-gray-100 p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
          onClick={() => navigateToProperty(property)}
        >
          <Image
            src={property.image}
            alt={property.title}
            width={128}
            height={128}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-bold">{property.title}</h3>
            <p className="text-gray-600">{property.location}</p>
            <div className="text-blue-600 font-bold mt-2">
              {property.price}
              {property.oldPrice && (
                <span className="text-gray-500 line-through ml-2">
                  {property.oldPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
