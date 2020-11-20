import React from 'react';
import Pagination from 'react-js-pagination';
import {useDispatch, useSelector} from 'react-redux';

import {setPage} from '../../redux/actions/pagination';
import FilmCard from '../../components/FilmCard/FilmCard';
import Loader from '../../components/Loader/Loader';
import FilmCardPlaceholder from '../../components/FilmCard/FilmCardPlaceholder';
import classes from './FilmsContainer.module.scss';

import heroBackground from '../../img/hero-img.png';
import {fetchFilms} from '../../redux/actions/films';
import {getFilms, getTotalFilms} from "../../redux/selectors/films";

function FilmsContainer() {
    const dispatch = useDispatch();

    const films = useSelector(state => getFilms(state))
    const totalFilms = useSelector(state => getTotalFilms(state));
    const load = useSelector(({films}) => films.isLoaded);
    const {page, pageSize} = useSelector(({pagination}) => pagination);

    React.useEffect(() => {
        dispatch(fetchFilms(page, pageSize));
    }, [dispatch, page, pageSize]);

    function renderFilms() {
        return films.map((film) =>
            <FilmCard key={film.id} title={film.title} poster={film.poster} filmName={film.title}
                      filmYear={film.year}/>
        )
    }

    const handlePageClick = (pageNumber) => {
        if (pageNumber === page) return false;
        dispatch(setPage(pageNumber));
    };

    const template = (
        <div className="container">
            <Pagination
                activePage={page}
                itemsCountPerPage={pageSize}
                totalItemsCount={totalFilms}
                hideNavigation={true}
                onChange={handlePageClick.bind(this)}
            />
            <div className={classes.FilmLibWrapper}>{renderFilms()}</div>
            <Pagination
                activePage={page}
                itemsCountPerPage={pageSize}
                totalItemsCount={totalFilms}
                hideNavigation={true}
                onChange={handlePageClick.bind(this)}
            />
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
            <section className="hero">
                <div className="container">
                    <div className="hero__wrapper">
                        <div className="hero__image-wrapper">
                            <img className="hero__image" src={heroBackground} alt="Стетхем"/>
                        </div>
                        <div className="hero__text-wrapper">
                            <p className="hero__text">Лучше иметь друга,</p>
                            <p className="hero__big-text">
                                чем <b>ДРУГ ДРУГА</b>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {load ? template : loadingTemplate}
        </div>
    );
}

export default FilmsContainer;
