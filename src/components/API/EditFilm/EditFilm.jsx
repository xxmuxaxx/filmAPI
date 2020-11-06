import React from 'react';

import styles from './EditFilm.module.css';
import Input from '../../UI/Input/Input';
import TextArea from '../../UI/TextArea/TextArea';

const EditFilm = (props) => {
  return (
    <form className={styles.form} onSubmit={props.formSubmit} name="edit" onChange={props.formChange}>
      {props.message && <p className={styles.message}>{props.message}</p>}
      <Input name="id" placeholder="ID" required />
      <Input name="imdbID" placeholder="imdbID" />
      <Input name="title" placeholder="Название" />
      <Input name="titleEn" placeholder="Название на английском" />
      <Input name="year" placeholder="Год" />
      <Input name="country" placeholder="Страна" />
      <Input name="poster" placeholder="Обложка (url)" />
      <Input name="genres" placeholder="Жанры (через запятую)" />
      <Input name="type" placeholder="type (movie, series)" />
      <TextArea name="description" placeholder="Описание" rows="5" />
      <Input name="button" type="submit" />
    </form>
  );
};

export default EditFilm;
