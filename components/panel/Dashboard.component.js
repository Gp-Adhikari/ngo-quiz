import Image from "next/image";
import React, { useState, useContext } from "react";
import { TokenContext } from "../../context/Token.context";
import Eye from "../../public/eye";
import styles from "../../styles/panel.module.css";

import AdminHead from "./AdminHead";

const Dashboard = () => {
  const { connections } = useContext(TokenContext);

  const [titleInEnglish, setTitleInEnglish] = useState("");
  const [titleInNepali, setTitleInNepali] = useState("");

  const [presentationTextInEnglish, setPresentationTextInEnglish] =
    useState("");
  const [presentationTextInNepali, setPresentationTextInNepali] = useState("");

  return (
    <>
      <AdminHead title="Dashboard" />
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h3>Active Users</h3>
          <div className={styles.activeUsers}>
            <div className={styles.active}>
              <div className={styles.borderActive}></div>
              <div className={styles.innerActive}></div>
            </div>
            <p>{connections}</p>
          </div>
        </div>

        <div className={styles.info}>
          <h3>Total Visits</h3>
          <div className={styles.activeUsers}>
            <Eye />
            <p>1000</p>
          </div>
        </div>
      </div>

      <div className={styles.changeDataContainer}>
        <div className={styles.data}>
          <p>Title</p>
          <div className={styles.inputContainer}>
            <p>English</p>
            <input
              type="text"
              value={titleInEnglish}
              onChange={(e) => setTitleInEnglish(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Nepali</p>
            <input
              type="text"
              value={titleInNepali}
              onChange={(e) => setTitleInNepali(e.target.value)}
            />
          </div>

          <button>Submit</button>
          <div className={styles.demo}>
            <p>English</p>
            <div className={styles.hint}>
              <p>
                {titleInEnglish === ""
                  ? "Choose Your Candidate"
                  : titleInEnglish}
              </p>
            </div>
            <p>Nepali</p>
            <div className={styles.hint}>
              <p>
                {titleInNepali === "" ? "उम्मेदवार छान्नुहोस्" : titleInNepali}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          <p>Presentation Text</p>
          <div className={styles.inputContainer}>
            <p>English</p>
            <input
              type="text"
              value={presentationTextInEnglish}
              onChange={(e) => setPresentationTextInEnglish(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Nepali</p>
            <input
              type="text"
              value={presentationTextInNepali}
              onChange={(e) => setPresentationTextInNepali(e.target.value)}
            />
          </div>
          <button>Submit</button>

          <div className={styles.demo}>
            <p>English</p>
            <div className={styles.demoPart}>
              <h3>
                {presentationTextInEnglish === ""
                  ? "Know More About Your Candidate"
                  : presentationTextInEnglish}
              </h3>
              <input type="text" placeholder="Candidate's Name" />
              <button>
                <Image
                  src={"/arrow.svg"}
                  height={12}
                  width={12}
                  layout="fixed"
                  alt="arrow"
                />
              </button>
            </div>
            <p>Nepali</p>
            <div className={styles.demoPart}>
              <h3>
                {presentationTextInNepali === ""
                  ? "मैले मत दिन चाहेको उम्मेदवार कस्तो होला?"
                  : presentationTextInNepali}
              </h3>
              <input type="text" placeholder="उम्मेदवारको नाम" />
              <button>
                <Image
                  src={"/arrow.svg"}
                  height={12}
                  width={12}
                  layout="fixed"
                  alt="arrow"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
