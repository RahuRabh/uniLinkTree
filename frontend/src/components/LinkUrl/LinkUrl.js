import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//loader component
import Loader from "../Loader/Loader";

//getUserLinks api get's all the link related to the user.
import { getUserLinks } from "../../apis/link";

//styles
import styles from "./LinkUrl.module.css";

const LinkUrl = () => {
  const [data, setData] = useState({ userName: "", links: [] });
  const { userId } = useParams(); // Extracts userId from URL
  const [loading, setloading] = useState(true);
  
  //Fetches url data from backend
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setloading(true);
        const response = await getUserLinks(userId);
        setData(response);
      } catch (error) {
        console.error("Error fetching links", error);
      } finally {
        setloading(false);
      }
    };
    if (userId) {
      fetchLinks(); // Call fetchLinks if userId exists
    }
  }, [userId]);

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("UniLink URL copied to clipboard!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  };

  return (
    <div className={styles.main}>
      <span>
        <a className={styles.uniLink} href="https://uni-link-tree.vercel.app/">
          Check out UniLink
        </a>
      </span>

      {loading ? (
        <Loader />
      ) : (
        <div className={styles.linkcontainer}>
          <h1 className={styles.userName}>Hi, I am {data.userName}</h1>
          <p className={styles.intro}>Welcome to my Uni-Link. </p>
          {data.links.length > 0 ? (
            data.links.map((linkGroup) => (
              <div key={linkGroup.id} className={styles.linkgroup}>
                {linkGroup.links.map((link) => (
                  <div key={link._id} className={styles.linkitem}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkurl}
                    >
                      <h3>{link.title}</h3>
                    </a>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No links available</p>
          )}
        </div>
      )}

      <button onClick={handleShare} className={styles.shareButton}>
        Share your UniLink
      </button>
      <ToastContainer />
    </div>
  );
};

export default LinkUrl;
