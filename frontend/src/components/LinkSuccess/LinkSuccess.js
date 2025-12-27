import toast from "react-hot-toast";

// Assets
import cross from "../../assets/cross.png";

// Styles
import styles from "./LinkSuccess.module.css";

// Utils
import { useAuth } from "../../utils/AuthProvider";

export default function LinkSuccess({ onClose }) {
  const { user } = useAuth();
  const linkUrl = user?.linkUrl;

  const handleShareClick = () => {
    navigator.clipboard.writeText(linkUrl || "");
    toast.success("Link copied to clipboard");
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
