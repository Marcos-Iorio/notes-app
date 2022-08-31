import React, { useState, ChangeEvent, FocusEvent } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";

import styles from "./Select.module.scss";

import { theme } from "../form/Form";

export interface ChangeProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  value?: string;
  all?: boolean;
  error?: boolean;
}

const InputSelect = (props: ChangeProps) => {
  const [value, setValue] = useState<string>(props.all ? "all" : "");

  const changeCategorieHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    props.onChange(event);
  };

  return (
    <FormControl fullWidth margin="normal" variant="filled">
      <ThemeProvider theme={theme}>
        <TextField
          select
          fullWidth
          error={props.error}
          helperText={props.error ? "Please select a categorie!" : ""}
          className={styles.select}
          label="Categories"
          variant="outlined"
          defaultValue="all"
          value={value}
          onChange={changeCategorieHandler}
          onBlur={props.onBlur}
        >
          {props.all && <MenuItem value="all">All</MenuItem>}
          <MenuItem value="Supermarket">Supermarket</MenuItem>
          <MenuItem value="Future plans">Future plans</MenuItem>
          <MenuItem value="Studies">Studies</MenuItem>
        </TextField>
      </ThemeProvider>
    </FormControl>
  );
};

export default InputSelect;
