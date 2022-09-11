import AdminHead from "./AdminHead";
import styles from "../../styles/panel.module.css";
import { useContext } from "react";
import { TokenContext } from "../../context/Token.context";

const Candidates = () => {
  const { sortedCandidates, setSortBy, sortBy } = useContext(TokenContext);

  const handleSetSortBy = (text) => {
    if (sortBy === "name") {
      setSortBy("reverseName");
      return;
    }
    if (sortBy === "searched") {
      setSortBy("reverseSearched");
      return;
    }
    if (sortBy === "score") {
      setSortBy("reverseScore");
      return;
    }

    setSortBy(text);
    return;
  };

  return (
    <>
      <AdminHead title="Candidates" />
      <div className={styles.candidatesContainer}>
        <h1>Survey Questions</h1>

        <table>
          <thead>
            <tr>
              <th onClick={() => handleSetSortBy("")}>Rank</th>
              <th onClick={() => handleSetSortBy("name")}>
                Candidate&apos;s Name
              </th>
              <th onClick={() => handleSetSortBy("searched")}>
                Times Searched
              </th>
              <th onClick={() => handleSetSortBy("score")}>Average Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedCandidates === null ? (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : sortedCandidates[0] === undefined ? (
              <tr>
                <td colSpan={4}>No Data Available.</td>
              </tr>
            ) : (
              sortedCandidates.map((candidate, index) => (
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
