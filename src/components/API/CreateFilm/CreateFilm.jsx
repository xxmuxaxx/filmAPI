import React from 'react';

import filmApi from '../../../axios/axiosFilmApi';
import IMDBAlternative from '../../../axios/axiosIMDBAlternative';
import Input from '../../UI/Input/Input';
import Modal from '../../UI/Modal/Modal';
import styles from './CreateFilm.module.css';

const CreateFilm = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const formSubmit = (event) => {
    event.preventDefault();

    const target = event.target;

    IMDBAlternative.get(`?i=${target.imdbID.value}&r=json`).then(({ data }) => {
      console.log(data);

      const movieItem = {
        country: data.Country,
        description: target.description.value,
        genres: data.Genre.split(',').map((genre) => ({ name: genre })),
        imdbID: target.imdbID.value,
        poster: data.Poster,
        title: target.title.value,
        titleEn: data.Title,
        type: data.Type,
        year: +data.Year,
      };

      filmApi.post('create', movieItem).then(() => {
        target.reset();
        setMessage('Успешно');
      });
    });

    // const movieItem = {
    //   country: target.country.value,
    //   description: target.description.value,
    //   genres: target.genres.value.split(',').map((genre) => ({ name: genre })),
    //   imdbID: target.imdbID.value,
    //   poster: target.poster.value,
    //   title: target.title.value,
    //   titleEn: target.titleEn.value,
    //   type: target.type.value,
    //   year: +target.year.value,
    // };

    // filmApi.post('create', movieItem).then(() => {
    //   target.reset();
    //   setMessage('Успешно');
    // });
  };

  const toggleModalHadler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="container" style={{ margin: '0 auto', maxWidth: '600px' }}>
        <div className={styles.wrapper}>
          <button className={styles.button} onClick={toggleModalHadler}>
            Добавить фильм
          </button>
        </div>
      </div>
      <Modal title="Добавить фильм" isModalOpen={isModalOpen} toggleModalHadler={toggleModalHadler}>
        <form className={styles.form} onSubmit={formSubmit}>
          {message && <p className={styles.message}>{message}</p>}
          {/* <Input name="country" placeholder="Страна" required /> */}
          <Input name="title" placeholder="Название" required />
          <Input name="description" placeholder="Описание" required />
          <Input name="imdbID" placeholder="imdbID" required />
          {/* <Input name="genres" placeholder="Жанры (через запятую)" required /> */}
          {/* <Input name="poster" placeholder="Обложка (url)" required /> */}
          {/* <Input name="titleEn" placeholder="Название на английском" required /> */}
          {/* <Input name="type" placeholder="type (movie, series)" required /> */}
          {/* <Input name="year" placeholder="Год" required /> */}
          <Input type="submit" />
        </form>
      </Modal>
    </>
  );
};

export default CreateFilm;
