import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { submitDreamHouse } from "@utils/api/services/dreamHouseService";
import { fetchProvinces } from "@utils/api/services/regionService";

interface DreamHouseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { price: number; tenor: string; location: string }) => void;
  product: {
    province_code: string;
    city_code: string;
    district_code: string;
    harga: string;
  };
}

interface Province {
  code: string;
  name: string;
}

const DreamHouseDialog: React.FC<DreamHouseDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
}) => {
  const [price, setPrice] = useState<number>(Number(product.harga));
  const [tenor, setTenor] = useState<string>("5");
  const [location, setLocation] = useState<string>(product.province_code);
  const [provinces, setProvinces] = useState<Province[]>([]);

  useEffect(() => {
    const fetchProvincesData = async () => {
      try {
        const data = await fetchProvinces();
        setProvinces(data);
      } catch (error) {
        throw error;
      }
    };

    fetchProvincesData();
  }, []);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setPrice(value);
  };

  const handleSubmit = async () => {
    const data = {
      tenor,
      province_code: location,
      city_code: product.city_code,
      district_code: product.district_code,
      harga: price.toString(),
    };

    try {
      await submitDreamHouse(data);
      onSubmit({ price, tenor, location });
      onClose();
    } catch (error) {
      throw error;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <IoClose className="text-2xl" />
        </button>
        <h2 className="text-xl font-bold mb-4">Ajukan Rumah Impian</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700">Harga Impian Anda</label>
            <input
              type="text"
              value={price ? price.toString() : ""}
              onChange={handlePriceChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700">Tenor</label>
            <select
              value={tenor}
              onChange={(e) => setTenor(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="5">5 Tahun</option>
              <option value="10">10 Tahun</option>
              <option value="15">15 Tahun</option>
              <option value="20">20 Tahun</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Lokasi</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="">Pilih Lokasi</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DreamHouseDialog;
