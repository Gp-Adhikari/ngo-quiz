import React, { useRef, useState, useContext, useEffect } from "react";

import styles from "../../styles/panel.module.css";
import Dashboard from "../../components/panel/Dashboard.component";
import Survey from "../../components/panel/Survey.component";
import Candidates from "../../components/panel/Candidates.component";

import SideNav from "../../components/panel/SideNav.component";

import gsap, { Power3 } from "gsap";
import Menu from "../../public/Menu";
import { TokenContext } from "../../context/Token.context";

import { useRouter } from "next/router";

const Panel = () => {
  const router = useRouter();
  const { token, setLoading } = useContext(TokenContext);

  const [currentPage, setCurrentPage] = useState("survey");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  //set loading to true as default
  useEffect(() => {
    setLoading(true);
  }, [setLoading]);

  useEffect(() => {
    if (token === null) {
      router.replace("/panel/login");
    } else {
      setLoading(false);
    }
  }, [token, setLoading, router]);

  const handleMenu = () => {
    try {
      if (window.innerWidth > 768) return;

      const nav = navRef.current;
      const menu = menuRef.current;

      setIsMenuOpen(!isMenuOpen);
      menu.classList.toggle("active");

      if (!isMenuOpen) {
        gsap.to(nav, {
          duration: 0.3,
          opacity: 1,
          width: "100%",
          ease: Power3.easeInOut,
        });
      } else {
        gsap.to(nav, {
          duration: 0.3,
          opacity: 0,
          width: "0",
          ease: Power3.easeInOut,
          onComplete: () => {
            gsap.set(nav, {
              clearProps: "all",
            });
          },
        });
      }
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.panelContainer}>
        <div className={styles.mobHeading}>{currentPage}</div>
        <div className={styles.hamburgerContainer} onClick={() => handleMenu()}>
          <Menu ref={menuRef} />
        </div>
        <SideNav
          ref={navRef}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          handleMenu={() => handleMenu()}
        />
        <div className={styles.content}>
          {currentPage === "dashboard" ? (
            <Dashboard />
          ) : currentPage === "survey" ? (
            <Survey />
          ) : currentPage === "candidates" ? (
            <Candidates />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Panel;
