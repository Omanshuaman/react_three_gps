import React, { createContext, useState, useContext } from "react";

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const toggleModel = () => {
    setIsModelOpen((prev) => !prev);
  };

  return (
    <ModelContext.Provider value={{ isModelOpen, toggleModel }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  return useContext(ModelContext);
};
