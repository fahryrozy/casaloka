import React from "react";

const SkeletonHome: React.FC = () => {
  return (
    <div>
      <div className="skeleton-header"></div>
      <div className="skeleton-content"></div>
      <div className="skeleton-footer"></div>
    </div>
  );
};

export default SkeletonHome;
