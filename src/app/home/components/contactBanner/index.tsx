import Image from "next/image";
import React from "react";

const ContactUsBanner: React.FC = () => {
  return (
    <section className="w-[90%] sm:h-48 sm:justify-center flex flex-col drop-shadow-2xl shadow-2xl rounded-lg self-center bg-primary pt-10">
      <div className="sm:self-end flex flex-col sm:flex-row sm:justify-center gap-10 px-4">
        {/* Left Content */}
        <div className="text-white">
          <h2 className="text-3xl font-bold mb-4">Lagi nyari rumah impian?</h2>
          <p className="text-base">
            Kami siap membantu anda untuk mewujudkannya
          </p>
        </div>

        {/* Right Button */}
        <button className="bg-white text-primary px-3 py-1 h-10 self-center rounded shadow-lg font-semibold hover:bg-gray-100">
          Hubungi Kami
        </button>
      </div>
      {/* Image */}
      <div className="sm:absolute bottom-0 sm:left-0">
        <Image
          src="/assets/images/house.png"
          alt="House"
          width={400}
          height={400}
          className="w-full sm:h-72 max-w-3xl mx-auto object-contain"
        />
      </div>
    </section>
  );
};

export default ContactUsBanner;
