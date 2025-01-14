import React from "react";

interface PartnerLogoProps {
  src: string;
  alt: string;
}

const PartnerLogo: React.FC<PartnerLogoProps> = ({ src, alt }) => {
  return (
    <div className="flex justify-center items-center">
      <img src={src} alt={alt} className="h-12 mx-4" />
    </div>
  );
};

const LksPartner: React.FC = () => {
  const partners = [
    {
      src: "https://via.placeholder.com/120x50?text=Hijra+Bank",
      alt: "Hijra Bank",
    },
    {
      src: "https://via.placeholder.com/120x50?text=BSI",
      alt: "Bank Syariah Indonesia",
    },
    {
      src: "https://via.placeholder.com/120x50?text=Dana+Syariah",
      alt: "Dana Syariah",
    },
    {
      src: "https://via.placeholder.com/120x50?text=BTN+Syariah",
      alt: "BTN Syariah",
    },
    {
      src: "https://via.placeholder.com/120x50?text=BPRS+Al+Salaam",
      alt: "BPRS Al Salaam",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">
          Partner Lembaga{" "}
          <span className="text-blue-600">Keuangan Syariah</span>
        </h2>
        <p className="text-gray-600 mt-4">
          Casaloka.id bekerja sama dengan lembaga keuangan syariah terpercaya
          untuk menyediakan solusi pembiayaan sesuai prinsip syariah.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {partners.map((partner, index) => (
            <PartnerLogo key={index} src={partner.src} alt={partner.alt} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LksPartner;
