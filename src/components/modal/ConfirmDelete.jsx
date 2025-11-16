import styles from "./ConfirmDelete.module.css";

function ConfirmDelete({ children, houseToDelete }) {
  return (
    <fieldset className={styles.confirmDeleteFieldset}>
      <legend>
        Are you sure you want is to delete H00{houseToDelete[0].id}
      </legend>
      <div className={styles.confirmDeleteDiv}>{children}</div>
    </fieldset>
  );
}

export default ConfirmDelete;
