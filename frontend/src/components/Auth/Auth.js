import React, { useState } from "react";
import styles from "./Auth.module.css";
import Register from "./Register/Register";
import Login from "./Login/Login";
export default function Auth() {
  const [currentView, setcurrentView] = useState("register");

  return (
    <div className={styles.overlay}>
    <div className={styles.mainContainer}>
      <div className={styles.authContainer}>
        <h1 className={styles.title}>UniLink</h1>
        <div className={styles.authButton}>
          <button className={currentView === "register" ? styles.active : ""} onClick={() => setcurrentView("register")}>Sign Up</button>
          <button className={currentView === "login" ? styles.active : ""} onClick={() => setcurrentView("login")}>Log In</button>
        </div>
        {currentView === "register" && <Register setCurrentView={setcurrentView} />}
        {currentView === "login" && <Login />}
      </div>
    </div>
    </div>
  );
}
