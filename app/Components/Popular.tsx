import React from "react";

function Popular() {
  return (
    <div className="w-full md:px-12 px-6 md:py-8 py-4 bg-blue-600 h-full block absolute top-full">
      <div className="text-3xl text-white">Popular among visitors</div>
      <div className="flex flex-wrap gap-2">
        <div className="w-[300px] h-[400px] bg-green-500">p</div>
        <div className="w-[300px] h-[400px] bg-green-500">p</div>
        <div className="w-[300px] h-[400px] bg-green-500">p</div>
      </div>
    </div>
  );
}

export default Popular;
