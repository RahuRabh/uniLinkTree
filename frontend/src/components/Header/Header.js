// src/components/Dashboard/Header.js
import React from "react";
import styles from "./Header.module.css";

import { useNavigate } from "react-router-dom";

const Header = ({ onCreateLinkClick }) => {
  const navigate = useNavigate();

  //logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleHome = () => {
    navigate("/home");
  }

  return (
    <header className={styles.header}>
      <div onClick={handleHome} className={styles.brand}>UniLink</div>
      <nav className={styles.nav}>
        <span onClick={onCreateLinkClick}>Create Link</span>
        <span>
          <a href="/userLinks">Your Links</a>
        </span>
      </nav>

      <button onClick={handleLogout} className={styles.logout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
