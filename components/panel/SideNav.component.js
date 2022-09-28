import React, { forwardRef, useContext } from "react";

import styles from "../../styles/panel.module.css";

import DashboardIcon from "../../public/DashboardIcon";
import CandidatesIcon from "../../public/CandidatesIcon";
import SurveyIcon from "../../public/SurveyIcon";

import { useRouter } from "next/router";
import { TokenContext } from "../../context/Token.context";

const SideNav = (props, ref) => {
  const router = useRouter();

  const { setLoading, setToken } = useContext(TokenContext);
  const handleLogout = () => {
    try {
      setLoading(true);

      fetch("/api/csrf")
        .then((res) => res.json())
        .then((response) => {
          if (!response.status) return;

          fetch("/logout", {
            method: "DELETE",
            headers: {
              "xsrf-token": response.csrfToken,
            },
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              setLoading(false);
              setToken("");
              router.replace("/panel/login");
            });
        });
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.sideNav} ref={ref}>
        <h2>Admin Panel</h2>
        <nav>
          <div
            className={
              props.currentPage === "dashboard"
                ? `${styles.navItem} ${styles.navItemActive}`
                : styles.navItem
            }
            onClick={() => {
              props.setCurrentPage("dashboard");
              window.scrollTo(0, 0);
              props.handleMenu();
            }}
          >
            <DashboardIcon
              isFocused={props.currentPage === "dashboard" ? true : false}
            />
            <p>Dashboard</p>
          </div>
          <div
            className={
              props.currentPage === "survey"
                ? `${styles.navItem} ${styles.navItemActive}`
                : styles.navItem
            }
            onClick={() => {
              props.setCurrentPage("survey");
              window.scrollTo(0, 0);
              props.handleMenu();
            }}
          >
            <SurveyIcon
              isFocused={props.currentPage === "survey" ? true : false}
            />
            <p>Survey</p>
          </div>
          <div
            className={
              props.currentPage === "candidates"
                ? `${styles.navItem} ${styles.navItemActive}`
                : styles.navItem
            }
            onClick={() => {
              props.setCurrentPage("candidates");
              window.scrollTo(0, 0);
              props.handleMenu();
            }}
          >
            <CandidatesIcon
              isFocused={props.currentPage === "candidates" ? true : false}
            />
            <p>Candidates</p>
          </div>
        </nav>
        <div className={styles.logoutWrapper}>
          <button className={styles.logout} onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default forwardRef(SideNav);
