import React, { useState } from "react";

//styles
import styles from "./Auth.module.css";

//components
import Register from "./Register/Register";
import Login from "./Login/Login";

export default function Auth({onClose}) {
  const [currentView, setcurrentView] = useState("login");

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
        {currentView === "login" && <Login onClose={onClose}/>}
      </div>
    </div>
    </div>
  );
}
