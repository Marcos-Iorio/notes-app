import React, { KeyboardEvent } from "react";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import { notesActions } from "../../store/notes-slice";
import { notificationActions } from "../../store/notification-slice";

import { v4 as uuidv4 } from "uuid";

import styles from "./Form.module.scss";
import InputSelect from "../select/InputSelect";

import useInput from "../../hooks/useInput";

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Form = () => {
  let formIsValid = false;

  //Validations
  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    valueBlurHandler: titleBlurHandler,
    reset: resetTitle
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: enteredCategorie,
    isValid: enteredCategorieIsValid,
    hasError: categorieHasError,
    valueChangeHandler: categorieChangeHandler,
    valueBlurHandler: categorieBlurHandler,
    reset: resetCategorie
  } = useInput((value: string) => value.length !== 0);

  const {
    value: enteredText,
    isValid: enteredTextIsValid,
    hasError: textHasError,
    valueChangeHandler: textChangeHandler,
    valueBlurHandler: textBlurHandler,
    reset: resetText
  } = useInput((value: string) => value.trim() !== "");

  const dispatch = useDispatch();

  console.log(categorieHasError);

  if (enteredTitle && enteredCategorie && enteredText) {
    formIsValid = true;
  }

  const handleEnterMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      submitHandler(e);
  }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>): void => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    dispatch(
      notesActions.addNote({
        _id: uuidv4(),
        title: enteredTitle,
        categorie: enteredCategorie,
        body: enteredText,
        timeStamp: new Date().toLocaleString(),
      })
    );

    dispatch(
      notificationActions.showNotification({
        status: "success",
        title: "Note created!",
        message: "Note created successfully!",
        open: true,
      })
    );

    resetTitle();
    resetText();
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <FormControl fullWidth sx={{ height: "100%" }}>
        <ThemeProvider theme={theme}>
          <TextField
            color="primary"
            error={titleHasError}
            helperText={titleHasError ? "Title must not be empty" : ""}
            className={styles.input}
            id="outlined-basic"
            label="Note title"
            variant="outlined"
            margin="normal"
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            onKeyUp={handleEnterMessage}
          />
          <InputSelect
            error={categorieHasError}
            onChange={categorieChangeHandler}
            onBlur={categorieBlurHandler}
            value={enteredCategorie}
            all={false}
          />
          <TextField
            error={textHasError}
            helperText={textHasError ? "Text must not be empty" : ""}
            className={styles.input}
            id="outlined-multiline-flexible"
            label="Text"
            multiline
            rows={6}
            margin="normal"
            variant="outlined"
            value={enteredText}
            onChange={textChangeHandler}
            onBlur={textBlurHandler}
            onKeyUp={handleEnterMessage}
          />
          <LoadingButton
            className={styles["add-button"]}
            disabled={!formIsValid}
            variant="outlined"
            loadingIndicator="Adding..."
            loadingPosition="start"
            startIcon={<AddIcon />}
            type="submit"
          >
            Add
          </LoadingButton>
        </ThemeProvider>
      </FormControl>
    </form>
  );
};

export default Form;
