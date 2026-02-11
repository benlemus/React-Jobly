import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

export default function Profile({ curUser }) {
  const nav = useNavigate();

  return (
    <div className={styles.profileContainer}>
      <h1>Profile</h1>
      <div className={styles.profileInfo}>
        <p>
          <strong>Username:</strong> {curUser.username}
        </p>
        <p>
          <strong>First Name:</strong> {curUser.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {curUser.lastName}
        </p>
        <p>
          <strong>Email:</strong> {curUser.email}
        </p>
      </div>
      <button onClick={() => nav("/profile/update")}>Update Profile</button>
    </div>
  );
}
