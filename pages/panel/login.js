import React, { useState } from "react";

import AdminHead from "../../components/panel/AdminHead";

import styles from "../../styles/panel.module.css";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [checkUsername, setCheckUsername] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);

  const handleLogin = (e) => {
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
