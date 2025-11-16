import { NavLink } from "react-router-dom";
import styles from "./PageSideBar.module.css";

function PageSideBar({ isOpen }) {
  return (
    isOpen && (
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/pricing"> Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/app">Map</NavLink>
          </li>
          <li>
            <NavLink to="/analysis">Analysis</NavLink>
          </li>
          <li>
            <NavLink to="/contact"> Contact</NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.loginLink}>
              Admin Login
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  );
}

export default PageSideBar;
