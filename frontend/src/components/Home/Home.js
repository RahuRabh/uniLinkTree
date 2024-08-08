import React, { useState } from "react";

//styles
import styles from "./Home.module.css";

//components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LinkForm from "../LinkForm/LinkForm";
import Auth from "../Auth/Auth";

const Home = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAuthPopupOpen, setAuthPopupOpen] = useState(false);

  //to check if user is logged in or not
  const isLoggedIn = !!localStorage.getItem("token");

  //create link form
  const handleCreateLinkClick = () => {
    if (isLoggedIn) {
      setIsFormVisible(true);
    } else {
      setAuthPopupOpen(true);
    }
  };

  const closePopup = () => {
    setAuthPopupOpen(false);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  //get's user their sharable link
  const handleLinkClick = () => {
    if (isLoggedIn) {
      const linkUrl = localStorage.getItem("userLink");
      window.open(linkUrl, "_blank");
    } else {
      setAuthPopupOpen(true);
    }
  };

  return (
    <div className={styles.container}>
      <Header onCreateLinkClick={handleCreateLinkClick} />
      {isFormVisible && <LinkForm onClose={handleCloseForm} />}
      <main className={styles.mainContent}>
        <section className={styles.monologueSection}>
          <h2>All Your Links in One Page</h2>
          <p>
            Join the community of creators to streamline your online presence. 
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

          <button
            onClick={handleCreateLinkClick}
            className={styles.createLinkBtn}
          >
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
          />
        </section>
      </main>
      <Footer />
      {isAuthPopupOpen && <Auth onClose={closePopup} />}
    </div>
  );
};

export default Home;
