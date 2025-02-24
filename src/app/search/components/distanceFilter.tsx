import React from "react";

interface DistanceFilterProps {
  selectedDistance: string;
  handleDistanceChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  clearDistance?: () => void;
}

const DistanceFilter: React.FC<DistanceFilterProps> = ({
  selectedDistance,
  handleDistanceChange,
  clearDistance,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold mb-4">Atur Jarak</h3>
      <div className="flex items-center gap-2">
        <select
          value={selectedDistance}
          onChange={handleDistanceChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-lg"
        >
          <option value="0">Pilih Jarak</option>
          <option value="10">10KM</option>
          <option value="20">20KM</option>
          <option value="30">30KM</option>
        </select>
        <button
          onClick={clearDistance}
          className="bg-gray-300 text-gray-700 px-3 py-2 rounded-lg"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default DistanceFilter;
