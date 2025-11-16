import styles from "./Button.module.css";
function Button({ children, onClick, type, value }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
      value={value}
    >
      {children}
    </button>
  );
}

export default Button;
