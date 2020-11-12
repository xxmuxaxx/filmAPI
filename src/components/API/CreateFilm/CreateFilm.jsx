import React from 'react';
import { Button, TextField } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import styles from './CreateFilm.module.css';

const CreateFilm = (props) => {
  return (
    <form className={styles.form} onSubmit={props.formSubmit} name="create">
      {props.message && <p className={styles.message}>{props.message}</p>}
      <TextField className={styles.input} name="imdbID" label="imdbID" variant="outlined" required />
      <TextField className={styles.input} name="title" label="Название" variant="outlined" required />
      <TextField className={styles.input} name="video" label="Трейлер (youtube id)" variant="outlined" />
      <TextField className={styles.input} name="description" label="Описание" variant="outlined" rows={5} multiline />
      <Button
        name="button"
        type="submit"
        size="large"
        color="primary"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Создать
      </Button>
    </form>
  );
};

export default CreateFilm;
