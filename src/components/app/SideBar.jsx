import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import styles from "./SideBar.module.css";

function SideBar() {
  return (
    <>
      <div className={styles.sideBarContainer}>
        <AppNav />
      </div>
      {/* outlet used to display the correct nested component selected */}
      <Outlet />
    </>
  );
}

export default SideBar;
