import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10 px-4">
      <div className="w-full">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo and Description */}
          <div>
            <Image
              src="/assets/logos/casaloka-logo.svg"
              alt="Casaloka"
              width={150}
              height={50}
              className="h-10 mb-4"
            />
            <p className="text-gray-400">
              Casaloka adalah platform Ekosistem Halal di Indonesia
            </p>
          </div>

          {/* Perusahaan Links */}
          <div>
            <h4 className="text-xl font-bold text-yellow-500 mb-4">
              Perusahaan
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Artikel
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Program Links */}
          <div>
            <h4 className="text-xl font-bold text-yellow-500 mb-4">Program</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Artikel
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base font-bold mb-4">
              Jadilah Yang Pertama <br />
              Langganan Newsletter Kami
            </h4>
            <div className="flex flex-col justify-center gap-2 mb-4">
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-yellow-500 bg-white text-gray-700"
                />
                <span className="absolute left-2 top-2.5 text-gray-400">
                  <i className="far fa-envelope"></i>
                </span>
              </div>
              <button className="w-2/3 bg-red-500 rounded-full px-4 py-2 text-white hover:bg-red-600">
                Berlangganan
              </button>
            </div>
            <p className="text-gray-400">Follow Us</p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-spotify"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Casaloka. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
