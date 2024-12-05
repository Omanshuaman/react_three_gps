"use client";
import { createContext, useContext, useState } from "react";

const ConfiguratorContext = createContext();

export const ConfiguratorProvider = ({ children }) => {
  const [mode, setMode] = useState(0);
  return (
    <ConfiguratorContext.Provider
      value={{
        mode,
        setMode,
      }}>
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  return useContext(ConfiguratorContext);
};
