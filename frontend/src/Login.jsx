import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ login }) {
  const nav = useNavigate();
  const formSetup = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(formSetup);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    nav("/", { replace: true });
    setFormData(formSetup);
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <div className="formTitle">Login</div>
        <div className={styles.inputContainer}>
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
        </div>
        <button className={styles.loginBtn}>Login</button>
      </form>
    </div>
  );
}
