"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { getPropertyDetail } from "@utils/api/services/propertyService";
import SimulasiCicilan from "../components/simulateInstallment";
import ContactCasaloka from "../components/contactCasaloka";
import TontonVideo from "../components/videoProduct";
import PropertySpecs from "../components/propertySpecs";
import PropertyDetails from "../components/propertyDetails";
import PropertyImageCarousel from "../components/propertyImages/";
import LoginModal from "@app/components/login";
import ProductSkeleton from "../components/skeleton";
import { PropertyDetailData } from "@utils/api/interfaces/IProperty";

const ProductDetails: React.FC = () => {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const nl = searchParams.get("nl");
  const router = useRouter();

  const [product, setProduct] = useState<PropertyDetailData | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(nl === "true");

  const handleClose = () => {
    setIsLoginModalOpen(false);
    if (window.history.length > 2) router.back();
    else router.push("/home");
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (typeof slug === "string") {
          const data = await getPropertyDetail(slug);
          setProduct(data);
        }
      } catch (error) {
        throw error;
      }
    };

    if (slug && nl !== "true") {
      fetchProperty();
    }
  }, [slug, nl]);

  if (!product) {
    return (
      <>
        <ProductSkeleton />
        {isLoginModalOpen && <LoginModal isOpen={true} onClose={handleClose} />}
      </>
    );
  } else {
    return (
      <div className="flex flex-col overflow-x-hidden">
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
                address={product.alamat}
                price={product.harga}
                date={product.created_datetime.toString()}
              />

              <ContactCasaloka
                product={{
                  id: product.id,
                  province_code: product.province_code,
                  city_code: product.city_code,
                  district_code: product.district_code,
                  harga: product.harga,
                  nama: product.nama,
                }}
              />
              <SimulasiCicilan />
              <TontonVideo videoUrl={product.link_video_youtube} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetails;
