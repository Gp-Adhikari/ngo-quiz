import AdminHead from "../../components/panel/AdminHead";

import styles from "../../styles/panel.module.css";
import SideNav from "../../components/panel/SideNav.component";

const Dashboard = () => {
  return (
    <>
      <AdminHead title="Dashboard" />

      <div className={styles.dashboard}>
        <SideNav />
      </div>
    </>
  );
};

export default Dashboard;
