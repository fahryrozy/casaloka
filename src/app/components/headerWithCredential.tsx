"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoginModal from "./login";
import SmoothScrollLink from "./smoothScrollLink";
import SideNav from "./sideNav";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";

const Header: React.FC = () => {
  const { data: socialAuthUser } = useSession();
  const [credentialAuthUser, setCredentialAuthUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setCredentialAuthUser(JSON.parse(storedUser));
    }
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu is open", isMenuOpen);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    if (socialAuthUser) {
      signOut(); // Next-Auth logout
    } else {
      Cookies.remove("token");
      Cookies.remove("user");
      setCredentialAuthUser(null);
      router.push("/login");
    }
  };

  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials.toUpperCase();
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

            {socialAuthUser || credentialAuthUser ? (
              <>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center"
                  >
                    {getInitials(
                      socialAuthUser?.user?.name ||
                        credentialAuthUser?.name ||
                        ""
                    )}
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                      <button
                        onClick={() => router.push("/profile")}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => router.push("/favorites")}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                      >
                        Favorites
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
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
