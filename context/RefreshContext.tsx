import React, { createContext, useState, useContext } from "react";

interface RefreshContextType {
  refresh: boolean;
  triggerRefresh: () => void;
}

const RefreshContext = createContext<RefreshContextType | null>(null);

export const RefreshProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <RefreshContext.Provider value={{ refresh, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = (): RefreshContextType => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error("UseRefresh ser Utilizado dentro de um RefreshProvider");
  }
  return context;
};
