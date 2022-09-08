import React, { useRef, useEffect, useState, useContext } from "react";

import styles from "../styles/body.module.css";
import Image from "next/image";
import { AnimationContext } from "../context/Animation.context";
import { DataContext } from "../context/Data.context";

import gsap, { Power2 } from "gsap";
import { TokenContext } from "../context/Token.context";

const Body = () => {
  const {
    candidateName,
    setCandidateName,
    selectedAnswers,
    setSelectedAnswers,
    percentage,
    qualityText,
  } = useContext(DataContext);

  const { language, presentationText, questions, activeUsersSocket } =
    useContext(TokenContext);

  const { setInitialAnimationHandler, headerRef } =
    useContext(AnimationContext);

  const imgRef = useRef(null);
  const formRef = useRef(null);
  const lineRef = useRef(null);
  const quizContainerRef = useRef(null);

  const quizHolderRef = useRef(null);
  const answersRef = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const resultRef = useRef(null);

  const [error, setError] = useState("");

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
          quizHolderRef.current.scrollTop = allQuestions[i].offsetTop - 170;

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

      if (candidateName.length < 2) {
        setError("minLimit");
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
  const submitAnswer = (e, actualAnswer, actualQuestion) => {
    try {
      const ans = e.target.children[1].innerText;

      const answersOfTheQuestion =
        quizHolderRef.current.children[currentQuestion].children[1].children;

      for (let i = 0; i < answersOfTheQuestion.length; i++) {
        const answer = answersOfTheQuestion[i].children[1].innerText;

        if (answer === ans) {
          answersOfTheQuestion[i].style.backgroundColor = "#00ff55";
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
            }).fromTo(
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
              },
              "+=0.3"
            );

            return;
          }

          setCurrentQuestion(currentQuestion + 1);
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
          <h1>
            {presentationText === null ? (
              ""
            ) : language === "en" ? (
              <>{presentationText.presentationTextInEnglish}</>
            ) : (
              <>{presentationText.presentationTextInNepali}</>
            )}
          </h1>
          <div className={styles.inputWrapper}>
            <input
              type={"text"}
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder={
                language === "en" ? "Candidate's Name" : "उम्मेदवारको नाम"
              }
            />
            {error === "maxLimit" ? (
              <p className={styles.error}>
                *Candidate&apos;s Name cannot be more than 100 characters.
              </p>
            ) : error === "minLimit" ? (
              <p className={styles.error}>
                *Candidate&apos;s Name cannot be less than 2 characters.
              </p>
            ) : error === "empty" ? (
              <p className={styles.error}>*Field cannot be empty.</p>
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
            Question {currentQuestion + 1} / {questions.length}
          </h2>
        </div>
        <div className={styles.quizWrapper}>
          <h4>Candidate: {candidateName}</h4>

          <div className={styles.quizHolder} ref={quizHolderRef}>
            {questions === null
              ? "No Data"
              : questions[0] === undefined
              ? "Loading..."
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
                              onClick={(e) => submitAnswer(e, answer, data)}
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
        </div>
      </section>
      <div className={styles.result} ref={resultRef}>
        <div className={styles.displayQuestionNumber}>
          <h2>Result</h2>
        </div>

        <div className={styles.resultContainer}>
          <div className={styles.candidate}>
            <h3>{candidateName}</h3>
            <div className={styles.percentage}>
              <div className={styles.percent}>{percentage}</div>
              {qualityText}
            </div>
          </div>
          <div className={styles.candidate}>
            <input type={"text"} placeholder="+ Compare" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
