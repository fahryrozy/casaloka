import React, { useState } from "react";
import DatePickerDialog from "@/app/components/datePicker";
import { FaCalendar, FaPhoneAlt, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
// import { submitSurvey } from "@/app/utils/api/services/surveyService"; // Import the submitSurvey function

const ContactCasaloka: React.FC = () => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    if (date) setSelectedDate(date);
    console.log("date => ", date.toLocaleDateString("en-CA")); // Format the date as YYYY-MM-DD
  };

  const handleScheduleClick = () => {
    setShowDateTimePicker(true);
  };

  const handleClose = () => {
    setShowDateTimePicker(false);
  };

  const handleSubmit = async () => {
    // if (selectedDate) {
    //   const surveyRequest = {
    //     properti_id: "1", // Replace with the actual property ID
    //     survey_date: selectedDate.toLocaleDateString("en-CA"), // Format the date as YYYY-MM-DD
    //   };

    //   try {
    //     const response = await submitSurvey(surveyRequest);
    //     console.log("Survey submitted successfully:", response);
    //   } catch (error) {
    //     console.error("Failed to submit survey:", error);
    //   }
    // }
    console.log(selectedDate);
    handleClose();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 rounded-full p-1 w-14 h-14 flex items-center justify-center">
            <Image
              src="/assets/logos/casaloka-logo.svg"
              alt="Casaloka"
              className="h-8"
              width={80}
              height={80}
            />
          </div>
          <h3 className="font-bold text-lg">Casaloka</h3>
        </div>
        <FaChevronRight className="text-gray-600" />
      </div>

      <div className="mt-6 flex flex-col gap-2 justify-center items-center">
        <button className="w-2/3 flex flex-row items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
          Ajukan Rumah Impian
        </button>

        <button className="w-2/3 flex flex-row items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md shadow hover:bg-orange-600">
          <FaPhoneAlt /> Hubungi Casaloka
        </button>

        <button
          className="w-2/3 flex flex-row items-center justify-center gap-2 bg-white border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-md shadow hover:bg-gray-50"
          onClick={handleScheduleClick}
        >
          <FaCalendar /> Atur Jadwal Survei
        </button>
      </div>

      <DatePickerDialog
        title="Atur Jadwal Survei"
        isOpen={showDateTimePicker}
        onClose={handleClose}
        onDateChange={handleDateChange}
        onSubmit={handleSubmit} // Call handleSubmit on submit
        btnText="Atur Jadwal Temu"
      />
    </div>
  );
};

export default ContactCasaloka;
