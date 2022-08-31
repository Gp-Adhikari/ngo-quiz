import AdminHead from "../../components/AdminHead";

import styles from "../../styles/panel.module.css";

const Admin = () => {
  return (
    <>
      <AdminHead title={"Login"} />

      <div className={styles.loginWrapper}>
        <div className={styles.loginContainer}>
          <h2>LOGIN</h2>
          <form>
            <div className={styles.input}>
              <p>Username</p>
              <input type="text" />
            </div>

            <div className={styles.input}>
              <p>Password</p>
              <input type="password" />
            </div>

            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Admin;
