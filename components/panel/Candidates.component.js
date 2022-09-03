import AdminHead from "./AdminHead";
import styles from "../../styles/panel.module.css";

const Candidates = () => {
  return (
    <>
      <AdminHead title="Candidates" />
      <div className={styles.candidatesContainer}>
        <h1>Survey Questions</h1>

        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Candidate's Name</th>
              <th>Times Searched</th>
              <th>Average Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Gp Adhikari</td>
              <td>123</td>
              <td>35.6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Candidates;
