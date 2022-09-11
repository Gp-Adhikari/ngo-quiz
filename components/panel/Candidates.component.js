import AdminHead from "./AdminHead";
import styles from "../../styles/panel.module.css";
import { useContext } from "react";
import { TokenContext } from "../../context/Token.context";

const Candidates = () => {
  const { candidates } = useContext(TokenContext);

  return (
    <>
      <AdminHead title="Candidates" />
      <div className={styles.candidatesContainer}>
        <h1>Survey Questions</h1>

        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Candidate&apos;s Name</th>
              <th>Times Searched</th>
              <th>Average Score</th>
            </tr>
          </thead>
          <tbody>
            {candidates === null ? (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : candidates[0] === undefined ? (
              <tr>
                <td colSpan={4}>No Data Available.</td>
              </tr>
            ) : (
              candidates.map((candidate, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {candidate.name}
                  </td>
                  <td>
                    {candidate.timesSearched
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>{candidate.averageScore}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Candidates;
