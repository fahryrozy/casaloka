"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoveEmptyIcon from "../../assets/icons/love-empty.svg";
import LoveFillIcon from "../../assets/icons/love-fill.svg";
import { formatCurrency } from "@/app/utils/formatCurrency";

interface PropertyImage {
  log_number: string;
  properti_id: number;
  image_url: string;
  image_url_real: string;
}

interface Property {
  id: string;
  nama: string;
  nama_alias: string;
  nama_alias_show: string;
  slug: string;
  tipe_bangunan: string;
  keterangan: string;
  alamat: string;
  province_code: string;
  city_code: string;
  district_code: string;
  village_code: string;
  harga: string;
  kamar_tidur: string;
  kamar_mandi: string;
  luas_bangunan: string;
  luas_tanah: string;
  jumlah_lantai: string;
  surat: string;
  imb: string;
  link_video_youtube: string;
  status_properti: string;
  created_datetime: string;
  updated_datetime: string;
  request_approval_id: string;
  request_approval_first_flag: string;
  nama_alias_show_name: string;
  tipe_bangunan_name: string;
  surat_name: string;
  imb_name: string;
  status_properti_name: string;
  properti_image_list: PropertyImage[];
  district_name: string;
  city_name: string;
  province_name: string;
}

interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);

  const navigateToProperty = (property: Property) => {
    router.push(`/product/${property.slug}`);
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(propertyId)
        ? prevFavorites.filter((id) => id !== propertyId)
        : [...prevFavorites, propertyId]
    );
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="relative flex items-center bg-gray-100 p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
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
