import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Admin.module.css";

function Admin() {
  //the admin
  const { logout } = useAuth();
  //if admin is logged out
  const navigate = useNavigate();

  //navigate to the hompage when logout is clicked
  function handleClick() {
    logout();
    navigate("/");
  }
  return (
    <div className={styles.admin}>
      {/* <span>Welcome, {admin.username}</span> */}
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default Admin;
