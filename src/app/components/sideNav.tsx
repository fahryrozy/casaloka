import React from "react";
import SmoothScrollLink from "./smoothScrollLink";

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const SideNav: React.FC<SideNavProps> = ({
  isOpen,
  onClose,
  onLoginClick,
  onRegisterClick,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-2/3 bg-primary text-white transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{
        right: isOpen ? "0" : "-100%",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-end px-4 py-4">
        <button onClick={onClose} className="text-white focus:outline-none">
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-10 flex flex-col gap-4 px-4 text-left">
        <SmoothScrollLink
          href="/#home"
          className="hover:underline"
          onClick={onClose}
        >
          Beranda
        </SmoothScrollLink>
        <SmoothScrollLink
          href="/#about-us"
          className="hover:underline"
          onClick={onClose}
        >
          Tentang Kami
        </SmoothScrollLink>
        <SmoothScrollLink
          href="/#blog"
          className="hover:underline"
          onClick={onClose}
        >
          Artikel
        </SmoothScrollLink>
        <SmoothScrollLink
          href="/#contact-us"
          className="hover:underline"
          onClick={onClose}
        >
          Kontak
        </SmoothScrollLink>
        <button
          onClick={() => {
            onClose();
            onLoginClick();
          }}
          className="px-4 py-2 border border-white rounded text-white hover:bg-white hover:text-blue-600"
        >
          Masuk
        </button>
        <button
          onClick={() => {
            onClose();
            onRegisterClick();
          }}
          className="px-4 py-2 bg-white rounded text-primary hover:bg-gray-200"
        >
          Daftar
        </button>
      </nav>
    </div>
  );
};

export default SideNav;
