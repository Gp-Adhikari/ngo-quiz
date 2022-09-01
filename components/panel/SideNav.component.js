import styles from "../../styles/panel.module.css";

import Image from "next/image";

const SideNav = () => {
  return (
    <>
      <div className={styles.sideNav}>
        <h2>Admin Panel</h2>
        <nav>
          <div className={styles.navItem}>
            <div className={styles.indicator}></div>
            <Image
              src={"/dashboard.svg"}
              width={24}
              height={24}
              alt="dashboard"
              layout="fixed"
            />
            <p>Dashboard</p>
          </div>
          <div className={styles.navItem}>
            <div className={styles.indicator}></div>
            <Image
              src={"/quiz.svg"}
              width={24}
              height={24}
              alt="dashboard"
              layout="fixed"
            />
            <p>Quiz</p>
          </div>
          <div className={styles.navItem}>
            <div className={styles.indicator}></div>
            <Image
              src={"/candidates.svg"}
              width={24}
              height={24}
              alt="dashboard"
              layout="fixed"
            />
            <p>Candidates</p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default SideNav;
