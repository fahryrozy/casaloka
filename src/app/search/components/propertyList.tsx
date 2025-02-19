"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoveEmptyIcon from "../../assets/icons/love-empty.svg";
import LoveFillIcon from "../../assets/icons/love-fill.svg";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { IPropertyListData } from "@/app/utils/api/interfaces/IProperty";

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

  return (
    <div className="w-full flex flex-col gap-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="relative flex items-center bg-white p-4 rounded-lg shadow-xl cursor-pointer hover:shadow-md transition"
          onClick={() => navigateToProperty(property)}
        >
          <Image
            src={`https://newapidev.casaloka.id${property.properti_image_list[0].image_url_real}`}
            alt={property.nama}
            width={128}
            height={128}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-bold">{property.nama}</h3>
            <p className="text-gray-600">{property.alamat}</p>
            <div className="text-blue-600 font-bold mt-2">
              {formatCurrency(property.harga)}
            </div>
          </div>
          <button
            className="absolute top-4 right-4"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
          >
            {favorites.includes(property.id) ? (
              <Image src={LoveFillIcon} alt="Favorite" width={24} height={24} />
            ) : (
              <Image
                src={LoveEmptyIcon}
                alt="Not Favorite"
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
