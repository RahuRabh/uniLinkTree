// src/components/Dashboard/Dashboard.js
import React, { useState } from 'react';
import styles from './Home.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LinkForm from '../LinkForm/LinkForm';
const Home = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleCreateLinkClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const handleLinkClick = () => {
    const linkUrl = localStorage.getItem("userLink");
    window.open(linkUrl, '_blank');
  }

  return (
    <div className={styles.container}>
      <Header onCreateLinkClick={handleCreateLinkClick}/>
      {isFormVisible && <LinkForm onClose={handleCloseForm} />}
      <main className={styles.mainContent}>
        <section className={styles.monologueSection}>
          <h2>All Your Links in One Simple Place</h2>
          <p>
            Join the community of creators and influencers using UniLink to streamline their online presence. 
            With UniLink, you have one link that showcases everything you create, share, and connect with 
            from your Instagram, TikTok, Twitter, YouTube, and other social media profiles. Effortlessly 
            manage and update your links, ensuring your followers always have access to your latest content. 
            Simplify your online identity and maximize your reach with UniLink.
          </p>
          <button onClick={handleCreateLinkClick} className={styles.createLinkBtn}>Create Link</button>
          <button onClick={handleLinkClick} className={styles.unilinkBtn}>Your UniLink</button>
        </section>
        <section className={styles.imageSection}>
          <img src="https://images.pexels.com/photos/10643964/pexels-photo-10643964.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="3D Funky Illustration" />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
