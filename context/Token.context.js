import React, { createContext, useState, useEffect } from "react";
import Loading from "../components/Loading.component";

import io from "socket.io-client";

export const TokenContext = createContext(null);

const TokenContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const [activeUsersSocket, setActiveUsersSocket] = useState(null);
  const [adminSocket, setAdminSocket] = useState(null);

  const [connections, setConnections] = useState(0);

  //connect to socket
  useEffect(() => {
    setActiveUsersSocket(
      io.connect("/activeUsers", {
        transports: ["websocket"],
      })
    );
  }, []);

  //get token if refresh token exists in cookie
  useEffect(() => {
    try {
      setLoading(true);
      fetch("/token", {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === true) {
            setToken(data.token);
            console.log(data.token);
            setAdminSocket(
              io.connect("/connect", {
                transports: ["websocket"],
                auth: {
                  token: `Bearer ${data.token}`,
                },
              })
            );
          } else {
            setToken(null);
          }
        });
    } catch (error) {}
  }, [setToken]);

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        loading,
        setLoading,
        adminSocket,
        connections,
        setConnections,
        setAdminSocket,
        activeUsersSocket,
        setActiveUsersSocket,
      }}
    >
      <Loading loading={loading} />
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
