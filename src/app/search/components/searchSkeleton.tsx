import React from "react";

const SearchSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 mb-10">
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-32 bg-gray-300 animate-pulse rounded-md"
          ></div>
        ))}
      </div>
      <div className="flex flex-row gap-4 justify-center items-center">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="w-8 h-8 bg-gray-300 animate-pulse rounded-md"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SearchSkeleton;
