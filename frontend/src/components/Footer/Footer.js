import React from "react";

//assets
import logo from "../../assets/link.png";
import insta from "../../assets/instagram.png";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/github.png";

//styles
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.branding}>
        <img src={logo} className={styles.logo} alt="UniLink Logo" />
        <h3>UniLink</h3>
        <p className={styles.copyRight}>
          © 2024 UniLink.
          <br /> All rights reserved.
        </p>
      </div>
      <div className={styles.contact}>
        <p>
          Connect with me <br />
          <a href="mailto:rahurabh@gmail.com">Email</a>
        <p>Open to work </p>
        </p>
      </div>
      <div className={styles.socialMedia}>
        <p>Connect</p>
        <a href="https://github.com/RahuRabh" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/rahurabh/" target="_blank" rel="noopener noreferrer">
          <img src={linkedin} alt="LinkedIn" />
        </a>
        <a href="https://instagram.com/ral.kum" target="_blank" rel="noopener noreferrer">
          <img src={insta} alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
