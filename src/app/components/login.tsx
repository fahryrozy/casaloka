import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, SignInResponse } from "next-auth/react";
import { submitLoginCookie } from "@utils/api/services/authService";

interface LoginModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await submitLoginCookie({
        username,
        password,
        user_type: "",
      });

      if (result.status !== 200) {
        setError(result.message || "Login failed");
      } else {
        if (onClose) onClose();
        router.refresh();
      }
    } catch (error) {
      setError("Unexpected error occurred. Please try again later.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-[1000000]">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        {onClose && (
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        )}

        {/* Modal Content */}
        <h2 className="text-xl text-black font-bold mb-4">Log In</h2>

        {error && <p className="text-red-600">{error}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan email anda"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2" /> Ingat Saya
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Lupa Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Masuk"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">Atau</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="flex justify-between space-x-4">
          <button
            onClick={() => signIn("google")}
            className="flex-grow bg-gray-100 text-gray-600 py-2 rounded-md hover:bg-gray-200"
          >
            Masuk dengan Google
          </button>
          <button
            onClick={() => signIn("facebook")}
            className="flex-grow bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Masuk dengan Facebook
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-4">
          Belum punya akun Casaloka?{" "}
          <button
            onClick={() => {
              if (onClose) onClose();
              router.push("/register");
            }}
            className="text-blue-600 hover:underline"
          >
            Daftar Sekarang
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
