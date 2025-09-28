"use client";
// app/Components/LoadingComponent.jsx

import React, { useEffect, useState } from "react";

const LoadingComponent = ({ duration = 3000 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(timer); // cleanup
  }, [duration]);

  if (!loading) return null;

  return (
    <div className="bg-gray-800 flex justify-center items-center h-screen  fixed inset-0 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      <span className="ml-4 text-lg text-blue-700">Please Wait...</span>
    </div>
  );
};

export default LoadingComponent;
