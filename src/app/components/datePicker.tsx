import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";

interface DatePickerDialogProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onDateChange: (date: Date) => void;
  onSubmit: () => void;
  btnText: string;
  disabledDates?: Date[]; // Add disabledDates prop
}

const DatePickerDialog: React.FC<DatePickerDialogProps> = ({
  title,
  isOpen,
  onClose,
  onDateChange,
  onSubmit,
  btnText,
  disabledDates = [], // Default to an empty array
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) onDateChange(date);
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    return (
      date < today ||
      disabledDates.some(
        (disabledDate) => date.toDateString() === disabledDate.toDateString()
      )
    );
  };

  const getDayClassName = (date: Date) => {
    return isDateDisabled(date) ? "react-datepicker__day--disabled" : "";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-auto">
        <div className="font-bold mb-4 flex flex-row justify-between w-full">
          {title && <div className="text-md text-[#033B86]">{title}</div>}
          <button
            className="absolute text-xl right-4 top-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="border-0 !important p-2 rounded w-full"
            placeholderText="Pilih Tanggal"
            inline
            minDate={new Date()}
            excludeDates={disabledDates}
            dayClassName={getDayClassName}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
            onClick={onSubmit}
          >
            {btnText}
          </button>
        </div>
        {disabledDates.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            <p>Note: The following dates are unavailable:</p>
            <ul>
              {disabledDates.map((date, index) => (
                <li key={index}>{date.toLocaleDateString()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePickerDialog;
