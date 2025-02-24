import Image from "next/image";
import React from "react";

interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { name: "AD Tien Realty", logo: "/assets/images/ad-tien 1.png" },
  { name: "Medina Tower", logo: "/assets/images/medina_th 1.png" },
  { name: "Ahsanu Residence", logo: "/assets/images/ahsanu_residence2 1.png" },
  {
    name: "Al Ihsan Residence 2",
    logo: "/assets/images/alihsan_residence2 2.png",
  },
  { name: "Golden Land", logo: "/assets/images/golden-land-color 1.png" },
  { name: "Griya Tavisha 3", logo: "/assets/images/griya_tavisha_3 2.png" },
  { name: "Azzam Residencia", logo: "/assets/images/azzam-residencia.png" },
  {
    name: "BSI Bank Syariah Indonesia",
    logo: "/assets/images/lsk-partner-4.png",
  },
  {
    name: "Hisan Madinah Village",
    logo: "/assets/partners/hisan-madinah-village.png",
  },
  { name: "Dana Syariah", logo: "/assets/images/lsk-partner-3.png" },
  { name: "Hisan Townhouse", logo: "/assets/images/image 10.png" },
  { name: "Kamang Kolonie", logo: "/assets/images/image 11.png" },
  { name: "Hijra Bank", logo: "/assets/images/lsk-partner-1.png" },
  { name: "BTN Syariah", logo: "/assets/images/lsk-partner-2.pngg" },
  {
    name: "Jatisari Luxury Residence",
    logo: "/assets/images/jatisari-residence 1.png",
  },
  { name: "Tasnim", logo: "/assets/images/tasnim 1.png" },
  { name: "Salak View", logo: "/assets/images/salak_view 1.png" },
  { name: "Rabbani Bintaro", logo: "/assets/images/rabbani_bintaro 1.png" },
  { name: "Raudhatul Jannah", logo: "/assets/images/raudhatul_jannah 2.png" },
];

const OurPartners: React.FC = () => {
  return (
    <section className="px-4 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Partner <span className="text-blue-600">Kami</span>
        </h2>
        <p className="text-gray-600 mb-12">
          Kami bekerja sama dengan mitra terkemuka di industri properti. Bersama
          mereka, kami berkomitmen untuk menghadirkan solusi hunian terbaik dan
          mewujudkan rumah impian Anda.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((partner) => (
            <div key={partner.name} className="flex justify-center">
              <Image
                width={100}
                height={100}
                src={partner.logo}
                alt={partner.name}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
