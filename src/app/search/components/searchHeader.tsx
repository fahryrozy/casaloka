import React from "react";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import PriceFilter from "@/app/components/priceFilter";
import DatePickerDialog from "@/app/components/datePicker";

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showDatePicker: boolean;
  selectedDate: Date | null;
  handleDateChange: (date: Date) => void;
  setShowDatePicker: (showDatePicker: boolean) => void;
  minPrice: number;
  maxPrice: number;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  showDatePicker,
  selectedDate,
  handleDateChange,
  setShowDatePicker,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="bg-blue-600 py-10 px-6 rounded-xl shadow-lg w-full">
        <div className="relative w-full max-w-3xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari rumah impian"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-3 w-full rounded-lg shadow-sm text-gray-800"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 bg-white p-3 rounded-b-xl w-[90%] shadow-md">
        {/* Distance Filter */}
        <button className="flex w-full items-center bg-white px-4 py-2">
          <FaMapMarkerAlt className="text-blue-500 mr-2" /> Jarak
        </button>

        {/* Price Sorting Dropdown */}
        <PriceFilter
          showLabel={false}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />

        {/* Date Sorting */}
        <button
          className="flex w-full items-center bg-white px-4 py-2"
          onClick={() => setShowDatePicker(true)}
        >
          <FaCalendarAlt className="text-blue-500 mr-2" />
          {selectedDate
            ? selectedDate.toLocaleDateString()
            : "Tanggal Diterbitkan"}
        </button>
        <DatePickerDialog
          isOpen={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onDateChange={handleDateChange}
          onSubmit={() => setShowDatePicker(false)}
          btnText="Atur Tanggal"
        />
      </div>
    </div>
  );
};

export default SearchHeader;
