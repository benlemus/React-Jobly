import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

export default function Profile({ curUser }) {
  const nav = useNavigate();

  return (
    <div className={styles.profileContainer}>
      <h1>Profile</h1>
      <div className={styles.profileInfo}>
        <p>
          Username: <strong>{curUser.username}</strong>
        </p>
        <p>
          First Name: <strong>{curUser.firstName}</strong>
        </p>
        <p>
          Last Name: <strong>{curUser.lastName}</strong>
        </p>
        <p>
          Email: <strong>{curUser.email}</strong>
        </p>
      </div>
      <button onClick={() => nav("/profile/update")}>Update Profile</button>
    </div>
  );
}
