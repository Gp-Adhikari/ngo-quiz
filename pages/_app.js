import "../styles/globals.css";
import "../styles/loading.css";

import AnimationContextProvider from "../context/Animation.context";
import DataContextProvider from "../context/Data.context";
import TokenContextProvider from "../context/Token.context";
import SocketContextProvider from "../context/Socket.context";

function MyApp({ Component, pageProps }) {
  return (
    <TokenContextProvider>
      <SocketContextProvider>
        <DataContextProvider>
          <AnimationContextProvider>
            <Component {...pageProps} />
          </AnimationContextProvider>
        </DataContextProvider>
      </SocketContextProvider>
    </TokenContextProvider>
  );
}

export default MyApp;
