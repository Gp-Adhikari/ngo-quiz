import { createContext, useContext, useEffect, useState } from "react";

import { TokenContext } from "./Token.context";

export const SocketContext = createContext(null);

const SocketContextProvider = ({ children }) => {
  const { token, adminSocket, activeUsersSocket, setConnections } =
    useContext(TokenContext);

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
          });
        } catch (error) {}
      }
    } catch (error) {}
  }, [activeUsersSocket]);

  //handle admin socket
  useEffect(() => {
    try {
      if (adminSocket !== null && token !== null && token !== "") {
        try {
          adminSocket.on("connect", () => {
            //get initial data
          });
        } catch (error) {}
      }
    } catch (error) {}
  }, [adminSocket, token]);

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export default SocketContextProvider;
