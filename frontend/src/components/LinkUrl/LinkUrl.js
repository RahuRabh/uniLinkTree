import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//loader component
import Loader from '../Loader/Loader'

//getUserLinks api get's all the link related to the user.
import { getUserLinks } from "../../apis/link";

//styles
import styles from "./LinkUrl.module.css";

const LinkUrl = () => {
  const [data, setData] = useState({ userName: "", links: [] });
  const { userId } = useParams(); // Extracts userId from URL
  const [loading, setloading] = useState(true)

  //Fetches url data from backend
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setloading(true)
        const response = await getUserLinks(userId);
        setData(response);
      } catch (error) {
        console.error("Error fetching links", error);
      } finally {
        setloading(false)
      }
    };
    if (userId) {
      fetchLinks(); // Call fetchLinks if userId exists
    }
  }, [userId]);

  if(loading){return<div><Loader /></div>}

  return (
    <div className={styles.main}>
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
          <p>No links available.</p>
        )}
      </div>
    </div>
  );
};

export default LinkUrl;
