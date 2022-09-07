import Image from "next/image";
import React, { useState, useContext } from "react";
import { TokenContext } from "../../context/Token.context";
import Eye from "../../public/eye";
import styles from "../../styles/panel.module.css";

import AdminHead from "./AdminHead";

const Dashboard = () => {
  const { connections, visits, adminSocket, title, presentationText } =
    useContext(TokenContext);

  const [titleInEnglish, setTitleInEnglish] = useState("");
  const [titleInNepali, setTitleInNepali] = useState("");

  const [titleError, setTitleError] = useState("");

  const [presentationTextInEnglish, setPresentationTextInEnglish] =
    useState("");
  const [presentationTextInNepali, setPresentationTextInNepali] = useState("");
  const [presentationTextError, setPresentationTextError] = useState("");

  const changePresentationText = (e) => {
    e.preventDefault();

    if (presentationTextInEnglish === "" && presentationTextInNepali === "") {
      setPresentationTextError("empty");
      return;
    }

    if (adminSocket !== null) {
      adminSocket.emit("presentation-text", {
        presentationTextInEnglish: presentationTextInEnglish,
        presentationTextInNepali: presentationTextInNepali,
      });

      setPresentationTextError("changed");
      setTimeout(() => {
        setPresentationTextError("");
      }, 3000);

      setPresentationTextInEnglish("");
      setPresentationTextInNepali("");
    }
  };

  const changeTitle = (e) => {
    e.preventDefault();

    if (titleInEnglish === "" && titleInNepali === "") {
      setTitleError("empty");
      return;
    }

    if (adminSocket !== null) {
      adminSocket.emit("change-title", {
        titleInEnglish: titleInEnglish,
        titleInNepali: titleInNepali,
      });

      setTitleError("changed");
      setTimeout(() => {
        setTitleError("");
      }, 3000);

      setTitleInEnglish("");
      setTitleInNepali("");
    }
  };

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
            <p>
              {connections.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
        </div>

        <div className={styles.info}>
          <h3>Total Visits</h3>
          <div className={styles.activeUsers}>
            <Eye />
            <p>{visits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          </div>
        </div>
      </div>

      <div className={styles.changeDataContainer}>
        <form className={styles.data} onSubmit={(e) => changeTitle(e)}>
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

          {titleError === "empty" ? (
            <div>
              <p className={`${styles.error} ${styles.marginBottom}`}>
                Both Fields are Empty!
              </p>
            </div>
          ) : titleError === "changed" ? (
            <div>
              <p className={`${styles.success} ${styles.marginBottom}`}>
                Success!
              </p>
            </div>
          ) : null}
          <button onClick={(e) => changeTitle(e)}>Submit</button>
          <div className={styles.demo}>
            <p>English</p>
            <div className={styles.hint}>
              <p>
                {titleInEnglish !== ""
                  ? titleInEnglish
                  : title !== null && title.titleInEnglish !== undefined
                  ? title.titleInEnglish
                  : null}
              </p>
            </div>
            <p>Nepali</p>
            <div className={styles.hint}>
              <p>
                {titleInNepali !== ""
                  ? titleInNepali
                  : title !== null && title.titleInNepali !== undefined
                  ? title.titleInNepali
                  : null}
              </p>
            </div>
          </div>
        </form>
        <form
          className={styles.data}
          onSubmit={(e) => changePresentationText(e)}
        >
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
          {presentationTextError === "empty" ? (
            <div>
              <p className={`${styles.error} ${styles.marginBottom}`}>
                Both Fields are Empty!
              </p>
            </div>
          ) : presentationTextError === "changed" ? (
            <div>
              <p className={`${styles.success} ${styles.marginBottom}`}>
                Success!
              </p>
            </div>
          ) : null}
          <button onClick={(e) => changePresentationText(e)}>Submit</button>

          <div className={styles.demo}>
            <p>English</p>
            <div className={styles.demoPart}>
              <h3>
                {presentationTextInEnglish !== ""
                  ? presentationTextInEnglish
                  : presentationText !== null &&
                    presentationText.presentationTextInEnglish !== undefined
                  ? presentationText.presentationTextInEnglish
                  : null}
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
                {presentationTextInNepali !== ""
                  ? presentationTextInNepali
                  : presentationText !== null &&
                    presentationText.presentationTextInNepali !== undefined
                  ? presentationText.presentationTextInNepali
                  : null}
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
        </form>
      </div>
    </>
  );
};

export default Dashboard;
