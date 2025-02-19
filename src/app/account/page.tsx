"use client";
import { useState } from "react";
import { FaUser, FaCog, FaLock, FaQuestionCircle } from "react-icons/fa";

const menuItems = [
  { name: "Profil", icon: <FaUser /> },
  { name: "Pengaturan", icon: <FaCog /> },
  { name: "Keamanan", icon: <FaLock /> },
  { name: "Bantuan", icon: <FaQuestionCircle /> },
];

export default function Account() {
  const [selectedMenu, setSelectedMenu] = useState("Profil");
  const [formData, setFormData] = useState({
    name: "Muhammad Nauval",
    phone: "0822-5471-0345",
    email: "Nauval@casaloka.id",
    birthDate: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 pt-16">
      {/* Sidebar */}
      <aside className="w-1/4 bg-[#F6FAFF] p-6 shadow-lg">
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {selectedMenu}
        </h2>

        {selectedMenu === "Profil" && (
          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-600">Nama</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">No. Hp</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">Alamat Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">Tanggal Lahir</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">Alamat</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Tambahkan Alamat"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Simpan Perubahan
              </button>
              <button className="border px-4 py-2 rounded">Cancel</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded">
                Hapus Akun
              </button>
            </div>
          </form>
        )}
        {selectedMenu === "Keamanan" && (
          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-600">Kata Sandi</label>
              <input
                type="password"
                name="oldPassword"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">Kata Sandi Baru</label>
              <input
                type="password"
                name="newPassword"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">
                Konfirmasi Kata Sandi Baru
              </label>
              <input
                type="password"
                name="newPasswordConfirmation"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Ganti Kata Sandi
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
