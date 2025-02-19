import React from "react";

const NoProperties: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
      <p className="text-gray-600">
        Try adjusting your search or filter to find what you are looking for.
      </p>
    </div>
  );
};

export default NoProperties;
