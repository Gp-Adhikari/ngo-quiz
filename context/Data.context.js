import React, { useState, createContext } from "react";

export const DataContext = createContext(null);

const DataContextProvider = ({ children }) => {
  const [candidateName, setCandidateName] = useState("Gp Adhikari");

  return (
    <DataContext.Provider value={{ candidateName, setCandidateName }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
