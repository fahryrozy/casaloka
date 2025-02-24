import React, { useState } from "react";
import DatePickerDialog from "@app/components/datePicker";
import { FaCalendar, FaPhoneAlt, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { submitSurvey } from "@utils/api/services/surveyService";
import DreamHouseDialog from "./dreamHouse";
import { registerCustomerInterest } from "@utils/api/services/customerInterestService";

interface ContactCasalokaProps {
  product: {
    id: string;
    province_code: string;
    city_code: string;
    district_code: string;
    harga: string;
    nama: string;
  };
}

const ContactCasaloka: React.FC<ContactCasalokaProps> = ({ product }) => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDreamHouseDialog, setShowDreamHouseDialog] = useState(false);

  const handleDateChange = (date: Date) => {
    if (date) setSelectedDate(date);
  };

  const handleScheduleClick = () => {
    setShowDateTimePicker(true);
    registerInterest();
  };

  const handleClose = () => {
    setShowDateTimePicker(false);
  };
  const disabledDates = [new Date(2025, 1, 27)]; // Disable 24 February 2025

  const handleSubmit = async () => {
    if (selectedDate) {
      const surveyRequest = {
        properti_id: product.id,
        survey_date: selectedDate.toLocaleDateString("en-CA"),
      };

      await submitSurvey(surveyRequest);
    }
    handleClose();
  };

  const handleDreamHouseSubmit = (data: {
    price: number;
    tenor: string;
    location: string;
  }) => {};

  const handleWhatsAppClick = () => {
    const phoneNumber = "628161691414";
    const message = `Hello, I would like to know about the property "${product.nama}" priced at ${product.harga}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    registerInterest();
  };

  const hasRegisteredInterestToday = (productId: string): boolean => {
    const today = new Date().toISOString().split("T")[0];
    const key = `interest_${productId}_${today}`;
    return localStorage.getItem(key) !== null;
  };

  const setInterestRegisteredToday = (productId: string) => {
    const today = new Date().toISOString().split("T")[0];
    const key = `interest_${productId}_${today}`;
    localStorage.setItem(key, "true");
  };

  const registerInterest = async () => {
    if (!hasRegisteredInterestToday(product.id)) {
      const r = await registerCustomerInterest(product.id);
      setInterestRegisteredToday(product.id);
    }
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
          <h3 className="font-bold text-xl">Casaloka</h3>
        </div>
        <FaChevronRight className="text-gray-600" />
      </div>

      <div className="mt-6 flex flex-col gap-2 justify-center items-center">
        <button
          className="w-2/3 flex flex-row items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          onClick={() => {
            setShowDreamHouseDialog(true);
            registerInterest();
          }}
        >
          Ajukan Rumah Impian
        </button>

        <button
          className="w-2/3 flex flex-row items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md shadow hover:bg-orange-600"
          onClick={handleWhatsAppClick}
        >
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
        onSubmit={handleSubmit}
        btnText="Atur Jadwal Temu"
        disabledDates={disabledDates}
      />

      <DreamHouseDialog
        isOpen={showDreamHouseDialog}
        onClose={() => setShowDreamHouseDialog(false)}
        onSubmit={handleDreamHouseSubmit}
        product={product}
      />
    </div>
  );
};

export default ContactCasaloka;
