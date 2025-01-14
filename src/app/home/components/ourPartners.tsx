import React from "react";

interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { name: "AD Tien Realty", logo: "/assets/partners/ad-tien-realty.png" },
  { name: "Medina Tower", logo: "/assets/partners/medina-tower.png" },
  { name: "Ahsanu Residence", logo: "/assets/partners/ahsanu-residence.png" },
  {
    name: "Al Ihsan Residence 2",
    logo: "/assets/partners/al-ihsan-residence.png",
  },
  { name: "Golden Land", logo: "/assets/partners/golden-land.png" },
  { name: "Griya Tavisha 3", logo: "/assets/partners/griya-tavisha.png" },
  { name: "Azzam Residencia", logo: "/assets/partners/azzam-residencia.png" },
  { name: "BSI Bank Syariah Indonesia", logo: "/assets/partners/bsi-bank.png" },
  {
    name: "Hisan Madinah Village",
    logo: "/assets/partners/hisan-madinah-village.png",
  },
  { name: "Dana Syariah", logo: "/assets/partners/dana-syariah.png" },
  { name: "Hisan Townhouse", logo: "/assets/partners/hisan-townhouse.png" },
  { name: "Kamang Kolonie", logo: "/assets/partners/kamang-kolonie.png" },
  { name: "Hijra Bank", logo: "/assets/partners/hijra-bank.png" },
  { name: "BTN Syariah", logo: "/assets/partners/btn-syariah.png" },
  {
    name: "Jatisari Luxury Residence",
    logo: "/assets/partners/jatisari-residence.png",
  },
  { name: "Tasnim", logo: "/assets/partners/tasnim.png" },
  { name: "Salak View", logo: "/assets/partners/salak-view.png" },
  { name: "Rabbani Bintaro", logo: "/assets/partners/rabbani-bintaro.png" },
  { name: "Raudhatul Jannah", logo: "/assets/partners/raudhatul-jannah.png" },
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
              <img
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
