import styles from "./DeleteBtn.module.css";
function DeleteBtn({ onClick }) {
  return (
    <button
      className={styles.confirm}
      name="confirm-delete-btn"
      id="yes-delete"
      onClick={onClick}
    >
      Delete
    </button>
  );
}

export default DeleteBtn;
