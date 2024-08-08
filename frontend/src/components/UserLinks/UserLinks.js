import React, { useEffect, useState } from "react";

//api's
import { getLinks, deleteLink } from "../../apis/link";

//Component
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LinkForm from "../LinkForm/LinkForm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//styles and assets
import styles from "./UserLinks.module.css";
import edit from "../../assets/edit.png";
import del from "../../assets/del.png";

export default function UserLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleCreateLinkClick = () => {
    setIsFormVisible(true);
    setEditingLink(null);
  };

  // To Fetch Link Data
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        let userId = localStorage.getItem("userId");
        const data = await getLinks(userId);
        setLinks(data);
        setLoading(false);
      } catch (error) {
        console.log(console.error());
      }
    };
    fetchLinks();
  }, []);

  //Function to edit
  const handleEdit = (link) => {
    setEditingLink(link);
    setIsFormVisible(true); 
  };

  //Function to delete
  const handleDelete = async (linkId) => {
    try {
      await deleteLink(linkId);
      setLinks((prevLinks) => prevLinks.filter((link) => link._id !== linkId));
      toast.success("Link deleted successfully!", {
        className: styles.customToast,
      });
    } catch (error) {
      console.log("Error deleting link:", error);
      toast.error("Error deleting link. Please try again.", {
        className: styles.customToast,
      });
    }
  };

  const handleCloseForm = () => {
    setEditingLink(null);
    setIsFormVisible(false);
  };

  return (
    <div className={styles.container}>
      <Header onCreateLinkClick={handleCreateLinkClick} />
      <main className={styles.mainContent}>
        {isFormVisible && (
          <LinkForm link={editingLink} onClose={handleCloseForm} />
        )}
        {loading ? (
          <div className={styles.loader}>Loading...</div>
        ) : links.length > 0 ? (
          links.map((linkObj, index) => (
            <div
              key={linkObj._id}
              className={`${styles.linkCard} ${
                index % 2 === 0 ? styles.evenCard : styles.oddCard
              }`}
            >
              {linkObj.links.map((link) => (
                <div key={link._id} className={styles.linkRow}>
                  <span className={styles.linkTitle}>{link.title}</span>
                  <span className={styles.linkUrl}>{link.url}</span>
                </div>
              ))}
              <div className={styles.actionButtons}>
                <img
                  src={edit}
                  alt="Edit"
                  className={styles.editIcon}
                  onClick={() => handleEdit(linkObj)}
                />
                <img
                  src={del}
                  alt="Delete"
                  className={styles.deleteIcon}
                  onClick={() => handleDelete(linkObj._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noLinksMessage}>No links uploaded yet.</div>
        )}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}