import styles from "./Company.module.css";
import { useNavigate } from "react-router-dom";

export default function Company({ company }) {
  const nav = useNavigate();

  const handleNav = (handle) => {
    nav(`/companies/${handle}`);
  };

  return (
    <div
      className={styles.companyContainer}
      onClick={() => handleNav(company.handle)}
    >
      <div className={styles.companyName}>{company.name}</div>
      <div className={styles.companyDesc}>{company.description}</div>
    </div>
  );
}
