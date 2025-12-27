import toast from "react-hot-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./Header.module.css";

// Assets
import link from "../../assets/link.png";

// Component
import Auth from "../Auth/Auth";

// Utils
import { useAuth } from "../../utils/AuthProvider";
import { logOutUser } from "../../apis/auth";

const Header = ({ onCreateLink, onUserLink, onLogin, onLogout }) => {
  const navigate = useNavigate();
  const { setUser, user, loading } = useAuth();
  const [isAuthPopupOpen, setAuthPopupOpen] = useState(false);

  // const handleLogout = async () => {
  //   try {
  //     const res = await logOutUser();
  //     toast.success(res.message);
  //     navigate("/");
  //     setUser(null);
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Logout failed");
  //     console.error("Logout error:", error);
  //   }
  // };

  // const handleCreateLinkClick = () => {
  //   if (loading) return;

  //   if (user) {
  //     onCreateLinkClick();
  //   } else {
  //     setAuthPopupOpen(true);
  //   }
  // };

  // const handleUserLink = () => {
  //   if (loading) return;

  //   if (user) {
  //     navigate("/userlinks");
  //   } else {
  //     setAuthPopupOpen(true);
  //   }
  // };
  // const handleLoginClick = () => {
  //   setAuthPopupOpen(true);
  // };

  // const closePopup = () => {
  //   setAuthPopupOpen(false);
  // };

  const handlehome = () => {
    navigate("/");
  };

  return (
    // <>
      <header className={styles.header}>
        <div className={styles.brand} onClick={handlehome}>
          <img src={link} className={styles.logo} alt="logo" />
          <h1 className={styles.title}>Uni-Link Offer</h1>
        </div>

        <div className={styles.links}>
          <button onClick={onCreateLink}>Create Link</button>
          <button onClick={onUserLink}>Your Links</button>
        </div>

        <div>
          {user ? (
            <>
              <span>{user.name}</span>
              <button className={styles.btn} onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className={styles.btn} onClick={onLogin}>
              Login
            </button>
          )}
        </div>
      </header>
    // </>
  );
};

{/* {isAuthPopupOpen && <Auth onClose={closePopup} />} */}
export default Header;
