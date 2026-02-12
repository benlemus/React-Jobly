import styles from "./Signup.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ signup }) {
  const nav = useNavigate();
  const formSetup = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(formSetup);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
    nav("/", { replace: true });
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <div className="formTitle">Sign Up</div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="First Name"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Last Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.signupBtn}>Sign Up</button>
      </form>
    </div>
  );
}
