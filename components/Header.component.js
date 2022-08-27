import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AnimationContext } from "../context/Animation.context";
import styles from "../styles/header.module.css";

const Header = () => {
  const { initialAnimationHandler, headerRef } = useContext(AnimationContext);

  const [hideElements, setHideElements] = useState(false);

  useEffect(() => {
    if (initialAnimationHandler) {
      setTimeout(() => {
        setHideElements(true);
      }, 300);
    } else {
      setHideElements(false);
    }
  }, [initialAnimationHandler]);

  return (
    <header className={styles.header} ref={headerRef}>
      <p className={styles.title}>
        {" "}
        {hideElements ? (
          <span className={styles.title} style={{ opacity: 0 }}>
            Choose Your Candidate
          </span>
        ) : (
          "Choose Your Candidate"
        )}
      </p>
      <Image
        src={hideElements ? "/logo-white.svg" : "/logo.svg"}
        alt="logo"
        height={50}
        width={50}
      />
      <div className={styles.language}>
        <p>en</p>
        <p>नेपाली</p>
      </div>
    </header>
  );
};

export default Header;
