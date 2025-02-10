import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import PriceFilter from "@/app/components/priceFilter";
import DatePickerDialog from "@/app/components/datePicker";

// Search Header Component
const SearchHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleDatePickerClick = () => {
    setShowDatePicker(true);
  };

  const handleClose = () => {
    setShowDatePicker(false);
  };

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
          onClick={handleDatePickerClick}
        >
          <FaCalendarAlt className="text-blue-500 mr-2" />
          {selectedDate
            ? selectedDate.toLocaleDateString()
            : "Tanggal Diterbitkan"}
        </button>
        <DatePickerDialog
          isOpen={showDatePicker}
          onClose={handleClose}
          onDateChange={handleDateChange}
          onSubmit={handleClose}
        />
      </div>
    </div>
  );
};

export default SearchHeader;
