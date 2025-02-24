import React, { useEffect } from "react";
import LocationFilter from "./locationFilter";
import { formatCurrency } from "@utils/formatCurrency";
import useStore from "@store/useStore";
import DatePickerDialog from "@app/components/datePicker";

interface FilterSidebarProps {
  categories: string;
  setCategories: (category: string) => void;
  certifications: string;
  setCertifications: (certification: string) => void;
  selectedProvince: string;
  selectedCity: string;
  selectedDistrict: string;
  selectedVillage: string;
  setSelectedProvince: (province: string) => void;
  setSelectedCity: (city: string) => void;
  setSelectedDistrict: (district: string) => void;
  setSelectedVillage: (village: string) => void;
  handleApplyFilters: () => void;
  handleResetFilters: () => void;
  isFilterSidebarOpen: boolean;
  setIsFilterSidebarOpen?: (isOpen: boolean) => void;
  selectedDistance: string;
  handleDistanceChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedDate: Date | null;
  handleDateChange: (date: Date) => void;
  showDatePicker: boolean;
  setShowDatePicker: (showDatePicker: boolean) => void;
  userLongitude: string;
  setUserLongitude: (longitude: string) => void;
  userLatitude: string;
  setUserLatitude: (latitude: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  setCategories,
  certifications,
  setCertifications,
  selectedProvince,
  selectedCity,
  selectedDistrict,
  selectedVillage,
  setSelectedProvince,
  setSelectedCity,
  setSelectedDistrict,
  setSelectedVillage,
  handleApplyFilters,
  handleResetFilters,
  isFilterSidebarOpen,
  setIsFilterSidebarOpen,
  selectedDistance,
  handleDistanceChange,
  selectedDate,
  handleDateChange,
  showDatePicker,
  setShowDatePicker,
  userLongitude,
  setUserLongitude,
  userLatitude,
  setUserLatitude,
}) => {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useStore();

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value.replace(/[^0-9]/g, ""));
    setMinPrice(value);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value.replace(/[^0-9]/g, ""));
    setMaxPrice(value);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLongitude(position.coords.longitude.toString());
        setUserLatitude(position.coords.latitude.toString());
      });
    }
  }, [setUserLongitude, setUserLatitude]);

  return (
    <div
      className={`${
        isFilterSidebarOpen ? "flex slide-out-right" : "hidden"
      } sm:flex flex-col sm:w-64 shadow-lg p-2 gap-2 relative bg-white min-h-screen`}
    >
      <div className="flex flex-col gap-2 sm:hidden">
        <h3 className="font-bold mb-4">Atur Jarak</h3>
        <select
          value={selectedDistance}
          onChange={handleDistanceChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-lg mb-4"
        >
          <option value="0">Pilih Jarak</option>
          <option value="10">10KM</option>
          <option value="20">20KM</option>
          <option value="30">30KM</option>
        </select>
        <hr />
      </div>

      <div className="flex flex-col gap-2 sm:hidden">
        <h3 className="font-bold mb-4">Atur Harga</h3>
        <div className="w-full flex flex-row gap-2 rounded-lg mb-4">
          <input
            type="text"
            placeholder="Min"
            value={minPrice ? formatCurrency(minPrice.toString()) : ""}
            onChange={handleMinChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            min={1000000}
            step={100}
          />
          <input
            type="text"
            placeholder="Max"
            value={maxPrice ? formatCurrency(maxPrice.toString()) : ""}
            onChange={handleMaxChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            min={minPrice}
            step={100}
          />
        </div>
        <hr />
      </div>

      <div className="flex flex-col gap-2 sm:hidden">
        <h3 className="font-bold mb-4">Atur Tanggal</h3>
        <button
          className="w-full border border-gray-300 px-3 py-2 rounded-lg mb-4"
          onClick={() => setShowDatePicker(true)}
        >
          {selectedDate ? selectedDate.toLocaleDateString() : "Pilih Tanggal"}
        </button>
        <DatePickerDialog
          isOpen={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onDateChange={handleDateChange}
          onSubmit={() => setShowDatePicker(false)}
          btnText="Atur Tanggal"
        />
        <hr />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Kategori</h3>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                name="category"
                className="mr-2"
                checked={categories === "baru"}
                onChange={() => setCategories("baru")}
              />
              Baru
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="category"
                className="mr-2"
                checked={categories === "bekas"}
                onChange={() => setCategories("bekas")}
              />
              Bekas
            </label>
          </li>
        </ul>
        <hr />
      </div>

      <LocationFilter
        selectedProvince={selectedProvince}
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
        selectedVillage={selectedVillage}
        setSelectedProvince={setSelectedProvince}
        setSelectedCity={setSelectedCity}
        setSelectedDistrict={setSelectedDistrict}
        setSelectedVillage={setSelectedVillage}
      />
      <hr />
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Sertifikasi</h3>
        <ul className="space-y-2">
          <li>
            <label>
              <input
                type="radio"
                name="certification"
                className="mr-2"
                checked={certifications === "shm"}
                onChange={() => setCertifications("shm")}
              />
              SHM - Sertifikat Hak Milik
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="certification"
                className="mr-2"
                checked={certifications === "shgb"}
                onChange={() => setCertifications("shgb")}
              />
              SHGB - Sertifikat Hak Guna Bangunan
            </label>
          </li>
        </ul>
      </div>
      <div className="flex justify-center gap-4 mt-10 items-end">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Apply
        </button>
        <button
          onClick={handleResetFilters}
          className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
      {setIsFilterSidebarOpen && (
        <button
          onClick={() => setIsFilterSidebarOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 sm:hidden"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
