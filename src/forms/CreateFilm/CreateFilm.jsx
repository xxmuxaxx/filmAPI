import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm, stopSubmit } from 'redux-form';

import filmApi from '../../api/filmApi';
import IMDBAlternative from '../../api/IMDBAlternative';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Button } from '@material-ui/core';
import { TextField } from '@jcoreio/redux-form-material-ui';
import styles from './CreateFilm.module.scss';

const Input = (props) => (
  <Field
    className={styles.input}
    variant="outlined"
    component={TextField}
    {...props}
  />
);

const validate = (values) => {
  const errors = {};

  if (!values.imdbID) errors.imdbID = 'Обязательное поле';
  if (!values.title) errors.title = 'Обязательное поле';

  return errors;
};

let CreateFilmForm = ({
  message,
  error,
  handleSubmit,
  pristine,
  submitting,
}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input name="imdbID" label="imdbID" />
      <Input name="title" label="Название" />
      <Input name="video" label="Трейлер (youtube id)" />
      <Input name="description" label="Описание" rows={5} multiline />

      {message && <p className={styles.message}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <Button
        type="submit"
        size="large"
        color="primary"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        disabled={pristine || submitting}
      >
        Сохранить
      </Button>
    </form>
  );
};

CreateFilmForm = reduxForm({ form: 'createFilm', validate })(CreateFilmForm);

const CreateFilm = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);

  useEffect(() => {
    message && setTimeout(() => setMessage(null), 5000);
  }, [message]);

  const onSubmit = async ({ imdbID, title, video, description }) => {
    const data = await IMDBAlternative.getFilm(imdbID);

    filmApi
      .createFilm({
        imdbID: imdbID,
        title: title,
        description: description,
        country: data.Country,
        genres: data.Genre.split(', ').map((genre) => ({ name: genre })),
        poster: data.Poster,
        titleEn: data.Title,
        type: data.Type,
        video: video,
        year: Number(data.Year),
      })
      .then(() => setMessage('Фильм успешно создан'))
      .catch(() =>
        dispatch(
          stopSubmit('createFilm', { _error: 'Ошибка при создании фильма' })
        )
      );
  };

  return <CreateFilmForm onSubmit={onSubmit} message={message} />;
};

export default CreateFilm;
