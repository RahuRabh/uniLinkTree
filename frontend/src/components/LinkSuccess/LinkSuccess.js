import React from "react";
import styles from "./LinkSuccess.module.css";
import cross from "../../assets/cross.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LinkSuccess({ onClose }) {
  const linkUrl = localStorage.getItem("uniLink");
  const handleShareClick = () => {
    navigator.clipboard
      .writeText(linkUrl)
      .then(() => {
        toast.success("Link copied to clipboard", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
        toast.error("Failed to copy link", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <img
          alt="cross"
          src={cross}
          onClick={onClose}
          className={styles.closeButton}
        />
        <div className={styles.body}>
          <h2>
            Your UniLink is <br />
            Ready to Share!
          </h2>
          <input
            type="text"
            className={styles.linkInput}
            value={linkUrl}
            readOnly
          />
          <button className={styles.shareButton} onClick={handleShareClick}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
