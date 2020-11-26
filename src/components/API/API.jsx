import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table} from 'antd';

import withModal from "../../hoc/withModal/withModal";
import CreateFilm from "../../forms/CreateFilm/CreateFilm";
import EditFilm from "../../forms/EditFilm/EditFilm";
import DeleteFilm from "../../forms/DeleteFilm/DeleteFilm";

import 'antd/dist/antd.css';
import styles from './API.module.css';
import {fetchAllFilms} from "../../redux/actions/films";

const API = (props) => {
    const dispatch = useDispatch()
    const films = useSelector((store) => store.films.items);

    useEffect(() => dispatch(fetchAllFilms()), [])

    let expandedRowRender = (record) => <>
        <p><b style={{fontWeight: 600}}>poster:</b> ${record.poster}</p>
        <p><b style={{fontWeight: 600}}>description</b>: ${record.description}</p>
    </>

    let columns = films.length && Object.keys(films[0])
        .map(film => ({
            title: String(film),
            dataIndex: String(film),
            key: String(film),
            sorter: (film === 'id')
                ? (a, b) => b.id - a.id
                : (film === 'title')
                ? (a, b) => a.title.localeCompare(b.title)
                : null,
        }))
        .filter(item => item.title !== 'poster')
        .filter(item => item.title !== 'description')

    console.log(columns)

    const dataSource = columns && films.length && films.map(film => ({
        ...film,
        genres: film.genres.map((item) => item.name).join(', '),
        key: film.id
    }))

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
                    <Table dataSource={dataSource} columns={columns} size={'small'} expandable={{expandedRowRender}}/>
                </div>
            </div>
        </div>
    );
};

export default withModal(API);
