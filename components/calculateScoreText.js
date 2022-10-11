const calculateScoreText = (score) => {
  if (score < 40) {
    return <p style={{ color: "red" }}>Unacceptable</p>;
  } else if (score < 60) {
    return <p style={{ color: "red" }}>Bad</p>;
  } else if (score < 80) {
    return <p style={{ color: "green" }}>Good</p>;
  } else if (score < 100) {
    return <p style={{ color: "lightgreen" }}>Excellent</p>;
  } else if (score >= 100) {
    return <p style={{ color: "lightgreen" }}>Outstanding</p>;
  }
};

export default calculateScoreText;
