import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AnimationContext } from "../context/Animation.context";
import { TokenContext } from "../context/Token.context";
import styles from "../styles/header.module.css";

const Header = () => {
  const { language, title, setLanguage } = useContext(TokenContext);

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
        {hideElements ? (
          <span className={styles.title} style={{ opacity: 0 }}>
            {title === null ? (
              "Loading..."
            ) : language === "en" ? (
              <>{title.titleInEnglish}</>
            ) : (
              <>{title.titleInNepali}</>
            )}
          </span>
        ) : (
          <>
            {title === null ? (
              ""
            ) : language === "en" ? (
              <>{title.titleInEnglish}</>
            ) : (
              <>{title.titleInNepali}</>
            )}
          </>
        )}
      </p>
      <Image
        src={hideElements ? "/logo-white.svg" : "/logo.svg"}
        alt="logo"
        height={50}
        width={50}
      />
      <div className={styles.language}>
        <p
          onClick={() => setLanguage("en")}
          className={language === "en" ? styles.active : null}
        >
          en
        </p>
        <p
          onClick={() => setLanguage("np")}
          className={language === "np" ? styles.active : null}
        >
          नेपाली
        </p>
      </div>
    </header>
  );
};

export default Header;
