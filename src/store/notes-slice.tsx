import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  _id: string;
  title: string;
  categorie: string;
  body: string;
  timeStamp: string;
}

interface noteState {
  notes: Array<Note>;
  filteredArray: Array<Note>;
}

interface Categorie {
  categorie: string;
}

const initialState: noteState = { notes: [], filteredArray: [] };

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Note>) {
      const newNote = action.payload;
      state.notes.push({
        _id: newNote._id,
        title: newNote.title,
        categorie: newNote.categorie,
        body: newNote.body,
        timeStamp: newNote.timeStamp,
      });

      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    deleteNote(state, action: PayloadAction<Note>) {
      const noteId = action.payload._id;
      state.notes = state.notes.filter((note) => {
        return note._id !== noteId;
      });

      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    getNotes(state) {
      state.notes = JSON.parse(localStorage.getItem("notes") || "[]");
    },
    filterNotes(state, action: PayloadAction<Categorie>) {
      const categorieQuery = action.payload.categorie;

      state.filteredArray = state.notes.filter(
        (note) => note.categorie === categorieQuery
      );
    },
  },
});

export const notesActions = noteSlice.actions;

export default noteSlice;
