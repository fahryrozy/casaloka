import React from "react";

const SearchSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="w-full h-32 bg-gray-300 animate-pulse rounded-md"
        ></div>
      ))}
    </div>
  );
};

export default SearchSkeleton;
