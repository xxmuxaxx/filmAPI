import React from 'react';
import CreateFilm from './CreateFilm/CreateFilm';
import EditFilm from './EditFilm/EditFilm';
import Modal from '../UI/Modal/Modal';
import styles from './CreateFilm/CreateFilm.module.css';
import IMDBAlternative from '../../axios/axiosIMDBAlternative';
import filmApi from '../../axios/axiosFilmApi';

const API = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState(null);
  const [modalContent, setModalContent] = React.useState(null);
  const [message, setMessage] = React.useState(null);

  const formSubmit = (event) => {
    event.preventDefault();

    const target = event.target;

    let movieItem = {};

    IMDBAlternative.get(`?i=${target.imdbID.value}&r=json`).then(({ data }) => {
      switch (target.name) {
        case 'create':
          movieItem = {
            imdbID: target.imdbID.value,
            title: target.title.value,
            description: target.description.value,
            country: data.Country,
            genres: data.Genre.split(',').map((genre) => ({ name: genre })),
            poster: data.Poster,
            titleEn: data.Title,
            type: data.Type,
            year: +data.Year,
          };

          filmApi.post('create', movieItem).then(() => setMessage('Успешно'));
          return target.reset();
        case 'edit':
          filmApi.get(`/find/{id}?id=${target.id.value}`).then(({ data }) => {
            const genres =
              target.genres.value !== '' ? target.genres.value.split(',').map((genre) => ({ name: genre })) : null;

            movieItem = {
              country: target.country.value || data.search[0].country,
              description: target.description.value || data.search[0].description,
              genres: genres || data.search[0].genres,
              id: target.id.value,
              imdbID: target.imdbID.value || data.search[0].imdbID,
              poster: target.poster.value || data.search[0].poster,
              title: target.title.value || data.search[0].title,
              titleEn: target.titleEn.value || data.search[0].titleEn,
              type: target.type.value || data.search[0].type,
              year: +target.year.value || data.search[0].year,
            };

            filmApi.put(`update/${target.id.value}`, movieItem).then(() => setMessage('Успешно'));
            target.reset();
          });
          break;
        default:
          return console.warn('Нет такой формы');
      }
    });
  };

  const toggleModalHadler = (event) => {
    setIsModalOpen(!isModalOpen);
    setModalTitle(event?.target?.innerText || null);
    setModalContent(event?.target?.dataset.content || null);
  };

  return (
    <>
      <div className="container" style={{ margin: '0 auto', maxWidth: '600px' }}>
        <div className={styles.wrapper}>
          <button className={styles.button} onClick={toggleModalHadler} data-content="create">
            Добавить фильм
          </button>
          <button className={styles.button} onClick={toggleModalHadler} data-content="edit">
            Изменить фильм
          </button>
        </div>
      </div>
      <Modal title={modalTitle} toggleModalHadler={toggleModalHadler} isModalOpen={isModalOpen}>
        {modalContent === 'create' && <CreateFilm formSubmit={formSubmit} message={message} />}
        {modalContent === 'edit' && <EditFilm formSubmit={formSubmit} message={message} />}
      </Modal>
    </>
  );
};

export default API;
