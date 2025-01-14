import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoginModal from "./login";
import SmoothScrollLink from "./smoothScrollLink";
import SideNav from "./sideNav";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu is open", isMenuOpen);
  };

  return (
    <header className="bg-primary fixed w-full z-[1000] text-white py-4 shadow-md">
      <div className="px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-start">
          <SmoothScrollLink href="/" className="font-bold text-lg">
            <Image
              src="/assets/logos/casaloka-logo.svg"
              alt="Casaloka"
              className="h-8"
              width={120}
              height={40}
            />
          </SmoothScrollLink>
        </div>
        <div className="flex flex-end items-center space-x-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 justify-center items-center">
            <SmoothScrollLink href="/#home" className="hover:underline">
              Beranda
            </SmoothScrollLink>
            <SmoothScrollLink href="/#about-us" className="hover:underline">
              Tentang Kami
            </SmoothScrollLink>
            <SmoothScrollLink href="/#blog" className="hover:underline">
              Artikel
            </SmoothScrollLink>
            <SmoothScrollLink href="/#contact-us" className="hover:underline">
              Kontak
            </SmoothScrollLink>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 border border-white rounded text-white hover:bg-white hover:text-blue-600"
            >
              Masuk
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-4 py-2 bg-white rounded text-primary hover:bg-gray-200"
            >
              Daftar
            </button>
          </nav>
          {/* Hamburger Menu */}
          <div className="sm:hidden">
            <button onClick={toggleMenu} className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <SideNav
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        onLoginClick={() => setIsModalOpen(true)}
        onRegisterClick={() => router.push("/register")}
      />
      {/* Login Modal */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;
