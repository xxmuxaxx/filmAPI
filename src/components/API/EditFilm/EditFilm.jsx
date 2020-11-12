import React from 'react';
import { Button, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import styles from './EditFilm.module.css';

const EditFilm = (props) => {
  return (
    <form className={styles.form} onSubmit={props.formSubmit} name="edit" onChange={props.formChange}>
      {props.message && <p className={styles.message}>{props.message}</p>}
      <TextField
        className={styles.input}
        name="id"
        label="ID"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        className={styles.input}
        name="imdbID"
        label="imdbID"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        className={styles.input}
        name="title"
        label="Название"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        className={styles.input}
        name="titleEn"
        label="Название на английском"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        className={styles.input}
        name="year"
        label="Год"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        className={styles.input}
        name="country"
        label="Страна"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        className={styles.input}
        name="poster"
        label="Обложка (url)"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        className={styles.input}
        name="video"
        label="Трейлер (youtube key)"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        className={styles.input}
        name="genres"
        label="Жанры (через запятую)"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        className={styles.input}
        name="type"
        label="Тип (movie, series)"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        className={styles.input}
        name="description"
        label="Описание"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        rows={5}
        multiline
      />
      <Button name="button" type="submit" size="large" color="primary" variant="contained" startIcon={<SaveIcon />}>
        Сохранить
      </Button>
    </form>
  );
};

export default EditFilm;
