import AdminHead from "./AdminHead";
import styles from "../../styles/panel.module.css";
import { useEffect, useRef, useState } from "react";

import { data } from "../../data/questions";

import Image from "next/image";
import gsap from "gsap";

const Survey = () => {
  const removePopupRef = useRef(null);

  const [questionInEnglish, setQuestionInEnglish] = useState("");
  const [questionInNepali, setQuestionInNepali] = useState("");

  const [answerInEnglish, setAnswerInEnglish] = useState("");
  const [answerInNepali, setAnswerInNepali] = useState("");

  const [englishAnswerInArray, setEnglishAnswerInArray] = useState([]);
  const [nepaliAnswerInArray, setNepaliAnswerInArray] = useState([]);

  const [selectedSurvey, setSelectedSurvey] = useState(undefined);

  // change answers to array
  useEffect(() => {
    try {
      const splitAnswer = answerInEnglish.split("\\\\");

      let answerInArray = [];
      for (let i = 0; i < splitAnswer.length; i++) {
        if (splitAnswer[i] === "") {
          continue;
        }

        if (splitAnswer[i] === " ") {
          continue;
        }

        const answer = splitAnswer[i].trim();

        answerInArray.push(answer);
      }

      setEnglishAnswerInArray(answerInArray);
    } catch (error) {}
  }, [answerInEnglish]);

  useEffect(() => {
    try {
      const splitAnswer = answerInNepali.split("\\\\");

      let answerInArray = [];
      for (let i = 0; i < splitAnswer.length; i++) {
        if (splitAnswer[i] === "") {
          continue;
        }

        if (splitAnswer[i] === " ") {
          continue;
        }

        const answer = splitAnswer[i].trim();

        answerInArray.push(answer);
      }

      setNepaliAnswerInArray(answerInArray);
    } catch (error) {}
  }, [answerInNepali]);

  const removeSurvey = (qno, id) => {
    try {
      setSelectedSurvey(qno);

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

  const closeRemoveSurvey = () => {
    try {
      if (selectedSurvey === undefined) return;

      setSelectedSurvey(undefined);

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
              <p>( Hint: Use \\ to write your next answer. )</p>
              <div>
                <textarea
                  placeholder="Answer 1. \\ Answer 2. \\ Answer 3."
                  value={answerInEnglish}
                  onChange={(e) => setAnswerInEnglish(e.target.value)}
                ></textarea>
                <textarea
                  placeholder="उत्तर १। \\ उत्तर २। \\ उत्तर ३।"
                  value={answerInNepali}
                  onChange={(e) => setAnswerInNepali(e.target.value)}
                ></textarea>
              </div>
            </div>

            <button>Submit</button>
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
                    {englishAnswerInArray[0] === undefined ? (
                      <div className={styles.answer}>
                        <div className={styles.circle}>
                          <div className={styles.innerCircle}></div>
                        </div>
                        <p>Answer</p>
                      </div>
                    ) : (
                      englishAnswerInArray.map((answer, index) => (
                        <div className={styles.answer} key={index}>
                          <div className={styles.circle}>
                            <div className={styles.innerCircle}></div>
                          </div>
                          <p>{answer}</p>
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
                    {nepaliAnswerInArray[0] === undefined ? (
                      <div className={styles.answer}>
                        <div className={styles.circle}>
                          <div className={styles.innerCircle}></div>
                        </div>
                        <p>उत्तर।</p>
                      </div>
                    ) : (
                      nepaliAnswerInArray.map((answer, index) => (
                        <div className={styles.answer} key={index}>
                          <div className={styles.circle}>
                            <div className={styles.innerCircle}></div>
                          </div>
                          <p>{answer}</p>
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
            {data === undefined || data[0] === undefined ? (
              <td colSpan={4}>No Data Available.</td>
            ) : (
              data.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.question}</td>
                  <td>
                    {data.answers.map((answer, idx) => (
                      <p key={idx}>
                        {idx + 1}. {answer}
                      </p>
                    ))}
                  </td>
                  <td>
                    <div className={styles.actionButton}>
                      <div className={styles.edit}>
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
                        onClick={(e) => removeSurvey(index + 1, data.id)}
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
                <button>Remove</button>
                <button onClick={() => closeRemoveSurvey()}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Survey;
