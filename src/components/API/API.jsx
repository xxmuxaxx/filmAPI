import React from 'react';

import IMDBAlternative from '../../api/IMDBAlternative';
import filmApi from '../../api/filmApi';

import {DataGrid} from '@material-ui/data-grid';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFilms} from '../../redux/actions/films';

import Modal from '../Modal/Modal';
import withModal from "../../hoc/withModal/withModal";
import CreateFilm from './CreateFilm/CreateFilm';
import EditFilm from "../../forms/EditFilm/EditFilm";
import DeleteFilm from "../../forms/DeleteFilm/DeleteFilm";

import styles from './API.module.css';

const API = (props) => {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState(null);
    const [modalContent, setModalContent] = React.useState(null);
    const [message, setMessage] = React.useState(null);

    const films = useSelector((store) => store.films.items);

    React.useEffect(() => {
        !isModalOpen && setMessage(null);

        dispatch(fetchFilms(1, 50));
    }, [dispatch, isModalOpen]);

    const formSubmit = (event) => {
        event.preventDefault();

        const target = event.target;

        let movieItem = {};

        switch (target.name) {
            case 'create':
                IMDBAlternative.getFilm(target.imdbID.value).then((data) => {
                    movieItem = {
                        imdbID: target.imdbID.value,
                        title: target.title.value,
                        description: target.description.value,
                        country: data.Country,
                        genres: data.Genre.split(',').map((genre) => ({name: genre})),
                        poster: data.Poster,
                        titleEn: data.Title,
                        type: data.Type,
                        video: target.video.value,
                        year: +data.Year,
                    };

                    filmApi.instance.post('create', movieItem).then(() => setMessage('Успешно'));
                    return target.reset();
                });
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

    let columns, rows;

    if (films.length) {
        columns = Object.keys(films[0]).map((film) => ({field: String(film), width: 200}));

        columns[0].width = 60;
        columns[3].width = 100;
        columns[4].width = 100;
        columns[5].width = 100;
        columns[6].width = 300;
        columns[7].width = 400;
        columns[10] = {};

        rows = [...films];
    }

    return (
        <div className={styles.API}>
            <h2 className={styles.title}>Редактирование фильмов</h2>
            <div className={styles.wrapper}>
                <button className={styles.button} onClick={toggleModalHadler} data-content="create">
                    Добавить фильм
                </button>
                <button className={styles.button} onClick={() => props.createModal(<EditFilm />, 'Изменить фильм')}>
                    Изменить фильм
                </button>
                <button className={styles.button} onClick={() => props.createModal(<DeleteFilm />, 'Удалить фильм')}>
                    Удалить фильм
                </button>
            </div>
            <div className={styles.filmsWrapper}>
                <h2 className={styles.title}>Список фильмов</h2>
                <div className={styles.films}>
                    <div style={{height: 800, width: '100%'}}>
                        {films.length && <DataGrid rows={rows} columns={columns} rowHeight={25} checkboxSelection/>}
                    </div>
                </div>
            </div>

            <Modal title={modalTitle} toggleModalHadler={toggleModalHadler} isModalOpen={isModalOpen}>
                {modalContent === 'create' && <CreateFilm formSubmit={formSubmit} message={message}/>}
            </Modal>
        </div>
    );
};

export default withModal(API);
