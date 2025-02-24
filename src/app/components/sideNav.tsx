import React, { useEffect, useState } from "react";
import SmoothScrollLink from "./smoothScrollLink";
import { signOut as nextAuthSignOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { submitLogout } from "@utils/api/services/authService";
import { deleteCookie } from "cookies-next";
import { useAuth } from "@context/useAuth";

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
  const { data: session } = useSession();
  const { checkAuth, logout } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignOut = async () => {
    try {
      const { isAuthenticated, isNextAuth } = checkAuth();
      if (isAuthenticated) {
        if (isNextAuth) {
          // User is from next-auth
          await nextAuthSignOut();
        } else {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          await submitLogout();
          localStorage.removeItem("user");
        }
        onClose();
        logout();
        router.push("/");
      }
    } catch (error) {
      throw error;
    }
  };

  const { isAuthenticated } = checkAuth();

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
          className="hover:font-bold"
          onClick={onClose}
        >
          Beranda
        </SmoothScrollLink>
        <SmoothScrollLink
          href="/#about-us"
          className="hover:font-bold"
          onClick={onClose}
        >
          Tentang Kami
        </SmoothScrollLink>
        <SmoothScrollLink
          href="/#blog"
          className="hover:font-bold"
          onClick={onClose}
        >
          Artikel
        </SmoothScrollLink>
        <SmoothScrollLink
          href="/#contact-us"
          className="hover:font-bold"
          onClick={onClose}
        >
          Kontak
        </SmoothScrollLink>

        {isClient && isAuthenticated ? (
          <>
            <div className="relative">
              <button
                onClick={() => {
                  router.push("/account");
                  onClose();
                }}
                className="mb-4 block text-md hover:font-bold w-full text-left"
              >
                Akun
              </button>
              <button
                onClick={() => {
                  router.push("/#");
                  onClose();
                }}
                className="mb-4 block text-md hover:font-bold w-full text-left"
              >
                Rumah Impian
              </button>
              <button
                onClick={() => {
                  router.push("/#");
                  onClose();
                }}
                className="mb-4 block text-md hover:font-bold w-full text-left"
              >
                Favorite
              </button>
              <hr className="border-gray-300 mt-8" />
              <button
                onClick={handleSignOut}
                className="block mt-4 text-md hover:font-bold w-full text-left"
              >
                Log out
              </button>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </nav>
    </div>
  );
};

export default SideNav;
