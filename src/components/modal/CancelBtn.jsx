import styles from "./CancelBtn.module.css";

function CancelBtn({ onClick }) {
  return (
    <button
      className={styles.confirm}
      name="cancel-btn"
      id="no"
      onClick={onClick}
    >
      Cancel
    </button>
  );
}

export default CancelBtn;
