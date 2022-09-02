import Image from "next/image";
import { useEffect, useState } from "react";
import Eye from "../../public/eye";
import styles from "../../styles/panel.module.css";

const Dashboard = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      setUrl(window.location.origin);
    }
  }, []);

  return (
    <>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h3>Active Users</h3>
          <div className={styles.activeUsers}>
            <div className={styles.active}>
              <div className={styles.borderActive}></div>
              <div className={styles.innerActive}></div>
            </div>
            <p>48</p>
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
            <input type="text" />
          </div>
          <div className={styles.inputContainer}>
            <p>Nepali</p>
            <input type="text" />
          </div>

          <button>Submit</button>
          <div className={styles.demo}>
            <p>English</p>
            <div className={styles.hint}>
              <p>Choose Your Candidate</p>
            </div>
            <p>Nepali</p>
            <div className={styles.hint}>
              <p>Choose Your Candidate</p>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          <p>Presentation Text</p>
          <div className={styles.inputContainer}>
            <p>English</p>
            <input type="text" />
          </div>
          <div className={styles.inputContainer}>
            <p>Nepali</p>
            <input type="text" />
          </div>
          <button>Submit</button>

          <div className={styles.demo}>
            <p>English</p>
            <div className={styles.demoPart}>
              <h3>Know More About Your Candidate</h3>
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
              <h3>Know More About Your Candidate</h3>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
