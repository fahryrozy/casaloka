import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../product/components/contactCasaloka/datepicker.scss";

interface DatePickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDateChange: (date: Date) => void;
  onSubmit: () => void;
}

const DatePickerDialog: React.FC<DatePickerDialogProps> = ({
  isOpen,
  onClose,
  onDateChange,
  onSubmit,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-auto">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col gap-4">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="border p-2 rounded w-full"
            placeholderText="Pilih Tanggal"
            inline
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerDialog;
