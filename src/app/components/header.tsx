"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import LoginModal from "./login";
import SmoothScrollLink from "./smoothScrollLink";
import SideNav from "./sideNav";
import { signOut, useSession } from "next-auth/react";
import { FaBell, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useAuth } from "@context/useAuth";
import { submitLogout } from "../../utils/api/services/authService";

const Header: React.FC = () => {
  const { data: session } = useSession();
  const { checkAuth, user, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials.toUpperCase();
  };

  const handleLogout = async () => {
    const { isAuthenticated, isNextAuth } = checkAuth();
    if (isAuthenticated) {
      if (isNextAuth) {
        await signOut();
      } else {
        await submitLogout();
      }
      logout();
      router.push("/");
    }
  };
  const { isAuthenticated } = checkAuth();

  return (
    <header className="bg-primary fixed w-full z-[1000] text-white py-4 shadow-md">
      <div className="px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-start">
          <SmoothScrollLink href="/" className="font-bold text-xl">
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

            {isClient && isAuthenticated ? (
              <>
                <div className="relative" ref={dropdownRef}>
                  <div className="relative flex flex-row gap-4">
                    <button className="w-10 h-10 rounded-full bg-white text-blue-500 flex items-center justify-center">
                      <FaBell />
                    </button>
                    <button
                      onClick={toggleDropdown}
                      className="flex flex-row items-center space-x-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center">
                        {getInitials(user ? user.name : "")}
                      </div>
                      {user ? <p>{user.name}</p> : <p>{session?.user?.name}</p>}
                      {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute flex flex-col px-4 gap-2 -right-2 mt-4 w-72 bg-white text-black rounded-md shadow-2xl z-50">
                      <button
                        onClick={() => {
                          router.push("/account");
                          setIsDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm hover:font-bold w-full text-left"
                      >
                        Akun
                      </button>
                      <button
                        onClick={() => {
                          router.push("/#");
                          setIsDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm hover:font-bold w-full text-left"
                      >
                        Rumah Impian
                      </button>
                      <button
                        onClick={() => {
                          router.push("/#");
                          setIsDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm hover:font-bold w-full text-left"
                      >
                        Favorite
                      </button>
                      <hr />
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm mb-10 hover:font-bold w-full text-left"
                      >
                        Log out
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
