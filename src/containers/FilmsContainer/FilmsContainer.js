import React from 'react';
import Pagination from 'react-js-pagination';
import {useDispatch, useSelector} from 'react-redux';

import FilmCard from '../../components/FilmCard/FilmCard';
import FilmCardPlaceholder from '../../components/FilmCard/FilmCardPlaceholder';
import Hero from "../../components/Hero/Hero";
import Loader from '../../components/Loader/Loader';
import withModal from "../../hoc/withModal/withModal";
import EditFilm from "../../forms/EditFilm/EditFilm";
import DeleteFilm from "../../forms/DeleteFilm/DeleteFilm";

import {setPage} from '../../redux/actions/pagination';
import {fetchFilms} from '../../redux/actions/films';
import {getFilms, getTotalFilms} from "../../redux/selectors/films";
import {getUser} from "../../redux/selectors/users";

import classes from './FilmsContainer.module.scss';

const FilmsContainer = React.memo(function FilmsContainer({createModal, closeModal, modalIsOpen, ...props}) {
    const dispatch = useDispatch();

    const films = useSelector(state => getFilms(state))
    const totalFilms = useSelector(state => getTotalFilms(state));
    const load = useSelector(({films}) => films.isLoaded);
    const {page, pageSize} = useSelector(({pagination}) => pagination);
    const user = useSelector(state => getUser(state))

    React.useEffect(() => {
        !modalIsOpen && dispatch(fetchFilms(page, pageSize));
    }, [modalIsOpen, dispatch, page, pageSize]);

    const renderFilms = () => films.map((film) =>
        <FilmCard key={film.id} title={film.title} poster={film.poster} filmName={film.title}
                  filmYear={film.year} onClickDeleteButton={() => clickDeleteButtonHandler(film.id, film.title)}
                  onClickEditButton={() => clickEditButtonHandler(film.id, film.title)} showButtons={user?.isAdmin}/>)

    const onCloseModal = () => closeModal()

    const clickEditButtonHandler = (id, title) => {
        createModal(<EditFilm initialId={id} delayDebounce={0} callback={onCloseModal}/>, `Изменить фильм: ${title}`)
    }

    const clickDeleteButtonHandler = (id, title) => {
        createModal(<DeleteFilm initialId={id} callback={onCloseModal}/>, `Удалить фильм: ${title}`)
    }

    const handlePageClick = (pageNumber) => {
        if (pageNumber === page) return false;
        dispatch(setPage(pageNumber));
    };

    const renderPagination = () => <Pagination
        activePage={page}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalFilms}
        hideNavigation={true}
        onChange={handlePageClick.bind(this)}
    />

    const template = (
        <div className="container">
            {renderPagination()}
            <div className={classes.FilmLibWrapper}>{renderFilms()}</div>
            {renderPagination()}
        </div>
    );

    const loadingTemplate = (
        <div className="loading">
            <div className="container">
                <Loader/>
                <FilmCardPlaceholder/>
                <FilmCardPlaceholder/>
                <FilmCardPlaceholder/>
                <FilmCardPlaceholder/>
                <FilmCardPlaceholder/>
                <FilmCardPlaceholder/>
                <FilmCardPlaceholder/>
                <FilmCardPlaceholder/>
            </div>
        </div>
    );

    return (
        <div className={classes.FilmsContainer}>
            <Hero>
                <p className="hero__text">Лучше иметь друга,</p>
                <p className="hero__big-text">чем <b>ДРУГ ДРУГА</b></p>
            </Hero>
            {load ? template : loadingTemplate}
        </div>
    );
})

export default withModal(FilmsContainer);
