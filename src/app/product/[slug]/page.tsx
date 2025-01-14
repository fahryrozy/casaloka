"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import properties from "../../data/mockProperty";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

interface Product {
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

const ProductDetails: React.FC = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (slug) {
      const foundProduct = properties.find(
        (property) => property.slug === slug
      );
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col overflow-x-hidden">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
        {/* Left Section */}
        <div className="flex flex-col gap-4 mt-24">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="flex space-x-2 mt-4">
            {[...Array(4)].map((_, index) => (
              <img
                key={index}
                src={product.image}
                alt={`Thumbnail ${index}`}
                className="w-20 h-20 object-cover rounded-lg shadow"
              />
            ))}
          </div>
          <div className="bg-white p-4 rounded-lg shadow mt-4">
            <h3 className="font-bold text-lg mb-2">Deskripsi</h3>
            <ul className="list-disc list-inside text-gray-700">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 mt-24">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-500">{product.location}</p>
          <div className="text-blue-600 font-bold text-xl mt-2">
            {product.price}
            {product.oldPrice && (
              <span className="text-gray-500 line-through ml-2">
                {product.oldPrice}
              </span>
            )}
          </div>
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2">Detail</h3>
            <ul className="space-y-1">
              {product.details.map((detail, index) => (
                <li key={index} className="text-gray-600">
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">
              Hubungi Developer
            </button>
            <button className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600">
              Ajukan KPR
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
