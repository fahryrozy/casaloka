import React from "react";
import LocationFilter from "./locationFilter";

interface FilterSidebarProps {
  categories: string[];
  setCategories: (categories: string[]) => void;
  properties: string[];
  setProperties: (properties: string[]) => void;
  certifications: string[];
  setCertifications: (certifications: string[]) => void;
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
  isFilterSidebarOpen: boolean; // Add a prop for checking if the sidebar is open
  setIsFilterSidebarOpen?: (isOpen: boolean) => void; // Optional prop for closing the sidebar
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  properties,
  certifications,
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
  setIsFilterSidebarOpen, // Destructure the optional prop
}) => {
  return (
    <div
      className={`${
        isFilterSidebarOpen ? "flex slide-out-right" : "hidden"
      } sm:flex flex-col sm:w-64 shadow-lg p-2 gap-2 relative bg-white min-h-screen`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-bold mb-4">Kategori</h3>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                className="mr-2"
                checked={categories.includes("Baru")}
                onChange={() => {}}
              />
              Baru
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                className="mr-2"
                checked={categories.includes("Bekas")}
                onChange={() => {}}
              />
              Bekas
            </label>
          </li>
        </ul>
        <hr />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">Properti</h3>
        <ul className="space-y-2">
          <li>
            <label>
              <input
                type="checkbox"
                className="mr-2"
                checked={properties.includes("Digital Rumah & Apartemen")}
                onChange={() => {}}
              />
              Digital Rumah & Apartemen
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
                type="checkbox"
                className="mr-2"
                checked={certifications.includes("SHM - Sertifikat Hak Milik")}
                onChange={() => {}}
              />
              SHM - Sertifikat Hak Milik
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
