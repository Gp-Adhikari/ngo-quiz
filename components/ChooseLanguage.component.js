import Image from "next/image";
import { useContext, useRef } from "react";
import { TokenContext } from "../context/Token.context";
import styles from "../styles/body.module.css";

import gsap from "gsap";

const ChooseLanguage = () => {
  const chooseLanguageContainerRef = useRef(null);
  const { setLanguage } = useContext(TokenContext);

  const handleSelectLanguage = (lang) => {
    try {
      setLanguage(lang);

      gsap.to(chooseLanguageContainerRef.current, {
        duration: 0.3,
        opacity: 0,
        display: "none",
      });
    } catch (error) {}
  };

  return (
    <div
      className={styles.chooseLanguageContainer}
      ref={chooseLanguageContainerRef}
    >
      <div className={styles.chooseLanguage}>
        <div className={styles.chooseLanguageHeading}>
          <h3>Select Language</h3>
        </div>
        <div className={styles.chooseLanguageWrapper}>
          <div
            className={styles.chooseLanguageInputs}
            onClick={() => handleSelectLanguage("np")}
          >
            <div className={styles.center}>
              <div className={styles.img}>
                <Image src="/flag-nepal.svg" alt="arrow" layout="fill" />
              </div>
              <p>नेपाली</p>
            </div>
            <Image
              src="/tick.svg"
              height={20}
              className={styles.tickImg}
              width={20}
              alt="tick"
            />
          </div>
          <div
            className={styles.chooseLanguageInputs}
            onClick={() => handleSelectLanguage("en")}
          >
            <div className={styles.center}>
              <div className={styles.img}>
                <Image src="/flag-england.svg" alt="arrow" layout="fill" />
              </div>
              <p>English</p>
            </div>
            <Image
              src="/tick.svg"
              height={20}
              width={20}
              className={styles.tickImg}
              alt="tick"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseLanguage;
