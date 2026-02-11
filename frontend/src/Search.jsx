import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Search({ type }) {
  const nav = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const paramName = type === "companies" ? "name" : "title";
    nav(`/${type}?${paramName}=${searchTerm}`);
  };
  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter Search Term..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button>Search</button>
    </form>
  );
}
