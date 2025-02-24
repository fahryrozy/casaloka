import Image from "next/image";

const AboutUs: React.FC = () => {
  return (
    <section id="about-us" className="px-4 py-16">
      <div className="container mt-10 mx-auto text-center">
        <h2 className="text-3xl text-gray-600 font-bold mb-6">
          Mengapa memilih <span className="text-blue-600">Casaloka</span>?
        </h2>
        <p className="text-gray-600 mb-10">
          Casaloka adalah platform Ekosistem Halal di Indonesia yang menyediakan
          sepeda motor, mobil, properti, serta service keuangan dan Haji atau
          Umrah. Dengan pengalaman 10 tahun, kami menawarkan service terbaik
          untuk Anda dan keluarga. Casaloka,{" "}
          <span className="text-primary font-semibold">#Bangga Bersyariah</span>
          .
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
              <Image
                src="/assets/icons/halal.svg"
                alt="Halal"
                width={100}
                height={100}
                className="h-8 w-8"
              />
            </div>
            <h4 className="font-bold h-16 text-xl">
              Ekosistem Halal Terintegrasi
            </h4>
            <p className="text-gray-600">
              Menawarkan properti yang sepenuhnya sesuai dengan prinsip syariah.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
              <Image
                src="/assets/icons/exp.svg"
                alt="Experience"
                width={100}
                height={100}
                className="h-8 w-8"
              />
            </div>
            <h4 className="font-bold h-16 text-xl">Pengalaman 10 Tahun</h4>
            <p className="text-gray-600">
              Kami menyediakan service yang handal dan berpengalaman.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
              <Image
                src="/assets/icons/service.svg"
                alt="Service"
                width={100}
                height={100}
                className="h-8 w-8"
              />
            </div>
            <h4 className="font-bold h-16 text-xl">
              Layanan Pelanggan yang Terbaik
            </h4>
            <p className="text-gray-600">
              Tim profesional kami siap membantu Anda dengan service yang
              responsif dan berkualitas.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
              <Image
                src="/assets/icons/commitments.svg"
                alt="Commitment"
                width={100}
                height={100}
                className="h-8 w-8"
              />
            </div>
            <h4 className="font-bold h-16 text-xl">Komitmen</h4>
            <p className="text-gray-600">
              Menyediakan solusi properti yang mendukung gaya hidup keluarga dan
              komunitas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
