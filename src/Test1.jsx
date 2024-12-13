import React from "react";

const Test1 = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      {/* Outer Frame */}
      <div className="relative w-[600px] h-[400px] bg-black rounded-lg overflow-hidden">
        {/* Blue Corners */}
        <div className="absolute inset-0 flex justify-between items-start p-0">
          {/* Top Left Corner */}
          <span className="w-14 h-14 border-t-8 border-l-8 border-blue-500 rounded-tl-lg"></span>
          {/* Top Right Corner */}
          <span className="w-14 h-14 border-t-8 border-r-8 border-blue-500 rounded-tr-lg"></span>
        </div>
        <div className="absolute inset-0 flex justify-between items-end p-2">
          {/* Bottom Left Corner */}
          <span className="w-14 h-14 border-b-8 border-l-8 border-blue-500 rounded-bl-lg"></span>
          {/* Bottom Right Corner */}
          <span className="w-14 h-14 border-b-8 border-r-8 border-blue-500 rounded-br-lg"></span>
        </div>
      </div>
    </div>
  );
};

export default Test1;
