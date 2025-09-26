// app/Components/LoadingProvider.jsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "./LoadingComponent";

export default function LoadingProvider({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [pathname]); // runs whenever route changes

  return (
    <>
      {loading && <LoadingComponent duration={3000} />}
      {children}
    </>
  );
}
