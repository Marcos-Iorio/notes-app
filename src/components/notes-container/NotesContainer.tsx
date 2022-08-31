import React, { Fragment, useEffect, useState, ChangeEvent } from "react";
import Notes from "../notes/Notes";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { notesActions } from "../../store/notes-slice";

import styles from "./NotesContainer.module.scss";
import Filter from "../filter/Filter";

import { AnimatePresence } from "framer-motion";

const NotesContainer = () => {
  const [categorie, setCategorie] = useState<string>("all");

  const dispatch = useDispatch();

  const notesItems = useSelector((state: RootState) => state.notes.notes);
  const filteredNotes = useSelector(
    (state: RootState) => state.notes.filteredArray
  );

  useEffect(() => {
    if (categorie === "all") {
      dispatch(notesActions.getNotes());
    } else {
      dispatch(
        notesActions.filterNotes({
          categorie: categorie,
        })
      );
    }
  }, [categorie]);

  const categorieChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCategorie(event.target.value);
  };

  const items =
    categorie === "all"
      ? notesItems.map((note) => (
          <Notes
            key={note._id}
            noteId={note._id}
            title={note.title}
            categorie={note.categorie}
            text={note.body}
            time={note.timeStamp}
          />
        ))
      : filteredNotes.map((note) => (
          <Notes
            key={note._id}
            noteId={note._id}
            title={note.title}
            categorie={note.categorie}
            text={note.body}
            time={note.timeStamp}
          />
        ));

  return (
    <Fragment>
      <Filter onChange={categorieChangeHandler} />
      <AnimatePresence>
        <section
          className={styles.notes_wrapper}
          style={
            items.length
              ? { justifyContent: "flex-start" }
              : { justifyContent: "center" }
          }
        >
          {items.length ? (
            items
          ) : (
            <div className={styles.notFoundWrapper}>
              <p className={styles.notFound}>Nothing to see here!</p>
              <img src="./undraw_Add_notes_re_ln36 (1).svg" className={styles.notFoundImage}/>
            </div>
          )}
        </section>
      </AnimatePresence>
    </Fragment>
  );
};

export default NotesContainer;
