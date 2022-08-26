import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import { AnimationContext } from "../context/Animation.context";
import styles from "../styles/header.module.css";

import gsap from "gsap";

const Header = () => {
  const { initialAnimationHandler } = useContext(AnimationContext);

  const headerRef = useRef(null);

  useEffect(() => {
    try {
      if (initialAnimationHandler) {
        gsap.to(headerRef.current, {
          opacity: 0,
          duration: 0.3,
        });
      }
    } catch (error) {}
  }, [initialAnimationHandler]);

  return (
    <header className={styles.header} ref={headerRef}>
      <p className={styles.title}>Choose Your Candidate</p>
      <Image src={"/logo.svg"} alt="logo" height={50} width={50} />
      <div className={styles.language}>
        <p>en</p>
        <p>नेपाली</p>
      </div>
    </header>
  );
};

export default Header;
