import { createContext, useContext, useEffect, useState } from "react";

import { TokenContext } from "./Token.context";

export const SocketContext = createContext(null);

const SocketContextProvider = ({ children }) => {
  const {
    token,
    adminSocket,
    activeUsersSocket,
    setConnections,
    setVisits,
    setTitle,
    setPresentationText,
    setQuestions,
    setCandidates,
    setCandidate,
  } = useContext(TokenContext);

  //handle active users socket
  useEffect(() => {
    try {
      if (activeUsersSocket !== null) {
        try {
          activeUsersSocket.on("connect", () => {
            //get initial data
            activeUsersSocket.on("connections", (msg) => {
              setConnections(msg);
            });

            activeUsersSocket.on("visits", (msg) => {
              setVisits(msg.totalVisits);
            });

            activeUsersSocket.on("title", (msg) => {
              setTitle(msg);
            });

            activeUsersSocket.on("presentationText", (msg) => {
              setPresentationText(msg);
            });

            activeUsersSocket.on("questions", (msg) => {
              setQuestions(msg);
            });

            activeUsersSocket.on("candidates", (msg) => {
              setCandidates(msg);
            });

            activeUsersSocket.on("candidate", (msg) => {
              setCandidate(msg);
            });
          });
        } catch (error) {}
      }
    } catch (error) {}
  }, [activeUsersSocket]);

  //handle admin socket
  useEffect(() => {
    try {
      if (
        adminSocket !== null &&
        token !== null &&
        token !== undefined &&
        token !== ""
      ) {
        try {
          adminSocket.on("connect", () => {
            //get initial data
            adminSocket.on("title", (msg) => {
              setTitle(msg);
            });

            adminSocket.on("presentationText", (msg) => {
              setPresentationText(msg);
            });

            adminSocket.on("questions", (msg) => {
              setQuestions(msg);
            });
          });
        } catch (error) {}
      }
    } catch (error) {}
  }, [adminSocket, token]);

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export default SocketContextProvider;
