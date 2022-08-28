import React, { useRef, useEffect, useState, useContext } from "react";

import styles from "../styles/body.module.css";
import Image from "next/image";
import { AnimationContext } from "../context/Animation.context";
import { DataContext } from "../context/Data.context";

import gsap, { Power2 } from "gsap";

const Body = () => {
  const {
    candidateName,
    setCandidateName,
    selectedAnswers,
    setSelectedAnswers,
  } = useContext(DataContext);

  const { initialAnimationHandler, setInitialAnimationHandler, headerRef } =
    useContext(AnimationContext);

  const imgRef = useRef(null);
  const formRef = useRef(null);
  const lineRef = useRef(null);
  const quizContainerRef = useRef(null);

  const quizHolderRef = useRef(null);
  const answersRef = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [width, setWidth] = useState(undefined);
  const [height, setHeight] = useState(undefined);

  const [error, setError] = useState("");
  //set height of screen
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }
    } catch (error) {}
  }, []);

  // focus question
  useEffect(() => {
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
        quizHolderRef.current.scrollTop = allQuestions[i].offsetTop - 250;

        allQuestions[i].style = `
          pointer-events: all;
          opacity: 1;
        `;
        allQuestions[i].focus();
      }
    }

    // console.log(quizHolderRef.current.children[0].children[1]);
  }, [quizHolderRef, answersRef, currentQuestion]);

  //set height and width for the hero image
  useEffect(() => {
    try {
      if (width === undefined) return;
      if (height === undefined) return;
      if (imgRef === null) return;

      const img = imgRef.current;

      if (height > 995) {
        img.style.width = `995px`;
        img.style.height = `488px`;
        return;
      }

      img.style.width = `${height}px`;
      img.style.height = `${height / 2}px`;
    } catch (error) {}
  }, [height, width, imgRef]);

  //on candidate's name submit
  const submitName = (e) => {
    e.preventDefault();
    try {
      setInitialAnimationHandler(true);
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
  const submitAnswer = (e) => {
    const ans = e.target.children[1].innerText;

    const answersOfTheQuestion =
      quizHolderRef.current.children[currentQuestion].children[1].children;

    for (let i = 0; i < answersOfTheQuestion.length; i++) {
      const answer = answersOfTheQuestion[i].children[1].innerText;

      if (answer === ans) {
        console.log(answersOfTheQuestion[i]);
        answersOfTheQuestion[i].style.backgroundColor = "#00ff55";

        setSelectedAnswers([
          ...selectedAnswers,
          {
            questionNumber: currentQuestion,
            selectedAnswer: i,
            totalAnswers: answersOfTheQuestion[i].children.length,
          },
        ]);

        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  return (
    <>
      <section className={styles.mainSection}>
        <div className={styles.line} ref={lineRef}></div>

        <div className={styles.heroImg} ref={imgRef}>
          <Image
            priority={"low"}
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
          <h1>Know More About Your Candidate</h1>
          <div className={styles.inputWrapper}>
            <input
              type={"text"}
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Candidate's Name"
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
          <h2>Question 1 / 20</h2>
        </div>
        <div className={styles.quizWrapper}>
          <h4>Candidate: {candidateName}</h4>

          <div className={styles.quizHolder} ref={quizHolderRef}>
            <div className={styles.quiz}>
              <div className={styles.questionWrapper}>
                <p className={styles.number}>1</p>
                <p className={styles.question}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus, नेपाली? Numquam unde sequi tenetur minima nihil
                  quibusdam mollitia cupiditate blanditiis?
                </p>
              </div>
              <div className={styles.answerWrapper} ref={answersRef}>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>Answer 1</p>
                </div>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>नेपाली 1</p>
                </div>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>नेपाली 1</p>
                </div>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>नेपाली 1</p>
                </div>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>नेपाली 1</p>
                </div>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>नेपाली 1</p>
                </div>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>नेपाली 1</p>
                </div>
              </div>
            </div>
            <div className={styles.quiz}>
              <div className={styles.questionWrapper}>
                <p className={styles.number}>2</p>
                <p className={styles.question}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus, नेपाली? Numquam unde sequi tenetur minima nihil
                  quibusdam mollitia cupiditate blanditiis?
                </p>
              </div>
              <div className={styles.answerWrapper} ref={answersRef}>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>Answer 2</p>
                </div>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>नेपाली 2</p>
                </div>
              </div>
            </div>
            <div className={styles.quiz}>
              <div className={styles.questionWrapper}>
                <p className={styles.number}>2</p>
                <p className={styles.question}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus, नेपाली? Numquam unde sequi tenetur minima nihil
                  quibusdam mollitia cupiditate blanditiis?
                </p>
              </div>
              <div className={styles.answerWrapper} ref={answersRef}>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>Answer 2</p>
                </div>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>नेपाली 2</p>
                </div>
              </div>
            </div>
            <div className={styles.quiz}>
              <div className={styles.questionWrapper}>
                <p className={styles.number}>2</p>
                <p className={styles.question}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus, नेपाली? Numquam unde sequi tenetur minima nihil
                  quibusdam mollitia cupiditate blanditiis?
                </p>
              </div>
              <div className={styles.answerWrapper} ref={answersRef}>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>Answer 2</p>
                </div>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>नेपाली 2</p>
                </div>
              </div>
            </div>
            <div className={styles.quiz}>
              <div className={styles.questionWrapper}>
                <p className={styles.number}>2</p>
                <p className={styles.question}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus, नेपाली? Numquam unde sequi tenetur minima nihil
                  quibusdam mollitia cupiditate blanditiis?
                </p>
              </div>
              <div className={styles.answerWrapper} ref={answersRef}>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>Answer 2</p>
                </div>
                <div className={styles.answer} onClick={(e) => submitAnswer(e)}>
                  <div className={styles.circle}></div>
                  <p>नेपाली 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Body;
