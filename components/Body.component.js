import React, { useRef, useEffect, useState, useContext } from "react";

import styles from "../styles/body.module.css";
import Image from "next/image";
import { AnimationContext } from "../context/Animation.context";
import { DataContext } from "../context/Data.context";

import gsap, { Power2 } from "gsap";
import { TokenContext } from "../context/Token.context";
import calculateScoreText from "./calculateScoreText";

const Body = () => {
  const {
    candidateName,
    setCandidateName,
    selectedAnswers,
    setSelectedAnswers,
    localStorageSavedCandidates,
  } = useContext(DataContext);

  const { language, presentationText, questions, candidate, candidates } =
    useContext(TokenContext);

  const { setInitialAnimationHandler, headerRef } =
    useContext(AnimationContext);

  const imgRef = useRef(null);
  const formRef = useRef(null);
  const lineRef = useRef(null);
  const quizContainerRef = useRef(null);
  const disclaimerRef = useRef(null);

  const quizHolderRef = useRef(null);
  const answersRef = useRef(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [searchedCandidate, setSearchedCandidate] = useState("");

  const [returnedSearchedCandidateValue, setReturnedSearchedCandidateValue] =
    useState([]);

  const [selectedComapareCandidates, setSelectedComapareCandidates] = useState(
    []
  );

  const resultRef = useRef(null);
  const [isElementVisible, setIsElementVisible] = useState(true);

  const [error, setError] = useState("");

  //add ting sound when question is missed
  useEffect(() => {
    try {
      if (!isElementVisible) {
        new Audio("/ting.mp3").play();
      }
    } catch (error) {}
  }, [isElementVisible]);

  //set setIsElementVisible if element is visible or not
  useEffect(() => {
    try {
      const quizElement = quizHolderRef.current;

      //check if element is inside
      const isScrolledIntoView = (quizHolderRef, currentQuestion) => {
        try {
          const currentElement =
            quizHolderRef.current.children[currentQuestion];
          const rect = currentElement.getBoundingClientRect();
          const mainRect = quizHolderRef.current.getBoundingClientRect();
          const elemTop = rect.top;
          const elemBottom = rect.bottom;

          return (
            elemTop + 80 < mainRect.height + mainRect.top &&
            elemBottom - 40 >= mainRect.top
          );
        } catch (error) {}
      };

      const onScroll = () =>
        setTimeout(() => {
          setIsElementVisible(
            isScrolledIntoView(quizHolderRef, currentQuestion)
          );
        }, 600);

      // clean up code
      quizElement.removeEventListener("scroll", onScroll);
      quizElement.addEventListener("scroll", onScroll, {
        passive: true,
      });
      return () => quizElement.removeEventListener("scroll", onScroll);
    } catch (error) {}
  }, [quizHolderRef, currentQuestion]);

  //get searched candidates
  const searchedData = (searchedValue) => {
    if (candidates !== null && candidates.length > 0) {
      if (searchedValue.length === 0) {
        setTimeout(() => {
          setReturnedSearchedCandidateValue([null]);
        }, 200);
      } else {
        const value = candidates.filter((str) => {
          return str.name.toLowerCase().includes(searchedValue.toLowerCase());
        });
        if (value[0] === undefined) {
          return setReturnedSearchedCandidateValue([null]);
        }
        return setReturnedSearchedCandidateValue(value);
      }
    }
  };

  // focus question
  useEffect(() => {
    try {
      if (quizHolderRef === null) return;
      if (answersRef === null) return;

      const allQuestions = quizHolderRef.current.children;

      for (let i = 0; i < allQuestions.length; i++) {
        if (i !== currentQuestion) {
          allQuestions[i].style = `
          pointer-events: none;
          opacity: 0.4;
          `;
        } else {
          quizHolderRef.current.scrollTop = allQuestions[i].offsetTop - 120;

          allQuestions[i].style = `
          pointer-events: all;
          opacity: 1;
          `;
          allQuestions[i].focus();
        }
      }
    } catch (error) {}
  }, [quizHolderRef, answersRef, currentQuestion]);

  //on candidate's name submit
  const submitName = (e) => {
    try {
      e.preventDefault();

      const tl = new gsap.timeline();

      if (candidateName === "") {
        setError("empty");
        return;
      }

      if (candidateName.length > 100) {
        setError("maxLimit");
        return;
      }

      if (candidateName.length < 3) {
        setError("minLimit");
        return;
      }

      const flname = candidateName.split(" ");

      if (
        flname[0] === "" ||
        flname[1] === "" ||
        flname[0] === undefined ||
        flname[1] === undefined
      ) {
        setError("fullname");
        return;
      }

      setError("");
      setInitialAnimationHandler(true);

      setTimeout(() => {
        tl.to(headerRef.current, 0.3, {
          opacity: 0,
        })
          .to(formRef.current.children, 0.3, {
            y: -20,
            opacity: 0,
            stagger: {
              each: 0.1,
              ease: Power2.easeInOut,
            },
          })
          .to(formRef.current, 0.1, { display: "none" })
          .to(imgRef.current, 0.3, { y: -50, opacity: 0 })
          .to(lineRef.current, 0.5, {
            top: 0,
            height: "100vh",
            ease: Power2.easeInOut,
          })
          .to(lineRef.current, 0.5, {
            left: 0,
            width: "100%",
            ease: Power2.easeInOut,
          })
          .to(headerRef.current, 0.3, {
            opacity: 1,
          })
          .to(quizContainerRef.current, 0.3, {
            display: "block",
            opacity: 1,
          });
      }, 100);
    } catch (error) {}
  };

  //submit Answer
  const submitAnswer = (e, actualAnswer) => {
    try {
      const ans = e.target.children[1].innerText;

      const answersOfTheQuestion =
        quizHolderRef.current.children[currentQuestion].children[1].children;

      for (let i = 0; i < answersOfTheQuestion.length; i++) {
        const answer = answersOfTheQuestion[i].children[1].innerText;

        if (answer === ans) {
          answersOfTheQuestion[i].style.backgroundColor = "#d1d1d1";
          answersOfTheQuestion[i].children[0].children[0].style.opacity = "1";

          setSelectedAnswers([
            ...selectedAnswers,
            {
              questionNumber: currentQuestion + 1,
              selectedAnswer: i + 1,
              totalAnswers: answersOfTheQuestion.length,
              points:
                actualAnswer.points === "" ? 0 : parseInt(actualAnswer.points),
            },
          ]);

          //if all answers are selected
          if (questions.length - 1 === selectedAnswers.length) {
            //all answers are selected

            const tl = new gsap.timeline();

            tl.to(quizContainerRef.current, 0.5, {
              transform: "scale(0.5)",
              opacity: 0,
              display: "none",
              overflow: "hidden",
            })
              .fromTo(
                resultRef.current,
                {
                  opacity: 0,
                  duration: 0.5,
                  transform: "scale(0.5)",
                  display: "block",
                },
                {
                  opacity: 1,
                  transform: "scale(1)",

                  onComplete: () => {
                    gsap.set(quizContainerRef.current, { clearProps: "all" });
                  },
                },
                "+=0.3"
              )
              .to(disclaimerRef.current, {
                duration: 0.3,
                opacity: 1,
                display: "block",
              });

            return;
          }

          setCurrentQuestion(currentQuestion + 1);
        }
      }
    } catch (error) {}
  };

  //handleRetakeSurvey

  const handleRetakeSurvey = () => {
    window.location.reload();
  };

  //close the disclaimerRef
  const closeDisclaimer = () => {
    try {
      gsap.to(disclaimerRef.current, {
        duration: 0.3,
        opacity: 0,
        display: "none",

        onComplete: () => {
          gsap.set(disclaimerRef.current, { clearProps: "all" });
        },
      });
    } catch (error) {}
  };

  //scrollToQuestion
  const scrollToQuestion = () => {
    try {
      if (quizHolderRef === null) return;
      if (answersRef === null) return;

      const allQuestions = quizHolderRef.current.children;

      for (let i = 0; i < allQuestions.length; i++) {
        if (i !== currentQuestion) {
          allQuestions[i].style = `
          pointer-events: none;
          opacity: 0.4;
          `;
        } else {
          quizHolderRef.current.scrollTop = allQuestions[i].offsetTop - 120;

          allQuestions[i].style = `
          pointer-events: all;
          opacity: 1;
          `;
          allQuestions[i].focus();
        }
      }
    } catch (error) {}
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.mainSection}>
        <div className={styles.line} ref={lineRef}></div>

        <div className={styles.heroImg} ref={imgRef}>
          <Image
            priority={true}
            src={"/hero-img.svg"}
            layout="fill"
            alt="hero image"
            className={styles.img}
          />
        </div>

        <form
          className={styles.chooseCandidate}
          onSubmit={(e) => submitName(e)}
          ref={formRef}
        >
          <div className={styles.presentationText}>
            {presentationText === null ? (
              "Loading..."
            ) : (
              <>
                <h1>
                  {presentationText.presentationTextInNepali === null
                    ? ""
                    : presentationText.presentationTextInNepali}
                </h1>
                <h1>
                  {presentationText.presentationTextInEnglish === null
                    ? ""
                    : presentationText.presentationTextInEnglish}
                </h1>
              </>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <input
              type={"text"}
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder={
                language === "en"
                  ? "Candidate's Name ( First Name & Last Name )"
                  : "उम्मेदवारको नाम ( नाम र थर )"
              }
            />
            {error === "fullname" ? (
              <p className={styles.error}>
                {language === "en"
                  ? "*Candidate's first name and last name is required."
                  : "*उम्मेदवारको नाम र थर आवश्यक छ।"}
              </p>
            ) : error === "maxLimit" ? (
              <p className={styles.error}>
                {language === "en"
                  ? "*Candidate's Name cannot be more than 100 characters."
                  : "*उम्मेदवारको नाम 100 वर्ण भन्दा बढी हुनु हुँदैन।"}
              </p>
            ) : error === "minLimit" ? (
              <p className={styles.error}>
                {language === "en"
                  ? "*Candidate's Name cannot be less than 3 characters."
                  : "*उम्मेदवारको नाम 3 वर्ण भन्दा कम हुनु हुँदैन।"}
              </p>
            ) : error === "empty" ? (
              <p className={styles.error}>
                {language === "en"
                  ? "*Candidate's Name is required."
                  : "*उम्मेदवारको नाम आवश्यक छ।"}
              </p>
            ) : null}
          </div>
          <button onClick={(e) => submitName(e)}>
            <Image src={"/arrow.svg"} width={15} height={15} alt="submit" />
          </button>
        </form>
      </section>

      <section className={styles.quizContainer} ref={quizContainerRef}>
        <div className={styles.displayQuestionNumber}>
          <h2>
            {language === "en" ? "Question" : "प्रश्न"} {currentQuestion + 1} /{" "}
            {questions === null ? 1 : questions.length}
          </h2>
        </div>
        <div className={styles.quizWrapper}>
          <h4>
            {language === "en" ? "Candidate" : "उम्मेदवार"}: {candidateName}
          </h4>

          <div className={styles.quizHolder} ref={quizHolderRef}>
            {questions === null
              ? "Loading..."
              : questions[0] === undefined
              ? "No Data"
              : questions.map((data, idx) => (
                  <div className={styles.quiz} key={idx}>
                    <div className={styles.questionWrapper}>
                      <p className={styles.number}>{idx + 1}</p>
                      <p className={styles.question}>
                        {language === "en"
                          ? data.questionInEnglish
                          : data.questionInNepali}
                      </p>
                    </div>
                    <div className={styles.answerWrapper} ref={answersRef}>
                      {questions === null
                        ? "NoData"
                        : questions[0] === undefined
                        ? "Loading..."
                        : JSON.parse(data.answers).length > 0
                        ? JSON.parse(data.answers).map((answer, idx) => (
                            <div
                              className={styles.answer}
                              onClick={(e) => submitAnswer(e, answer)}
                              key={idx}
                            >
                              <div className={styles.circle}>
                                <div className={styles.innerCircle}></div>
                              </div>
                              <p>
                                {language === "en"
                                  ? answer.answerInEnglish
                                  : answer.answerInNepali}
                              </p>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                ))}
          </div>
          <div
            className={
              isElementVisible
                ? `${styles.gotoQuestion} ${styles.displayNone}`
                : styles.gotoQuestion
            }
            onClick={() => scrollToQuestion()}
          >
            <p>
              {language === "en"
                ? "*Respond to previous question"
                : "*अघिल्लो प्रश्नको जवाफ दिनुहोस्"}
            </p>
          </div>
        </div>
      </section>
      <div className={styles.result} ref={resultRef}>
        <div className={styles.displayQuestionNumber}>
          <h2>{language === "en" ? "Result" : "परिणाम"}</h2>
        </div>

        <div className={styles.retakeSurveyContainer}>
          <button
            className={styles.retakeSurvey}
            onClick={() => {
              handleRetakeSurvey();
            }}
          >
            {language === "en"
              ? "Assess another candidate"
              : "आर्को उम्मेदवारको मूल्यांकन गर्ने"}
          </button>
        </div>

        <div className={styles.resultContainer}>
          <div>
            <div className={styles.candidateHolderTable}>
              <table>
                <thead>
                  <tr>
                    <td>{language === "en" ? "SN" : "नं"}</td>
                    <td>{language === "en" ? "Candidate" : "उम्मेदवार"}</td>
                    <td>{language === "en" ? "Your Score" : "तपाईको अंक"}</td>
                  </tr>
                </thead>
                <tbody>
                  {localStorageSavedCandidates === undefined ? (
                    <tr>
                      <td colSpan={3}>No data available</td>
                    </tr>
                  ) : localStorageSavedCandidates[0] !== undefined ? (
                    localStorageSavedCandidates.map((el, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{el.candidateName}</td>
                        <td>
                          <p>{el.score}</p>
                          {calculateScoreText(el.score)}
                        </td>
                      </tr>
                    ))
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className={styles.candidate}>
              <input
                type={"text"}
                placeholder={
                  language === "en"
                    ? "+ Compare"
                    : "+ तुलना गर्न उम्मेदवारको नाम रख्नुहोस।"
                }
                value={searchedCandidate}
                onChange={(e) => {
                  setSearchedCandidate(e.target.value);
                  searchedData(e.target.value);
                }}
              />
              {returnedSearchedCandidateValue[0] !== undefined && (
                <div
                  className={
                    searchedCandidate.length > 0
                      ? `${styles.compareCandidateHolder}`
                      : `${styles.compareCandidateHolder} ${styles.compareCandidateHolderTransition}`
                  }
                >
                  <h3>{language === "en" ? "Search Terms" : "खोज सर्तहरू"}</h3>
                  {returnedSearchedCandidateValue[0] === null ? (
                    <div className={styles.returnedSearchedValue}>
                      <p style={{ textAlign: "center" }}>
                        {language === "en"
                          ? "No data found."
                          : "कुनै डाटा फेला परेन"}
                      </p>
                    </div>
                  ) : returnedSearchedCandidateValue[0] !== undefined ? (
                    returnedSearchedCandidateValue.map((searched, index) => (
                      <div
                        className={styles.returnedSearchedValue}
                        key={index}
                        onClick={() => {
                          setSelectedComapareCandidates(
                            [...selectedComapareCandidates, searched].reverse()
                          );

                          setSearchedCandidate("");
                          searchedData("");
                        }}
                      >
                        <p>
                          {index + 1}. {searched.name}
                        </p>
                      </div>
                    ))
                  ) : null}
                </div>
              )}
            </div>

            {selectedComapareCandidates[0] === undefined
              ? null
              : selectedComapareCandidates.map((selected, index) => (
                  <div className={styles.candidate} key={index}>
                    <h2>{language === "en" ? "Average Score:" : "औसत अंक:"}</h2>
                    <div className={styles.percentage}>
                      <h3>{selected.name}</h3>
                      <div className={styles.percent}>
                        {selected.name !== null
                          ? selected.averageScore
                          : "Loading..."}
                      </div>
                      {selected === null ? (
                        "Loading..."
                      ) : selected.averageScore < 40 ? (
                        <p style={{ color: "red" }}>Unacceptable</p>
                      ) : selected.averageScore < 60 ? (
                        <p style={{ color: "red" }}>Bad</p>
                      ) : selected.averageScore < 80 ? (
                        <p style={{ color: "green" }}>Good</p>
                      ) : selected.averageScore < 100 ? (
                        <p style={{ color: "lightgreen" }}>Excellent</p>
                      ) : selected.averageScore >= 100 ? (
                        <p style={{ color: "lightgreen" }}>Outstanding</p>
                      ) : null}
                      <p>
                        {language === "en" ? "Total Survey:" : "कुल सर्वेक्षण:"}{" "}
                        {selected !== null
                          ? selected.timesSearched
                          : "Loading..."}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div className={styles.disclaimerContainer} ref={disclaimerRef}>
        <div className={styles.disclaimer}>
          <div className={styles.center}>
            {language === "en" ? <h3>DISCLAIMER</h3> : <h3>अस्वीकरण</h3>}
            <span onClick={() => closeDisclaimer()}>X</span>
          </div>
          {language === "en" ? (
            <p>
              This questionnaire is designed to help you ask relevant questions
              about the candidate. It should not be taken absolutely.
            </p>
          ) : (
            <p>
              यो प्रश्नावली तपाईंलाई उम्मेद्वारको बारेमा सान्दर्भिक प्रश्नहरू
              सोध्न मद्दत गर्न डिजाइन गरिएको हो। यसलाई बिल्कुलै लिनु हुँदैन।
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
