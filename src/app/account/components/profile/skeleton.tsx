import React from "react";

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded"></div>
    </div>
  );
};

export default ProfileSkeleton;
