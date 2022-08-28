import React, { useState, createContext, useEffect } from "react";

export const DataContext = createContext(null);

const DataContextProvider = ({ children }) => {
  const [candidateName, setCandidateName] = useState("Gp Adhikari");
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    console.log(selectedAnswers);
  }, [selectedAnswers]);

  return (
    <DataContext.Provider
      value={{
        candidateName,
        setCandidateName,
        selectedAnswers,
        setSelectedAnswers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
