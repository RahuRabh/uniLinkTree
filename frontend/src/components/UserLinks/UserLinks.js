import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
//api's
import { getLinks, deleteLink } from "../../apis/link";

//Component
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LinkForm from "../LinkForm/LinkForm";
import Loader from "../Loader/Loader";

//styles and assets
import styles from "./UserLinks.module.css";
import edit from "../../assets/edit.png";
import del from "../../assets/del.png";
import { useAuth } from "../../utils/AuthProvider";

export default function UserLinks() {
  const { user } = useAuth();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  let userId = user?.userId;

  const handleCreateLinkClick = () => {
    setIsFormVisible(true);
    setEditingLink(null);
  };

  // To Fetch Link Data
  useEffect(() => {

    if (!userId) return;

    const fetchLinks = async () => {
      try {
        const data = await getLinks(userId);
        setLinks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, [userId]);

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
      toast.success("Link deleted successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error deleting link.";
      toast.error(errorMessage);
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
          <Loader />
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
    </div>
  );
}
