import React, { useRef, useEffect, useState, useContext } from "react";

import styles from "../styles/body.module.css";
import Image from "next/image";
import { AnimationContext } from "../context/Animation.context";
import { DataContext } from "../context/Data.context";

import gsap, { Power2 } from "gsap";

const Body = () => {
  const { candidateName, setCandidateName } = useContext(DataContext);

  const { initialAnimationHandler, setInitialAnimationHandler, headerRef } =
    useContext(AnimationContext);

  const imgRef = useRef(null);
  const formRef = useRef(null);
  const lineRef = useRef(null);
  const quizContainerRef = useRef(null);

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
                *Candidate's Name cannot be more than 100 characters.
              </p>
            ) : error === "minLimit" ? (
              <p className={styles.error}>
                *Candidate's Name cannot be less than 2 characters.
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

          <div className={styles.quizHolder}>
            <div className={styles.quiz}>
              <div className={styles.questionWrapper}>
                <p className={styles.number}>1</p>
                <p className={styles.question}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus, नेपाली? Numquam unde sequi tenetur minima nihil
                  quibusdam mollitia cupiditate blanditiis?
                </p>
              </div>
              <div className={styles.answerWrapper}>
                <div className={styles.answer}>
                  <div className={styles.circle}></div>
                  <p>Answer</p>
                </div>
                <div className={styles.answer}>
                  <div className={styles.circle}></div>
                  <p>नेपाली</p>
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
