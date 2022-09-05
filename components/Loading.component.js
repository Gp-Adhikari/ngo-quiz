const Loading = ({ loading }) => {
  return (
    <div
      className={
        loading === true ? "loading show-loading" : "loading hide-loading"
      }
    >
      <div className="centered">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
      </div>
    </div>
  );
};

export default Loading;
