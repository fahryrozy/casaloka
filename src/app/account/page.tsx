"use client";
import { useState, useEffect, useRef } from "react";
import { FaUser, FaCog, FaLock, FaQuestionCircle } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import Profile from "./components/profile";
import ProfileSkeleton from "./components/profile/skeleton";
import { editProfile, getProfile } from "@utils/api/services/userService";
import { useAuth } from "@context/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Security from "./components/security";

const menuItems = [
  { name: "Profil", icon: <FaUser /> },
  { name: "Pengaturan", icon: <FaCog /> },
  { name: "Keamanan", icon: <FaLock /> },
  { name: "Bantuan", icon: <FaQuestionCircle /> },
];

interface DropdownMenuProps {
  items: string[];
  onSelect: (item: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex sm:hidden text-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaGear />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          {items.map((item) => (
            <button
              key={item}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Account() {
  const { user, email } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Profil");
  const [profileFormData, setProfileFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: email || "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (email) {
          setIsLoading(true);
          const profileResponse = await getProfile({ email });
          const profileData = profileResponse.data.user_detail;
          setProfileFormData(profileData);
        }
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileFormData({ ...profileFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editProfile(profileFormData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 pt-16">
      {/* Sidebar */}
      <aside className="hidden sm:flex w-1/4 bg-[#F6FAFF] p-6 shadow-lg">
        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg transition ${
                selectedMenu === item.name
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedMenu(item.name)}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {selectedMenu}
          </h2>
          <DropdownMenu
            items={menuItems.map((item) => item.name)}
            onSelect={setSelectedMenu}
          />
        </div>

        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <>
            {selectedMenu === "Profil" && (
              <Profile
                formData={profileFormData}
                onSubmit={handleSubmit}
                handleChange={handleChange}
              />
            )}
            {selectedMenu === "Keamanan" && (
              <Security email={email} user={user} />
            )}
          </>
        )}
      </main>
      <ToastContainer />
    </div>
  );
}
