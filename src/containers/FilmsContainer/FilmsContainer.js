import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Films from "../../components/Films/Films";
import FilmCardPlaceholder from '../../components/FilmCard/FilmCardPlaceholder';
import Hero from "../../components/Hero/Hero";
import Loader from '../../components/Loader/Loader';
import withModal from "../../hoc/withModal/withModal";
import PaginationComponent from "../../components/Common/Pagination/Pagination";
import EditFilm from "../../forms/EditFilm/EditFilm";
import DeleteFilm from "../../forms/DeleteFilm/DeleteFilm";

import {setPage} from '../../redux/actions/pagination';
import {fetchFilms} from '../../redux/actions/films';
import {getFilms, getTotalFilms} from "../../redux/selectors/films";
import {getUser} from "../../redux/selectors/users";

import classes from './FilmsContainer.module.scss';

const renderFilmCardPlaceholders = (count) => {
    const result = []
    for (let i = 0; i < count; i++) {
        result.push(<FilmCardPlaceholder/>)
    }
    return result
}

const FilmsContainer = React.memo(function FilmsContainer({createModal, closeModal, modalIsOpen, ...props}) {
    const dispatch = useDispatch();

    const films = useSelector(state => getFilms(state))
    const totalFilms = useSelector(state => getTotalFilms(state));
    const {page, pageSize} = useSelector(({pagination}) => pagination);
    const load = useSelector(({films}) => films.isLoaded);
    const user = useSelector(state => getUser(state))

    React.useEffect(() => {
        !modalIsOpen && dispatch(fetchFilms(page, pageSize));
    }, [modalIsOpen, dispatch, page, pageSize]);

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

    const template = (
        <div className="container">
            <PaginationComponent
                page={page}
                pageSize={pageSize}
                totalFilms={totalFilms}
                handlePageClick={handlePageClick.bind(this)}
            />
            <Films
                films={films}
                onClickDeleteButton={clickDeleteButtonHandler}
                onClickEditButton={clickEditButtonHandler}
                showButtons={user?.isAdmin}
            />
            <PaginationComponent
                page={page}
                pageSize={pageSize}
                totalFilms={totalFilms}
                handlePageClick={handlePageClick.bind(this)}
            />
        </div>
    );

    const loadingTemplate = (
        <div className="loading">
            <div className="container">
                <Loader/>
                {renderFilmCardPlaceholders(pageSize)}
            </div>
        </div>
    );

    return (
        <div className={classes.FilmsContainer}>
            <Hero>
                <p className="hero__text">Достал нож - режь,</p>
                <p className="hero__big-text">достал <b>бутерброд</b> - ешь</p>
            </Hero>
            {load ? template : loadingTemplate}
        </div>
    );
})

export default withModal(FilmsContainer);
