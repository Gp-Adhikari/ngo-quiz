import React, { useState, useContext, useEffect } from "react";

import AdminHead from "../../components/panel/AdminHead";
import { TokenContext } from "../../context/Token.context";
import styles from "../../styles/panel.module.css";

import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();

  const { token, setToken, loading, setLoading } = useContext(TokenContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [checkUsername, setCheckUsername] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);

  const [error, setError] = useState(false);

  //set loading to true as default
  useEffect(() => {
    setLoading(true);
  }, [setLoading]);

  useEffect(() => {
    if (token === null || token === "") {
      setLoading(false);
    } else {
      router.replace("/panel");
    }
  }, [token, router, setLoading]);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      if (username === "") {
        setCheckUsername(true);
        return;
      }
      setCheckUsername(false);

      if (password === "") {
        setCheckPassword(true);
        return;
      }
      setCheckPassword(false);

      setLoading(true);

      const csrfToken = await fetch("/api/csrf");
      const csrfResult = await csrfToken.json();

      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xsrf-token": csrfResult.csrfToken,
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const result = await response.json();

      if (result.status === true) {
        setToken(result.token);
        setError(false);
        router.replace("/panel");
      }

      if (result.status === false) {
        setLoading(false);
        setError(true);
      }
    } catch (error) {}
  };

  return (
    <>
      <AdminHead title={"Login"} />
      <div className={styles.loginWrapper}>
        <div className={styles.loginContainer}>
          <h2>LOGIN</h2>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className={styles.input}>
              <p>Username</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {checkUsername === true ? (
                <p className={styles.error}>*Invalid Username.</p>
              ) : null}
            </div>

            <div className={styles.input}>
              <p>Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {checkPassword === true ? (
                <p className={styles.error}>*Invalid Password.</p>
              ) : error === true ? (
                <p className={styles.error}>*Invalid Username or Password.</p>
              ) : null}
            </div>

            <button onClick={(e) => handleLogin(e)}>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Admin;
