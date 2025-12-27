import toast from "react-hot-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//styles
import styles from "./Home.module.css";

//components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LinkForm from "../LinkForm/LinkForm";
import Auth from "../Auth/Auth";

// utils
import { useAuth } from "../../utils/AuthProvider";
import { logOutUser } from "../../apis/auth";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAuthPopupOpen, setAuthPopupOpen] = useState(false);

  const requestAuthAction = (action) => {
    if (user) action();
    else setAuthPopupOpen(true);
  };

  const handleCreateLink = () => {
    requestAuthAction(() => setIsFormVisible(true));
  };

  const handleUserLink = () => {
    requestAuthAction(() => {
      navigate("/userlinks");
    });
  };

  const closePopup = () => {
    setAuthPopupOpen(false);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const handleLinkClick = () => {
    const userId = user?.userId || null;
    if (userId) {
      window.open(`/links/${userId}`, "_blank", "noreferrer");
    } else {
      setAuthPopupOpen(true);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logOutUser();
      toast.success(res.message);
      navigate("/");
      setUser(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Header
        onCreateLink={handleCreateLink}
        onUserLink={handleUserLink}
        onLogin={() => setAuthPopupOpen(true)}
        onLogout={handleLogout}
      />
      {isFormVisible && <LinkForm onClose={handleCloseForm} />}
      <main className={styles.mainContent}>
        <section className={styles.monologueSection}>
          <h2>All Your Links in One Page</h2>
          <p>
            ¯ Join the community of creators to streamline your online presence.
          </p>
          <p>
            {" "}
            With UniLink, you have one link that showcases everything you
            create, share, and connect with. Effortlessly manage and update your
            links.
          </p>
          <p>
            Simplify your online identity and maximize your reach with UniLink.
          </p>

          <button onClick={handleCreateLink} className={styles.createLinkBtn}>
            Create Link
          </button>
          <button onClick={handleLinkClick} className={styles.unilinkBtn}>
            Your UniLink
          </button>
        </section>
        <section className={styles.imageSection}>
          <img
            src="https://images.pexels.com/photos/10643964/pexels-photo-10643964.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="3D Funky Illustration"
            loading="lazy"
          />
        </section>
      </main>
      <Footer />
      {isAuthPopupOpen && <Auth onClose={closePopup} />}
    </div>
  );
};

export default Home;
