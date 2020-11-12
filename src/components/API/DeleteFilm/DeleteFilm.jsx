import React from 'react';
import { Button, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './DeleteFilm.module.css';

const DeleteFilm = (props) => {
  return (
    <form className={styles.form} onSubmit={props.formSubmit} name="delete">
      {props.message && <p className={styles.message}>{props.message}</p>}
      <TextField
        className={styles.input}
        name="id"
        label="ID"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        required
      />
      <Button name="button" type="submit" size="large" color="primary" variant="contained" startIcon={<DeleteIcon />}>
        Удалить
      </Button>
    </form>
  );
};

export default DeleteFilm;
