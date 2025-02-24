import React from "react";
import Image from "next/image";

const SimulasiCicilan: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h3 className="font-bold text-xl mb-2">Simulasi Cicilan</h3>
      <div className="flex flex-col gap-2 justify-around mt-4">
        <button className="flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow hover:shadow-md">
          <Image
            src="/assets/images/lsk-partner-2.png"
            alt="Bank 1"
            width={70}
            height={50}
            className="object-contain"
          />
        </button>
        <button className="flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow hover:shadow-md">
          <Image
            src="/assets/images/lsk-partner-3.png"
            alt="Bank 2"
            width={70}
            height={50}
            className="object-contain"
          />
        </button>
        <button className="flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow hover:shadow-md">
          <Image
            src="/assets/images/lsk-partner-4.png"
            alt="Bank 3"
            width={70}
            height={50}
            className="object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default SimulasiCicilan;
