import styles from "./Navbar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ curUser, logout }) {
  const nav = useNavigate();
  const [curPage, setCurPage] = useState(null);

  const handleNav = (page) => {
    setCurPage(page);
    nav(page.toLowerCase());
  };

  const navItem = (page) => (
    <li
      onClick={() => handleNav(page)}
      style={{
        borderBottom: curPage === page ? "1px solid rgb(0, 140, 255)" : "",
        cursor: "pointer",
      }}
    >
      {page}
    </li>
  );

  return (
    <div className={styles.navContainer}>
      <div className={styles.titleContainer}>
        <nav
          className={styles.title}
          onClick={() => {
            setCurPage(null);
            nav("/");
          }}
        >
          Jobly
        </nav>
      </div>

      <div className={styles.linksContainer}>
        {curUser && (
          <nav className={styles.userLinks}>
            <ul>
              {navItem("Companies")} {navItem("Jobs")} {navItem("Profile")}
              <li onClick={logout}>Logout</li>
            </ul>
          </nav>
        )}

        {!curUser && (
          <nav className={styles.noUserLinks}>
            <ul>
              {navItem("Login")} {navItem("SignUp")}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

//  navItem("Companies") navItem("Jobs") navItem("Profile")
//                   <li>Logout</li>

//              navItem("Signup")(navItem("Login"))}
