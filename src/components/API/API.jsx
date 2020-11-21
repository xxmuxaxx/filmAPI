import React from 'react';

import {DataGrid} from '@material-ui/data-grid';
import {useSelector} from 'react-redux';

import withModal from "../../hoc/withModal/withModal";
import CreateFilm from "../../forms/CreateFilm/CreateFilm";
import EditFilm from "../../forms/EditFilm/EditFilm";
import DeleteFilm from "../../forms/DeleteFilm/DeleteFilm";

import styles from './API.module.css';

const API = (props) => {
    const films = useSelector((store) => store.films.items);

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
                <button className={styles.button} onClick={() => props.createModal(<CreateFilm/>, 'Добавить фильм')}>
                    Добавить фильм
                </button>
                <button className={styles.button} onClick={() => props.createModal(<EditFilm/>, 'Изменить фильм')}>
                    Изменить фильм
                </button>
                <button className={styles.button} onClick={() => props.createModal(<DeleteFilm/>, 'Удалить фильм')}>
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
        </div>
    );
};

export default withModal(API);
