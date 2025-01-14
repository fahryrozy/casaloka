import React from "react";

const FilterSidebar = () => {
  return (
    <div className="hidden sm:flex flex-col sm:w-64 bg-white shadow-lg p-4">
      <h3 className="font-bold mb-4">Kategori</h3>
      <ul className="space-y-2">
        <li>
          <label>
            <input type="checkbox" className="mr-2" /> Baru
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" className="mr-2" /> Bekas
          </label>
        </li>
        <h3 className="font-bold mt-6 mb-4">Properti</h3>
        <li>
          <label>
            <input type="checkbox" className="mr-2" /> Digital Rumah & Apartemen
          </label>
        </li>
      </ul>

      <h3 className="font-bold mt-6 mb-4">Indonesia</h3>
      <ul className="space-y-2">
        <li>
          <label>
            <input type="checkbox" className="mr-2" /> DKI Jakarta
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" className="mr-2" /> Jawa Barat
          </label>
        </li>
      </ul>

      <h3 className="font-bold mt-6 mb-4">Sertifikasi</h3>
      <ul className="space-y-2">
        <li>
          <label>
            <input type="checkbox" className="mr-2" /> SHM - Sertifikat Hak
            Milik
          </label>
        </li>
      </ul>
    </div>
  );
};

export default FilterSidebar;
