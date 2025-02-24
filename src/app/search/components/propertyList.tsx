"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoveEmptyIcon from "@assets/icons/love-empty.svg";
import LoveFillIcon from "@assets/icons/love-fill.svg";
import { formatCurrency } from "@utils/formatCurrency";
import { IPropertyListData } from "@utils/api/interfaces/IProperty";
import NoProperties from "./NoProperties";

interface PropertyListProps {
  properties: IPropertyListData[];
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  favorites,
  toggleFavorite,
}) => {
  const router = useRouter();

  const navigateToProperty = (property: IPropertyListData) => {
    router.push(`/product/${property.slug}`);
  };

  if (properties.length === 0) {
    return <NoProperties />;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {properties.map((property) => (
        <div
          key={property.id}
          onClick={() => navigateToProperty(property)}
          className="relative flex items-center bg-white p-4 rounded-lg shadow-xl cursor-pointer hover:shadow-md transition"
        >
          <Image
            src={`https://newapidev.casaloka.id${property.properti_image_list[0].image_url_real}`}
            alt={property.nama}
            width={128}
            height={128}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div className="ml-4 flex-1">
            <h3 className="text-xl text-ellipsis font-bold">{property.nama}</h3>
            <p className="text-gray-600">{property.alamat}</p>
            <div className="text-blue-600 font-bold mt-2">
              {formatCurrency(property.harga)}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <button
              className="absolute top-4 right-4"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(property.id);
              }}
            >
              {favorites.includes(property.id) ? (
                <Image
                  src={LoveFillIcon}
                  alt="Favorite"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src={LoveEmptyIcon}
                  alt="Not Favorite"
                  width={24}
                  height={24}
                />
              )}
            </button>
            <button
              className="hidden sm:flex mt-4 px-4 py-2 bg-[#FF772A] text-white rounded-md"
              onClick={() => navigateToProperty(property)}
            >
              Lihat Detail
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
