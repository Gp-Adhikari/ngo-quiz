import "../styles/globals.css";

import AnimationContextProvider from "../context/Animation.context";
import DataContextProvider from "../context/Data.context";

function MyApp({ Component, pageProps }) {
  return (
    <DataContextProvider>
      <AnimationContextProvider>
        <Component {...pageProps} />
      </AnimationContextProvider>
    </DataContextProvider>
  );
}

export default MyApp;
