import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileUpdate({ curUser, updateProfile }) {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    firstName: curUser?.firstName || "",
    lastName: curUser?.lastName || "",
    email: curUser?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...formData };
    if (!submitData.password) delete submitData.password;
    updateProfile(submitData);
    nav("/profile");
  };

  return (
    <>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
}
