import React, { useState } from "react";
import { changePassword } from "@utils/api/services/userService";
import { toast } from "react-toastify";

interface SecurityProps {
  email: string;
  user: any;
}

const Security: React.FC<SecurityProps> = ({ email, user }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.newPasswordConfirmation) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    try {
      const response = await changePassword({
        password_lama: formData.oldPassword,
        password: formData.newPassword,
        ulangi_password: formData.newPasswordConfirmation,
      });

      if (response.status === 200) {
        toast.success("Password changed successfully!");
      } else {
        toast.error("Failed to change password. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="text-gray-600">Kata Sandi</label>
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-600">Kata Sandi Baru</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-600">Konfirmasi Kata Sandi Baru</label>
        <input
          type="password"
          name="newPasswordConfirmation"
          value={formData.newPasswordConfirmation}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ganti Kata Sandi
        </button>
      </div>
    </form>
  );
};

export default Security;
