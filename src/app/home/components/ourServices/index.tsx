import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-lg h-72 group"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
      {/* Text Content */}
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const servicesData = [
    {
      title: "Properti",
      description:
        "Casaloka.id menawarkan berbagai properti dengan cicilan melalui lembaga keuangan syariah terpercaya.",
      imageUrl: "/assets/images/property.png",
    },
    {
      title: "Haji & Umrah",
      description:
        "Casaloka.id menyediakan layanan untuk mempermudah perjalanan haji dan umrah sesuai prinsip syariah.",
      imageUrl: "/assets/images/umroh.png",
    },
    {
      title: "Cicilan Kendaraan",
      description:
        "Casaloka.id menawarkan solusi cicilan kendaraan melalui lembaga keuangan syariah terpercaya.",
      imageUrl: "/assets/images/kendaraan.png",
    },
    {
      title: "Restoran Halal",
      description:
        "Casaloka.id merekomendasikan restoran halal yang mematuhi standar syariah untuk pengalaman kuliner yang sesuai dengan prinsip kehalalan.",
      imageUrl: "/assets/images/resto-halal.png",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-center text-3xl font-bold mb-8">
          Layanan <span className="text-primary">Kami</span>
        </h2>
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
