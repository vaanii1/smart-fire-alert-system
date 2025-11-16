import styles from "./AppLayout.module.css";

import SideBar from "../components/app/SideBar";
import Map from "../components/app/Map";
import Admin from "../components/app/Admin";

function AppLayout() {
  return (
    <main className={styles.main}>
      <div className={styles.mainItems}>
        <SideBar />
      </div>
      <div className={styles.mainItems}>
        <Map />
      </div>
      <Admin />
    </main>
  );
}

export default AppLayout;
