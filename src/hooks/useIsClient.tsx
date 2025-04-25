"use client";

import { createContext, useContext, useEffect, useState } from "react";

const IsClientContext = createContext(false);

export const useIsClient = () => {
  return useContext(IsClientContext);
};

export const IsClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <IsClientContext.Provider value={isClient}>
      {children}
    </IsClientContext.Provider>
  );
};
