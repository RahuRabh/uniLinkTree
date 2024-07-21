import React, { useEffect, useState } from "react";
import { getLinks } from "../../apis/link";
import styles from "./LinkUrl.module.css";
import { useParams } from "react-router-dom";
const LinkUrl = () => {
  const [links, setLinks] = useState([]);
  const { userId } = useParams(); // Extract userId from URL
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        if (!userId) {
          throw new Error("User ID not found in URL");
        }
        const response = await getLinks(userId);
        setLinks(response);
      } catch (error) {
        console.error("Error fetching links", error);
      }
    };

    fetchLinks();
  }, [userId]);

  return (
    <div>
      <h1 className={styles.brandname}>UniLink</h1>
      <p className={styles.para}>All your link in one place.</p>
      <div className={styles.linkcontainer}>
        {links.length > 0 ? (
          links.map((linkGroup) => (
            <div key={linkGroup._id} className={styles.linkgroup}>
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
          <p>No links available.</p>
        )}
      </div>
    </div>
  );
};

export default LinkUrl;
