const Answer = ({ detectAnswerChange, answers, answerNumber }) => {
  return (
    <div className={"actualAnswer"}>
      <p>Answer {answerNumber}:</p>
      <input
        type="text"
        placeholder="English"
        data-answernumber={answerNumber}
        data-textfield="english"
        onChange={(e) => detectAnswerChange(e, answers)}
      />
      <input
        type="text"
        placeholder="Nepali"
        data-answernumber={answerNumber}
        data-textfield="nepali"
        onChange={(e) => detectAnswerChange(e, answers)}
      />
      <input
        type="number"
        placeholder="Points"
        data-answernumber={answerNumber}
        data-textfield="points"
        onChange={(e) => detectAnswerChange(e, answers)}
      />
    </div>
  );
};

export default Answer;
