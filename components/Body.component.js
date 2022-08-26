import React, { useRef, useEffect, useState, useContext } from "react";

import styles from "../styles/body.module.css";
import Image from "next/image";
import { AnimationContext } from "../context/Animation.context";
import { DataContext } from "../context/Data.context";

import gsap, { Power2 } from "gsap";

const Body = () => {
  const { candidateName, setCandidateName } = useContext(DataContext);

  const { initialAnimationHandler, setInitialAnimationHandler } =
    useContext(AnimationContext);

  const imgRef = useRef(null);
  const formRef = useRef(null);
  const lineRef = useRef(null);

  const [width, setWidth] = useState(undefined);
  const [height, setHeight] = useState(undefined);

  const [error, setError] = useState("");

  const tl = new gsap.timeline();

  //set height of screen
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
  }, []);

  useEffect(() => {
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
  }, [height, width, imgRef]);

  //on candidate's name submit
  const submitName = (e) => {
    e.preventDefault();
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

    //run animation after 300 ms to let header disappear first
    setTimeout(() => {
      tl.to(formRef.current.children, 0.3, {
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
          width: "100%",
          ease: Power2.easeInOut,
        })
        .to(lineRef.current, 0.3, {
          left: 0,
          ease: Power2.easeInOut,
        });
    }, 300);
  };

  return (
    <>
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
    </>
  );
};

export default Body;
