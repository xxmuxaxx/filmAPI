import React from 'react';

import CreateFilm from './CreateFilm/CreateFilm';
import EditFilm from './EditFilm/EditFilm';
import DeleteFilm from './DeleteFilm/DeleteFilm';
import Modal from '../UI/Modal/Modal';

import styles from './API.module.css';

import IMDBAlternative from '../../axios/axiosIMDBAlternative';
import filmApi from '../../axios/filmApi';

const API = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState(null);
  const [modalContent, setModalContent] = React.useState(null);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    !isModalOpen && setMessage(null);
  }, [isModalOpen]);

  const formChange = (event) => {
    const target = event.target;
    const currentTaget = event.currentTarget;

    if (target.name === 'id') {
      const id = target.value;
      currentTaget.button.disabled = true;

      filmApi
        .get(`/find/{id}?id=${id}`)
        .then(({ data }) => {
          currentTaget.country.value = data.search[0].country;
          currentTaget.description.value = data.search[0].description;
          currentTaget.genres.value = [...data.search[0].genres.map((item) => item.name)].join(', ');
          currentTaget.imdbID.value = data.search[0].imdbID;
          currentTaget.poster.value = data.search[0].poster;
          currentTaget.video.value = data.search[0].video;
          currentTaget.title.value = data.search[0].title;
          currentTaget.titleEn.value = data.search[0].titleEn;
          currentTaget.type.value = data.search[0].type;
          currentTaget.year.value = data.search[0].year;

          currentTaget.button.disabled = false;
        })
        .catch(() => {
          currentTaget.country.value = '';
          currentTaget.description.value = '';
          currentTaget.genres.value = '';
          currentTaget.imdbID.value = '';
          currentTaget.poster.value = '';
          currentTaget.title.value = '';
          currentTaget.titleEn.value = '';
          currentTaget.type.value = '';
          currentTaget.year.value = '';

          currentTaget.button.disabled = false;
        });
    }
  };

  const formSubmit = (event) => {
    event.preventDefault();

    const target = event.target;

    let movieItem = {};

    switch (target.name) {
      case 'create':
        IMDBAlternative.get(`?i=${target.imdbID.value}&r=json`).then(({ data }) => {
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
        });
        break;
      case 'edit':
        IMDBAlternative.get(`?i=${target.imdbID.value}&r=json`).then(({ data }) => {
          movieItem = {
            country: target.country.value,
            description: target.description.value,
            genres: target.genres.value.split(',').map((genre) => ({ name: genre })),
            id: target.id.value,
            imdbID: target.imdbID.value,
            poster: target.poster.value,
            title: target.title.value,
            titleEn: target.titleEn.value,
            type: target.type.value,
            video: target.video.value,
            year: +target.year.value,
          };

          filmApi
            .put(`update/${target.id.value}`, movieItem)
            .then(() => setMessage('Успешно'))
            .catch((error) => console.warn(error));

          target.reset();
        });
        break;
      case 'delete':
        filmApi.delete(`delete/${target.id.value}`).then(() => setMessage('Успешно'));
        target.reset();
        break;
      default:
        return console.warn('Нет такой формы');
    }
  };

  const toggleModalHadler = (event) => {
    setIsModalOpen(!isModalOpen);
    setModalTitle(event?.target?.innerText || null);
    setModalContent(event?.target?.dataset.content || null);
  };

  return (
    <div className={styles.API}>
      <h2 className={styles.title}>Редактирование фильмов</h2>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={toggleModalHadler} data-content="create">
          Добавить фильм
        </button>
        <button className={styles.button} onClick={toggleModalHadler} data-content="edit">
          Изменить фильм
        </button>
        <button className={styles.button} onClick={toggleModalHadler} data-content="delete">
          Удалить фильм
        </button>
      </div>

      <Modal title={modalTitle} toggleModalHadler={toggleModalHadler} isModalOpen={isModalOpen}>
        {modalContent === 'create' && <CreateFilm formSubmit={formSubmit} message={message} />}
        {modalContent === 'edit' && <EditFilm formSubmit={formSubmit} formChange={formChange} message={message} />}
        {modalContent === 'delete' && <DeleteFilm formSubmit={formSubmit} message={message} />}
      </Modal>
    </div>
  );
};

export default API;
