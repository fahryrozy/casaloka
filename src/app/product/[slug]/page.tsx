"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { getPropertyList } from "@/app/utils/api";
import SimulasiCicilan from "../components/simulateInstallment";
import ContactCasaloka from "../components/contactCasaloka";
import TontonVideo from "../components/videoProduct";
import PropertySpecs from "../components/propertySpecs";
import PropertyDetails from "../components/propertyDetails";
import PropertyImageCarousel from "../components/propertyImages/";

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

const ProductDetails: React.FC = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Property | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyList();
        console.log("product => ", data.data.datas);
        const foundProduct = data.data.datas.find(
          (property: Property) => property.slug === slug
        );
        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error("Failed to fetch property:", error);
      }
    };

    if (slug) {
      fetchProperty();
    }
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col overflow-x-hidden">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Section */}
          <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
            <PropertyImageCarousel images={product.properti_image_list} />

            <PropertyDetails
              bedrooms={product.kamar_tidur}
              bathrooms={product.kamar_mandi}
              buildingArea={product.luas_bangunan}
              landArea={product.luas_tanah}
              floors={product.jumlah_lantai}
              surat={product.surat_name}
              imb={product.imb_name}
              status={product.status_properti_name}
              description={product.keterangan}
            />
          </div>

          {/* Right Section */}
          <div className="flex flex-col col-span-2 gap-4">
            <PropertySpecs
              name={product.nama}
              numberrOfBedrooms={product.kamar_tidur}
              numberrOfBathrooms={product.kamar_mandi}
              buildingArea={product.luas_bangunan}
              numberOfFloors={product.jumlah_lantai}
              address={product.alamat}
              price={product.harga}
            />

            <ContactCasaloka />
            <SimulasiCicilan />
            <TontonVideo videoUrl={product.link_video_youtube} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
