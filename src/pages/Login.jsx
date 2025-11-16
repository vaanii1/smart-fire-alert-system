import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import PageNav from "../components/mainNav/PageNav";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import Message from "../components/message/Message";

function Login() {
  const [email, setEmail] = useState("frederickvaanii1@gmail.com");
  const [password, setPassword] = useState("vaanii@123");
  //to check which admin is login with the right credentials
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    //check if we have an email and password
    if (email && password) login({ email, password });
  }

  //if the admin is authenticated
  //use effect to observe the isAuthenticated state
  //replace the login page in the history stack with /app
  //it should not keep navigating when you want to go back
  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );
  return (
    <>
      <PageNav />
      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <fieldset className={styles.fieldset}>
            <h2>Log in</h2>
            {error && <Message message={error} />}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button>Log in</button>
            {/* <p>
              Don't already have an account? <Link to="/signup">Signup</Link>
            </p> */}
          </fieldset>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Login;
