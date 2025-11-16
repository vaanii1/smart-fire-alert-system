import { useState } from "react";
import styles from "./PageNav.module.css";
import Logo from "../logo/Logo";
import { NavLink } from "react-router-dom";
import PageSideBar from "./PageSideBar";

function PageNav() {
  // state to open and close sidebar
  const [isOpen, setIsOpen] = useState(false);
  // function to toggle the sidebar
  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }
  return (
    <header>
      <nav className={styles.nav}>
        {/* logo  */}
        <div className={styles.logoDiv}>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        {/* nav bar  */}
        <ul>
          <li className={styles.hideMainNavLink}>
            <NavLink to="/about">About</NavLink>
          </li>
          <li className={styles.hideMainNavLink}>
            <NavLink to="/pricing"> Pricing</NavLink>
          </li>
          <li className={styles.hideMainNavLink}>
            <NavLink to="/app">Map</NavLink>
          </li>
          <li className={styles.hideMainNavLink}>
            <NavLink to="/analysis">Analysis</NavLink>
          </li>
          <li className={styles.hideMainNavLink}>
            <NavLink to="/contact"> Contact</NavLink>
          </li>
          <li className={styles.hideMainNavLink}>
            <NavLink to="/login" className={styles.loginLink}>
              Admin Login
            </NavLink>
          </li>
        </ul>
        {/* call handleToggle when the menu is clicked */}
        <span onClick={handleToggle}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#003566"
              className={styles.menuSvg}
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#003566"
              className={styles.menuSvg}
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          )}
        </span>
      </nav>
      {/* the Side Bar  */}
      <PageSideBar isOpen={isOpen} />
    </header>
  );
}

export default PageNav;
