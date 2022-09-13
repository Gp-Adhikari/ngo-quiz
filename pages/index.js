import { useContext, useEffect } from "react";
import Body from "../components/Body.component";
import ChooseLanguage from "../components/ChooseLanguage.component";
import Header from "../components/Header.component";
import SEO from "../components/SEO";
import { TokenContext } from "../context/Token.context";

const Home = () => {
  const { setLoading, loading, token } = useContext(TokenContext);

  useEffect(() => {
    if (token || loading) {
      setLoading(false);
    }
  }, [loading, setLoading, token]);

  return (
    <>
      <ChooseLanguage />
      <SEO title={"Home - Choose Your Candidate"} />
      <Header />
      <Body />
    </>
  );
};

export default Home;
