import React from "react";

interface PropertyDetailsProps {
  bedrooms: string;
  bathrooms: string;
  buildingArea: string;
  landArea: string;
  floors: string;
  surat: string;
  imb: string;
  status: string;
  description: string;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  bedrooms,
  bathrooms,
  buildingArea,
  landArea,
  floors,
  surat,
  imb,
  status,
  description,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-2xl mt-4">
      <div className="mt-6">
        <h3 className="font-bold text-xl mb-2">Detail</h3>
        <ul className="space-y-1">
          <li className="text-gray-600">Kamar Tidur: {bedrooms}</li>
          <li className="text-gray-600">Kamar Mandi: {bathrooms}</li>
          <li className="text-gray-600">Luas Bangunan: {buildingArea} m²</li>
          <li className="text-gray-600">Luas Tanah: {landArea} m²</li>
          <li className="text-gray-600">Jumlah Lantai: {floors}</li>
          <li className="text-gray-600">Surat: {surat}</li>
          <li className="text-gray-600">IMB: {imb}</li>
          <li className="text-gray-600">Status Properti: {status}</li>
        </ul>
      </div>
      <hr className="my-4" />
      <div>
        <h3 className="font-bold text-xl mb-2">Deskripsi</h3>
        <p className="text-gray-700 whitespace-pre-line">{`${description}`}</p>
      </div>
    </div>
  );
};

export default PropertyDetails;
