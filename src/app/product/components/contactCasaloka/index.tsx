import React, { useState } from "react";
import DatePickerDialog from "@/app/components/datePicker";
import "./datepicker.scss";

const ContactCasaloka: React.FC = () => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState<"date" | "time">("date");

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setStep("time");
    setShowDateTimePicker(false);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleScheduleClick = () => {
    setShowDateTimePicker(true);
  };

  const handleSubmit = () => {
    // Handle the submission of the selected date and time
    console.log("Scheduled Date:", selectedDate);
    console.log("Scheduled Time:", selectedTime);
    setShowDateTimePicker(false);
  };

  const handleClose = () => {
    setShowDateTimePicker(false);
  };

  const handleBack = () => {
    setStep("date");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h3 className="font-bold text-lg mb-2">Contact Casaloka</h3>

      <div className="mt-6 flex flex-col gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
          Ajukan Rumah Impian
        </button>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-md shadow hover:bg-orange-600">
          Hubungi Casaloka
        </button>

        <button
          className="bg-white border-2 border-orange-500 text-orange px-4 py-2 rounded-md shadow hover:bg-gray-50"
          onClick={handleScheduleClick}
        >
          Atur Jadwal Survei
        </button>
      </div>

      <DatePickerDialog
        isOpen={showDateTimePicker}
        onClose={handleClose}
        onDateChange={handleDateChange}
        onSubmit={handleClose}
      />
      {step === "time" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-auto">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={handleClose}
            >
              &times;
            </button>
            <div className="flex flex-col gap-4">
              <input
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
                className="border p-2 rounded w-full"
                placeholder="Pilih Waktu"
              />
              <div className="flex justify-between">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactCasaloka;
