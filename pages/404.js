import { useContext, useEffect } from "react";
import { TokenContext } from "../context/Token.context";

const NotFound = () => {
  const { setLoading, loading } = useContext(TokenContext);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 3000);
  }, [setLoading]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h1>Page Not Found!</h1>
    </div>
  );
};

export default NotFound;
