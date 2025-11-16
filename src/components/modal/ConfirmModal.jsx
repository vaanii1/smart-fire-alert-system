import styles from "./ConfirmModal.module.css";

function ConfirmModal({ children, isModalOpen }) {
  return (
    <div
      className={
        isModalOpen
          ? `${styles.confirmModalContainer} ${styles.showConfirmModalContainer}`
          : styles.confirmModalContainer
      }
    >
      {children}
    </div>
  );
}

export default ConfirmModal;
