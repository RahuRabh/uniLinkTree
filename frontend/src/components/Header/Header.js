import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//styles
import styles from "./Header.module.css";

//assets
import link from "../../assets/link.png";

//component
import Auth from "../Auth/Auth";

const Header = ({ onCreateLinkClick }) => {
  const navigate = useNavigate();

  //to check if user is logged in or not
  const isLoggedIn = !!localStorage.getItem("token");

  const [isAuthPopupOpen, setAuthPopupOpen] = useState(false);

  //function to logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  //function to check login and create a link
  const handleCreateLinkClick = () => {
    if (isLoggedIn) {
      onCreateLinkClick();
    } else {
      setAuthPopupOpen(true);
    }
  };

  const handleUserLink = () => {
    if(isLoggedIn){
      navigate("/userLinks")
    } else{
      setAuthPopupOpen(true);
    }
  }
  const handleLoginClick = () => {
    setAuthPopupOpen(true);
  };

  const closePopup = () => {
    setAuthPopupOpen(false);
  };

  const handlehome = () => {
    navigate("/")
  }
  return (
    <>
      <header className={styles.header}>
        <div className={styles.brand} onClick={handlehome}>
            <img src={link} className={styles.logo} alt="logo" />
            <h1 className={styles.title}>UniLink</h1>
        </div>

        <div className={styles.links}>
          <span onClick={handleCreateLinkClick}>Create Link</span>
          <span onClick={handleUserLink}>Your Links</span>
        </div>

        <div>
          {isLoggedIn ? (
            <div className={styles.btn} onClick={handleLogout}>Logout</div>
          ) : (
            <div className={styles.btn} onClick={handleLoginClick}>Login</div>
          )}
        </div>

      </header>
      {isAuthPopupOpen && <Auth onClose={closePopup} />}
    </>
  );
};

export default Header;
