import React from "react";

const BaseTemplate = ({ data, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg mx-auto w-full max-w-4xl min-h-[297mm] overflow-hidden">
      <div className="w-full h-full scale-75 sm:scale-90 md:scale-95 lg:scale-100 origin-top-left transform-gpu">
        {children}
      </div>
    </div>
  );
};

export default BaseTemplate;
