import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home({ curUser }) {
  const nav = useNavigate();

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeText}>
        <h1>Jobly</h1>
        <p>All the jobs in one convient place.</p>

        {curUser ? (
          <h3>Welcome Back {curUser.username}</h3>
        ) : (
          <div className={styles.btnContainer}>
            <button onClick={() => nav("/login")}>Login</button>
            <button onClick={() => nav("/signup")}>SignUp</button>
          </div>
        )}
      </div>
    </div>
  );
}
