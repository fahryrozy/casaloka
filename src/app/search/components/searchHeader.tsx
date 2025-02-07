import { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHome,
} from "react-icons/fa";

// Button Component
export const Button = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Input Component
export const Input = ({ className, ...props }: { className?: string }) => {
  return (
    <input
      className={`border rounded-lg p-3 w-full shadow-sm ${className}`}
      {...props}
    />
  );
};

// Dropdown Components
export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative inline-block">{children}</div>;
};

export const DropdownMenuTrigger = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
};

export const DropdownMenuContent = ({
  children,
  show,
}: {
  children: React.ReactNode;
  show: boolean;
}) => {
  return show ? (
    <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-40">
      {children}
    </div>
  ) : null;
};

export const DropdownMenuItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Search Header Component
const SearchHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceSort, setPriceSort] = useState("Atur Harga");
  const [showPriceMenu, setShowPriceMenu] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="bg-blue-600 py-10 px-6 rounded-xl shadow-lg w-full">
        <div className="relative w-full max-w-3xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari rumah impian"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-3 w-full rounded-lg shadow-sm text-gray-800"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 bg-white p-3 rounded-b-xl w-[90%] shadow-md">
        {/* Distance Filter */}
        <Button className="text-gray-700">
          <FaMapMarkerAlt /> Jarak
        </Button>

        {/* Price Sorting Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger onClick={() => setShowPriceMenu(!showPriceMenu)}>
            <Button className="text-gray-700 border-gray-300">
              <FaHome /> {priceSort}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent show={showPriceMenu}>
            <DropdownMenuItem
              onClick={() => {
                setPriceSort("Harga Termurah");
                setShowPriceMenu(false);
              }}
            >
              Harga Termurah
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setPriceSort("Harga Termahal");
                setShowPriceMenu(false);
              }}
            >
              Harga Termahal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date Sorting */}
        <DropdownMenu>
          <DropdownMenuTrigger onClick={() => setShowDateMenu(!showDateMenu)}>
            <Button className="text-gray-700 border-gray-300">
              <FaCalendarAlt /> Tanggal Diterbitkan
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent show={showDateMenu}>
            <DropdownMenuItem onClick={() => setShowDateMenu(false)}>
              Terbaru
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowDateMenu(false)}>
              Terlama
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SearchHeader;
