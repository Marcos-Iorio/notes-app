import React, { useState, Fragment } from "react";

import styles from "./Notes.module.scss";
import { motion } from "framer-motion";

import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { notesActions } from "../../store/notes-slice";
import { notificationActions } from "../../store/notification-slice";

interface Props {
  noteId: string;
  title: string;
  categorie: string;
  text: string;
  time: string;
}

const Notes = ({ noteId, title, categorie, text, time }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const deleteHandler = (id: string) => {
    setIsOpen(false);
    dispatch(
      notesActions.deleteNote({
        _id: id,
        title,
        categorie,
        body: text,
        timeStamp: time,
      })
    );
    dispatch(
      notificationActions.showNotification({
        status: "error",
        title: "Note deleted!",
        message: "Note deleted successfully",
        open: true,
      })
    );
  };

  const noteClasses =
    categorie === "Supermarket"
      ? styles.supermarket
      : categorie === "Future plans"
      ? styles.future
      : styles.studies;

  return (
    <Fragment>
      {isOpen ? (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <motion.article
            className={`${noteClasses} ${styles["opened-card"]}`}
            layout
            key={noteId}
            layoutId={noteId}
            onClick={() => setIsOpen(false)}
          >
            <motion.div className={styles["note-info"]}>
              <motion.h3 className={styles["note-title"]}>{title}</motion.h3>
              <motion.p className={styles["note-categorie"]}>
                {categorie}
              </motion.p>
              <motion.p className={styles["note-text"]}>{text}</motion.p>
              <motion.p className={styles.time}>{time}</motion.p>
              <Button
                variant="outlined"
                className={styles["delete-button"]}
                startIcon={<DeleteIcon />}
                onClick={() => deleteHandler(noteId)}
                color='error'
              >
                Delete
              </Button>
            </motion.div>
          </motion.article>
        </div>
      ) : (
        <motion.article
          className={`${noteClasses} ${styles["note-card"]}`}
          layout
          key={noteId}
          layoutId={noteId}
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className={styles["note-info"]}>
            <motion.h3 className={styles["note-title"]}>{title}</motion.h3>
            <motion.p className={styles["note-categorie"]}>
              {categorie}
            </motion.p>
            <motion.p className={styles["note-text"]}>{text}</motion.p>
            <motion.p className={styles.time}>{time}</motion.p>
          </motion.div>
          <motion.button
            className={styles["delete-note"]}
            onClick={() => deleteHandler(noteId)}
          >
            <DeleteIcon />
          </motion.button>
        </motion.article>
      )}
    </Fragment>
  );
};

export default Notes;
