import React, { useState, createContext, useEffect, useContext } from "react";
import { TokenContext } from "./Token.context";

export const DataContext = createContext(null);

const DataContextProvider = ({ children }) => {
  const { activeUsersSocket, questions } = useContext(TokenContext);

  const [candidateName, setCandidateName] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [percentagePerQuestion, setPercentagePerQuestion] = useState([]);
  const [percentage, setPercentage] = useState(0);

  const [qualityText, setQualityText] = useState("");

  useEffect(() => {
    try {
      for (let i = 0; i < selectedAnswers.length; i++) {
        const answer = selectedAnswers[i];

        setPercentagePerQuestion([...percentagePerQuestion, answer.points]);
      }
    } catch (error) {}
  }, [selectedAnswers, setPercentagePerQuestion]);

  useEffect(() => {
    try {
      //calculate points
      for (let i = 0; i < percentagePerQuestion.length; i++) {
        const percentOfThisQuestion = percentagePerQuestion[i];
        const prevPercentage = percentagePerQuestion[i - 1];

        const total =
          prevPercentage === undefined
            ? percentOfThisQuestion
            : prevPercentage + percentOfThisQuestion;

        if (total < 20) {
          setQualityText(<p style={{ color: "red" }}>Poor</p>);
        } else if (total < 40) {
          setQualityText(<p style={{ color: "green" }}>Fair</p>);
        } else if (total < 60) {
          setQualityText(<p style={{ color: "green" }}>Good</p>);
        } else if (total < 80) {
          setQualityText(<p style={{ color: "lightgreen" }}>Very Good</p>);
        } else if (total < 100) {
          setQualityText(<p style={{ color: "lightgreen" }}>Excellent</p>);
        } else if (total >= 100) {
          setQualityText(<p style={{ color: "lightgreen" }}>Outstanding</p>);
        }

        setPercentage(total);

        if (
          questions.length !== 0 &&
          percentagePerQuestion.length === questions.length &&
          i === percentagePerQuestion.length - 1
        ) {
          if (activeUsersSocket !== null) {
            activeUsersSocket.emit("add-candidate", {
              candidateName: candidateName,
              score: total,
            });
          }
        }
      }
    } catch (error) {}
  }, [percentagePerQuestion, setPercentage, questions]);

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
