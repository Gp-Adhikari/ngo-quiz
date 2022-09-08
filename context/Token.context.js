import React, { createContext, useState, useEffect } from "react";
import Loading from "../components/Loading.component";

import io from "socket.io-client";

import { useRouter } from "next/router";

export const TokenContext = createContext(null);

const TokenContextProvider = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const [activeUsersSocket, setActiveUsersSocket] = useState(null);
  const [adminSocket, setAdminSocket] = useState(null);

  const [connections, setConnections] = useState(0);
  const [visits, setVisits] = useState(0);

  const [title, setTitle] = useState(null);
  const [presentationText, setPresentationText] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [language, setLanguage] = useState("en");

  //get token every 12 minutes
  const MINUTE_MS = 1000 * 60 * 8;

  useEffect(() => {
    try {
      if (token !== "" || token !== undefined || token !== null) {
        const interval = setInterval(() => {
          fetch("/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === true) {
                setToken(data.token);
              } else {
                router.replace("/panel/login");
              }
            });
        }, MINUTE_MS);

        return () => clearInterval(interval);
      }
    } catch (error) {}
  }, [token]);

  //connect to socket
  useEffect(() => {
    setActiveUsersSocket(
      io.connect("/activeUsers", {
        transports: ["websocket"],
      })
    );
  }, []);

  useEffect(() => {
    try {
      setAdminSocket(
        io.connect("/connect", {
          transports: ["websocket"],
          auth: {
            token: `Bearer ${token}`,
          },
        })
      );
    } catch (error) {}
  }, [token]);

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
        visits,
        setVisits,
        adminSocket,
        connections,
        setConnections,
        setAdminSocket,
        activeUsersSocket,
        setActiveUsersSocket,
        title,
        setTitle,
        language,
        setLanguage,
        presentationText,
        setPresentationText,
        questions,
        setQuestions,
        candidates,
        setCandidates,
        candidate,
        setCandidate,
      }}
    >
      <Loading loading={loading} />
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
