import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//styles
import styles from "./LinkForm.module.css";

//component 
import LinkSuccess from "../LinkSuccess/LinkSuccess"

//assets
import del from "../../assets/del.png";
import cross from "../../assets/cross.png";

//api's
import { createLink, updateLink } from "../../apis/link";

export default function LinkForm({ link, onClose }) {
  const [links, setLinks] = useState([{ title: "", url: "" }]);
  const [popupVisible, setPopupVisible] = useState(false);

  // Pre-fill the form with the link data if editing
  useEffect(() => {
    if (link) {
      setLinks(link.links);
    }
  }, [link]);

  //Function to validate
  const validate = () => {
    let isValid = true;
    links.forEach((link, index) => {
      if (!link.title.trim()) {
        toast.error(`Title for link ${index + 1} is required.`, {
          className: styles.customToast,
        });
        isValid = false;
      }
      if (!link.url.trim()) {
        toast.error(`URL for link ${index + 1} is required.`, {
          className: styles.customToast,
        });
        isValid = false;
      }
    });
    return isValid;
  };

  //Function to add Link
  const handleAddLink = () => {
    setLinks([...links, { title: "", url: "" }]);
  };

  //Function to remove Link
  const handleRemoveLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks[index] = { ...newLinks[index], [name]: value };
      return newLinks;
    });
  };

  //Function to submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const userId = localStorage.getItem("userId");
      const linkData = {
        links,
        userId,
      };
      try {
        if (link) {
          // If editing, update the link
          await updateLink(link._id, linkData);
          toast.success("Links updated successfully!", {
            className: styles.customToast,
          });
        } else {
          // If creating, create a new link
          await createLink(linkData);
          toast.success("Links submitted successfully!", {
            className: styles.customToast,
          });
          setPopupVisible(true);
        }
      } catch (error) {
        toast.error("Failed to submit links.", {
          className: styles.customToast,
        });
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <img
          src={cross}
          alt="Close"
          className={styles.closeIcon}
          onClick={onClose}
        />
        <h2>{link ? "Edit Link" : "Create Link"}</h2>
        <form onSubmit={handleSubmit}>
          {links.map((link, index) => (
            <div key={index} className={styles.linkRow}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={link.title}
                onChange={(e) => handleChange(index, e)}
                className={styles.input}
              />
              <input
                type="text"
                name="url"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleChange(index, e)}
                className={styles.input}
              />
              {links.length > 1 && (
                <img
                  src={del}
                  alt="Delete"
                  onClick={() => handleRemoveLink(index)}
                  className={styles.deleteBtn}
                />
              )}
            </div>
          ))}
          <div className={styles.button}>
            <button
              type="button"
              onClick={handleAddLink}
              className={styles.addBtn}
            >
              Add Link
            </button>
            <button type="submit" className={styles.submitBtn}>
              {link ? "Update" : "Submit"}
            </button>
          </div>
        </form>

        {popupVisible && (
          <LinkSuccess onClose={() => {setPopupVisible(false); onClose() }} />
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
