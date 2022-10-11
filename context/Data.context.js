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

  const [localStorageSavedCandidates, setLocalStorageSavedCandidates] =
    useState(undefined);

  const [editedLocalStorage, setEditedLocalStorage] = useState(undefined);

  //seperate points
  useEffect(() => {
    try {
      for (let i = 0; i < selectedAnswers.length; i++) {
        const answer = selectedAnswers[i];

        setPercentagePerQuestion([
          ...percentagePerQuestion,
          parseFloat(answer.points),
        ]);
      }
    } catch (error) {}
  }, [selectedAnswers, setPercentagePerQuestion]);

  //calculate result
  useEffect(() => {
    if (questions !== null && questions.length > 0) {
      if (questions.length === percentagePerQuestion.length) {
        const total = percentagePerQuestion.reduce(
          (partialSum, a) => partialSum + a,
          0
        );

        if (total < 40) {
          setQualityText(<p style={{ color: "red" }}>Unacceptable</p>);
        } else if (total < 60) {
          setQualityText(<p style={{ color: "red" }}>Bad</p>);
        } else if (total < 80) {
          setQualityText(<p style={{ color: "green" }}>Good</p>);
        } else if (total < 100) {
          setQualityText(<p style={{ color: "lightgreen" }}>Excellent</p>);
        } else if (total >= 100) {
          setQualityText(<p style={{ color: "lightgreen" }}>Outstanding</p>);
        }

        setPercentage(total);

        try {
          //get localStorageSavedCandidates if available
          const lsData = localStorage.getItem("savedCandidates");

          if (lsData != null) {
            const totalSavedCandidates = 10;

            const lsDataInArray = JSON.parse(lsData);
            const filteredLsDataArray = lsDataInArray.filter((el) => {
              return (
                el.candidateName.toLowerCase() !== candidateName.toLowerCase()
              );
            });

            //if totalSavedCandidates
            if (filteredLsDataArray.length >= totalSavedCandidates) {
              filteredLsDataArray.shift();
              const newLsDataArray = [
                ...filteredLsDataArray,
                {
                  candidateName: candidateName,
                  score: total,
                },
              ];
              localStorage.setItem(
                "savedCandidates",
                JSON.stringify(newLsDataArray)
              );

              setEditedLocalStorage(newLsDataArray);
            } else {
              const newLsDataArray = [
                ...filteredLsDataArray,
                {
                  candidateName: candidateName,
                  score: total,
                },
              ];

              localStorage.setItem(
                "savedCandidates",
                JSON.stringify(newLsDataArray)
              );
              setEditedLocalStorage(newLsDataArray);
            }
          } else {
            const dataToSave = {
              candidateName: candidateName,
              score: total,
            };

            localStorage.setItem(
              "savedCandidates",
              `[${JSON.stringify(dataToSave)}]`
            );
            setEditedLocalStorage([dataToSave]);
          }
        } catch (error) {}

        if (activeUsersSocket !== null) {
          activeUsersSocket.emit("add-candidate", {
            candidateName: candidateName,
            score: total,
          });
        }
      }
    }
  }, [percentagePerQuestion, questions]);

  //set setLocalStorageSavedCandidates
  useEffect(() => {
    setLocalStorageSavedCandidates(
      editedLocalStorage !== undefined
        ? editedLocalStorage.reverse()
        : editedLocalStorage
    );
  }, [editedLocalStorage]);

  return (
    <DataContext.Provider
      value={{
        candidateName,
        setCandidateName,
        selectedAnswers,
        setSelectedAnswers,
        percentage,
        qualityText,
        setPercentagePerQuestion,
        setPercentage,
        setQualityText,
        localStorageSavedCandidates,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
