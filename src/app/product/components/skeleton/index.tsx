import React from "react";

const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="container mx-auto px-4 py-8 mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Section */}
          <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
            <div className="w-full h-96 bg-gray-300 animate-pulse"></div>
            <div className="flex flex-row w-full h-36 gap-4">
              <div className="w-full h-20 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-20 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-20 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-20 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-20 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-20 bg-gray-300 animate-pulse"></div>
            </div>
            <div className="w-full h-[60%] bg-gray-300 animate-pulse"></div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col col-span-2 gap-4">
            <div className="w-full h-32 bg-gray-300 animate-pulse"></div>
            <div className="w-full h-20 bg-gray-300 animate-pulse"></div>
            <div className="w-full h-24 bg-gray-300 animate-pulse"></div>
            <div className="w-full h-28 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
