import React, { useState, createContext, useEffect } from "react";

export const DataContext = createContext(null);

const DataContextProvider = ({ children }) => {
  const [candidateName, setCandidateName] = useState("Gp Adhikari");
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [percentagePerQuestion, setPercentagePerQuestion] = useState([]);
  const [percentage, setPercentage] = useState(0);

  const [qualityText, setQualityText] = useState("");

  useEffect(() => {
    for (let i = 0; i < selectedAnswers.length; i++) {
      const answer = selectedAnswers[i];

      const selectedAnswer = parseInt(answer.selectedAnswer);
      const totalAnswers = parseInt(answer.totalAnswers);

      if (totalAnswers === 2) {
        if (selectedAnswer === totalAnswers) {
          setPercentage(100);
        } else {
          setPercentage(0);
        }
      }

      //if answers are more than 2
      const minPercentage = selectedAnswer / totalAnswers;

      const percentOfThisAnswer = minPercentage * 100;

      setPercentagePerQuestion([...percentagePerQuestion, percentOfThisAnswer]);
    }
  }, [selectedAnswers, setPercentagePerQuestion]);

  useEffect(() => {
    for (let i = 0; i < percentagePerQuestion.length; i++) {
      const percentOfThisQuestion = percentagePerQuestion[i];
      const prevPercentage = percentagePerQuestion[i - 1];

      const total =
        prevPercentage === undefined
          ? percentOfThisQuestion
          : (prevPercentage + percentOfThisQuestion) / 2;

      if (total < 20) {
        setQualityText(<p style={{ color: "red" }}>Poor</p>);
      } else if (total < 40) {
        setQualityText(<p style={{ color: "green" }}>Fair</p>);
      } else if (total < 60) {
        setQualityText(<p style={{ color: "green" }}>Good</p>);
      } else if (total < 80) {
        setQualityText(<p style={{ color: "lightgreen" }}>Very Good</p>);
      } else if (total <= 100) {
        setQualityText(<p style={{ color: "lightgreen" }}>Excellent</p>);
      }

      setPercentage(total);
    }

    // console.log(percentage, 11);
  }, [percentagePerQuestion, setPercentage]);

  return (
    <DataContext.Provider
      value={{
        candidateName,
        setCandidateName,
        selectedAnswers,
        setSelectedAnswers,
        percentage,
        qualityText,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
