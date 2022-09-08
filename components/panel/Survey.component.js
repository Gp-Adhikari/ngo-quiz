import AdminHead from "./AdminHead";
import styles from "../../styles/panel.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";

import Image from "next/image";
import gsap from "gsap";
import Answer from "./Answer.component";
import { TokenContext } from "../../context/Token.context";

const Survey = () => {
  const { questions, adminSocket } = useContext(TokenContext);

  const removePopupRef = useRef(null);
  const editPopupRef = useRef(null);
  const answersRef = useRef(null);

  const [questionInEnglish, setQuestionInEnglish] = useState("");
  const [questionInNepali, setQuestionInNepali] = useState("");

  const [answers, setAnswers] = useState([]);

  const [selectedSurvey, setSelectedSurvey] = useState(undefined);
  const [removeSelectedSurvey, setRemoveSelectedSurvey] = useState(undefined);

  const [clicks, setClicks] = useState(0);

  const [editedSurvey, setEditedSurvey] = useState({
    id: undefined,
    questionInEnglish: undefined,
    questionInNepali: undefined,
    answers: [],
  });

  const removeSurvey = (qno, id) => {
    try {
      setSelectedSurvey(qno);
      setRemoveSelectedSurvey(id);

      document.body.style.overflow = "hidden";

      gsap.fromTo(
        removePopupRef.current,
        {
          duration: 0.3,
          opacity: 0,
          display: "none",

          onComplete: () => {
            gsap.set(removePopupRef.current, { clearProps: "all" });
          },
        },
        {
          duration: 0.3,
          opacity: 1,
          display: "flex",
        }
      );
    } catch (error) {}
  };

  const editSurvey = (selectedQuestion) => {
    try {
      document.body.style.overflow = "hidden";

      setEditedSurvey({
        id: selectedQuestion.id,
        questionInEnglish: selectedQuestion.questionInEnglish,
        questionInNepali: selectedQuestion.questionInNepali,
        answers: JSON.parse(selectedQuestion.answers),
      });

      gsap.fromTo(
        editPopupRef.current,
        {
          duration: 0.3,
          opacity: 0,
          display: "none",

          onComplete: () => {
            gsap.set(editPopupRef.current, { clearProps: "all" });
          },
        },
        {
          duration: 0.3,
          opacity: 1,
          display: "flex",
        }
      );
    } catch (error) {}
  };

  const closeEditSurvey = () => {
    try {
      document.body.removeAttribute("style");

      gsap.fromTo(
        editPopupRef.current,
        {
          duration: 0.3,
          opacity: 1,
          display: "flex",
        },
        {
          duration: 0.3,
          opacity: 0,
          display: "none",

          onComplete: () => {
            gsap.set(editPopupRef.current, { clearProps: "all" });
          },
        }
      );
    } catch (error) {}
  };

  const handleRemoveSurvey = (removeSelectedSurvey) => {
    if (adminSocket !== null) {
      adminSocket.emit("remove-survey", {
        id: removeSelectedSurvey,
      });
    }

    setSelectedSurvey(undefined);
  };

  const closeRemoveSurvey = () => {
    try {
      document.body.removeAttribute("style");

      gsap.fromTo(
        removePopupRef.current,
        {
          duration: 0.3,
          opacity: 1,
          display: "flex",
        },
        {
          duration: 0.3,
          opacity: 0,
          display: "none",

          onComplete: () => {
            gsap.set(removePopupRef.current, { clearProps: "all" });
          },
        }
      );
    } catch (error) {}
  };

  const display = () => {
    try {
      let forms = [];
      for (let i = 0; i < clicks; i++) {
        forms.push(
          <Answer
            key={i}
            detectAnswerChange={detectAnswerChange}
            answers={answers}
            answerNumber={i + 1}
          />
        );
      }
      return forms || null;
    } catch (error) {}
  };

  //add answers
  const addAnswers = () => {
    try {
      setClicks(clicks + 1);

      const answersInElement = answersRef.current;

      setAnswers([
        ...answers,
        {
          answerNumber: answersInElement.children.length + 1,
          answerInEnglish: "",
          answerInNepali: "",
          points: "",
        },
      ]);
    } catch (error) {}
  };

  const detectAnswerChange = (e, answers) => {
    try {
      const value = e.target.value;
      const answerNumber = e.target.dataset.answernumber;
      const field = e.target.dataset.textfield;

      if (value !== undefined) {
        const findQuestion = answers.findIndex((question) => {
          return question.answerNumber == answerNumber;
        });

        let allAnswers = answers;

        if (field.toString() === "english") {
          allAnswers[findQuestion].answerInEnglish = value;
        }
        if (field.toString() === "nepali") {
          allAnswers[findQuestion].answerInNepali = value;
        }
        if (field.toString() === "points") {
          allAnswers[findQuestion].points = value;
        }
        setAnswers([...allAnswers]);
      }
    } catch (error) {}
  };

  const removeAnswer = () => {
    try {
      if (clicks <= 0) {
        return;
      }
      if (answers !== null || answers.length > 0) {
        setClicks(clicks - 1);
        const poppedAnswer = answers.slice(0, answers.length - 1);

        setAnswers(poppedAnswer);
        return;
      }
    } catch (error) {}
  };

  //addSurvey
  const addSurvey = () => {
    try {
      if (questionInEnglish === "" && questionInNepali === "") {
        return;
      }

      if (answers.length <= 0) {
        return;
      }

      if (adminSocket !== null) {
        adminSocket.emit("add-survey", {
          questionInEnglish: questionInEnglish,
          questionInNepali: questionInNepali,
          answers: answers,
        });

        setQuestionInEnglish("");
        setQuestionInNepali("");
        setClicks(0);
        setAnswers([]);
      }
    } catch (error) {}
  };

  const updateSurvey = (editedSurvey) => {
    if (editedSurvey.id === undefined) {
      return;
    }

    if (adminSocket !== null) {
      adminSocket.emit("update-survey", editedSurvey);
    }
  };

  return (
    <>
      <AdminHead title="Survey" />
      <div className={styles.addSurvey}>
        <h1>Add Survey</h1>
        <div className={styles.addSurveyContainer}>
          <div className={styles.surveyForm}>
            <h3>Question</h3>

            <div className={styles.inputContainer}>
              <p>English</p>
              <input
                type="text"
                value={questionInEnglish}
                onChange={(e) => setQuestionInEnglish(e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <p>Nepali</p>
              <input
                type="text"
                value={questionInNepali}
                onChange={(e) => setQuestionInNepali(e.target.value)}
              />
            </div>

            <h3>Answer</h3>
            <div className={styles.answer}>
              <div>
                <div ref={answersRef}>{display()}</div>
                <div className={styles.buttonWrapperForAnswer}>
                  <div
                    className={styles.addAnswers}
                    onClick={() => addAnswers()}
                  >
                    <span>+</span>
                  </div>
                  <div
                    className={styles.removeAnswers}
                    onClick={() => removeAnswer()}
                  >
                    <Image
                      src={"/remove.svg"}
                      alt="remove"
                      width={24}
                      height={24}
                      layout="fixed"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button onClick={(e) => addSurvey(e)}>Submit</button>
          </div>

          <div className={styles.demoContainer}>
            <div className={styles.demoSection}>
              <h3>Demo ( English )</h3>
              <div className={styles.demo}>
                <div className={styles.quiz}>
                  <div className={styles.questionWrapper}>
                    <p className={styles.number}>1</p>
                    <p className={styles.question}>
                      {questionInEnglish !== ""
                        ? questionInEnglish
                        : "Question?"}
                    </p>
                  </div>
                  <div className={styles.answerWrapper}>
                    {answers[0] === undefined ? (
                      <div className={styles.answer}>
                        <div className={styles.circle}>
                          <div className={styles.innerCircle}></div>
                        </div>
                        <p>Answer</p>
                      </div>
                    ) : (
                      answers.map((answer, index) => (
                        <div className={styles.answer} key={index}>
                          <div className={styles.circle}>
                            <div className={styles.innerCircle}></div>
                          </div>
                          <p>
                            {answer.answerInEnglish === ""
                              ? "Answer"
                              : answer.answerInEnglish}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.demoSection}>
              <h3>Demo ( Nepali )</h3>
              <div className={styles.demo}>
                <div className={styles.quiz}>
                  <div className={styles.questionWrapper}>
                    <p className={styles.number}>१</p>
                    <p className={styles.question}>
                      {questionInNepali !== "" ? questionInNepali : "प्रश्न?"}
                    </p>
                  </div>
                  <div className={styles.answerWrapper}>
                    {answers[0] === undefined ? (
                      <div className={styles.answer}>
                        <div className={styles.circle}>
                          <div className={styles.innerCircle}></div>
                        </div>
                        <p>उत्तर</p>
                      </div>
                    ) : (
                      answers.map((answer, index) => (
                        <div className={styles.answer} key={index}>
                          <div className={styles.circle}>
                            <div className={styles.innerCircle}></div>
                          </div>
                          <p>
                            {answer.answerInNepali === ""
                              ? "उत्तर"
                              : answer.answerInNepali}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <h1>Survey Questions</h1>

        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Question</th>
              <th>Answers</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {questions === null ? (
              <tr>
                <td colSpan={4}>No Data Available.</td>
              </tr>
            ) : questions[0] === undefined ? (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : (
              questions.map((question, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <p className={styles.marginBottom}>
                      {question.questionInEnglish}
                    </p>
                    <p>{question.questionInNepali}</p>
                  </td>
                  <td>
                    {question.answers === undefined
                      ? null
                      : JSON.parse(question.answers)[0] === undefined
                      ? null
                      : JSON.parse(question.answers).map((answer, idx) => (
                          <div className={styles.marginBottom} key={idx}>
                            <p className={styles.marginBottom05}>
                              {answer.answerNumber}. {answer.answerInEnglish}
                            </p>
                            <p>
                              {answer.answerNumber}. {answer.answerInNepali}
                            </p>
                          </div>
                        ))}
                  </td>
                  <td>
                    <div className={styles.actionButton}>
                      <div
                        className={styles.edit}
                        onClick={() => editSurvey(question)}
                      >
                        <Image
                          src={"/edit.svg"}
                          alt="edit"
                          height={20}
                          width={20}
                          layout="fixed"
                        />
                      </div>
                      <div
                        className={styles.remove}
                        onClick={(e) => removeSurvey(index + 1, question.id)}
                      >
                        <Image
                          src={"/remove.svg"}
                          alt="edit"
                          height={20}
                          width={20}
                          layout="fixed"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className={styles.removePopup} ref={editPopupRef}>
          <div className={styles.hide} onClick={(e) => closeEditSurvey()}></div>
          <div className={styles.popup}>
            <div className={styles.popupHeader}>
              <h3>Edit</h3>
              <Image
                src={"/close.svg"}
                width={20}
                height={20}
                layout="fixed"
                alt="close"
                className={styles.img}
                onClick={(e) => closeEditSurvey()}
              />
            </div>

            <div className={styles.popupContent}>
              <div className={styles.inputs}>
                <p>Question</p>
                <div className={styles.actualInputs}>
                  <div className={styles.inputHolder}>
                    <p>English</p>
                    <textarea
                      value={
                        editedSurvey.questionInEnglish !== undefined
                          ? editedSurvey.questionInEnglish
                          : ""
                      }
                      onChange={(e) =>
                        setEditedSurvey((prevState) => ({
                          ...prevState,
                          questionInEnglish: e.target.value,
                        }))
                      }
                    ></textarea>
                  </div>
                  <div className={styles.inputHolder}>
                    <p>Nepali</p>
                    <textarea
                      value={
                        editedSurvey.questionInNepali !== undefined
                          ? editedSurvey.questionInNepali
                          : ""
                      }
                      onChange={(e) =>
                        setEditedSurvey((prevState) => ({
                          ...prevState,
                          questionInNepali: e.target.value,
                        }))
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className={styles.inputs}>
                <p>Answers</p>
                {editedSurvey.answers[0] !== undefined &&
                  editedSurvey.answers.map((answer) => (
                    <div
                      className={styles.actualInputs}
                      key={answer.answerNumber}
                    >
                      <div className={styles.inputHolder}>
                        <h4>Answer {answer.answerNumber}</h4>
                        <p>English</p>
                        <textarea
                          value={answer.answerInEnglish}
                          onChange={(e) => {
                            const objIndex = editedSurvey.answers.findIndex(
                              (obj) => obj.answerNumber === answer.answerNumber
                            );
                            const currentlyEditedAnswer = editedSurvey.answers;

                            currentlyEditedAnswer[objIndex].answerInEnglish =
                              e.target.value;

                            setEditedSurvey((prevState) => ({
                              ...prevState,
                              answers: currentlyEditedAnswer,
                            }));
                          }}
                        ></textarea>
                      </div>
                      <div className={styles.inputHolder}>
                        <p>Nepali</p>
                        <textarea
                          value={answer.answerInNepali}
                          onChange={(e) => {
                            const objIndex = editedSurvey.answers.findIndex(
                              (obj) => obj.answerNumber === answer.answerNumber
                            );
                            const currentlyEditedAnswer = editedSurvey.answers;

                            currentlyEditedAnswer[objIndex].answerInNepali =
                              e.target.value;

                            setEditedSurvey((prevState) => ({
                              ...prevState,
                              answers: currentlyEditedAnswer,
                            }));
                          }}
                        ></textarea>
                      </div>
                      <div className={styles.inputHolder}>
                        <p>Points</p>
                        <input
                          type="number"
                          value={
                            answer.points === "" ? "" : parseInt(answer.points)
                          }
                          onChange={(e) => {
                            const objIndex = editedSurvey.answers.findIndex(
                              (obj) => obj.answerNumber === answer.answerNumber
                            );
                            const currentlyEditedAnswer = editedSurvey.answers;

                            currentlyEditedAnswer[objIndex].points =
                              e.target.value;

                            setEditedSurvey((prevState) => ({
                              ...prevState,
                              answers: currentlyEditedAnswer,
                            }));
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <div className={styles.buttons}>
                <button
                  onClick={() => {
                    updateSurvey(editedSurvey);
                    closeEditSurvey();
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.removePopup} ref={removePopupRef}>
          <div
            className={styles.hide}
            onClick={() => closeRemoveSurvey()}
          ></div>
          <div className={styles.popup}>
            <div className={styles.popupHeader}>
              <h3>Remove</h3>
              <Image
                src={"/close.svg"}
                width={20}
                height={20}
                layout="fixed"
                alt="close"
                className={styles.img}
                onClick={() => closeRemoveSurvey()}
              />
            </div>

            <div className={styles.popupContent}>
              <p>
                Are you sure you want to remove Question{" "}
                {selectedSurvey === undefined ? "" : selectedSurvey} ?
              </p>

              <div className={styles.buttons}>
                <button
                  onClick={() => {
                    handleRemoveSurvey(removeSelectedSurvey);
                    closeRemoveSurvey();
                  }}
                >
                  Remove
                </button>
                <button
                  onClick={() => {
                    closeRemoveSurvey();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Survey;
