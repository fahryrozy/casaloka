import React from "react";

interface ProfileProps {
  formData: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Profile: React.FC<ProfileProps> = ({
  formData,
  onSubmit,
  handleChange,
}) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="flex flex-col">
        <label className="text-gray-600">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-600">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-600">Phone Number</label>
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-600">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          disabled
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan Perubahan
        </button>
        <button type="button" className="border px-4 py-2 rounded">
          Cancel
        </button>
        <button
          type="button"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Hapus Akun
        </button>
      </div>
    </form>
  );
};

export default Profile;
