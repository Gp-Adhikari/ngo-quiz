import React, { forwardRef } from "react";

import styles from "../../styles/panel.module.css";

import DashboardIcon from "../../public/DashboardIcon";
import CandidatesIcon from "../../public/CandidatesIcon";
import SurveyIcon from "../../public/SurveyIcon";

const SideNav = (props, ref) => {
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
          <button className={styles.logout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default forwardRef(SideNav);
