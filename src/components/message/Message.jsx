import styles from "./Message.module.css";

function Message({ message }) {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default Message;
