import React from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";

import classes from "./FilmLib.module.css";
import FilmCard from "../../components/FilmCard/FilmCard";
import Loader from "../../components/Loader/Loader";

import heroBackground from "../../img/hero-img.png";
import FilmCardPlaceholder from "../../components/FilmCard/FilmCardPlaceholder";
import { setPage } from "../../redux/actions/pagination";

function FilmLib() {
  const dispatch = useDispatch();
  const films = useSelector(({ films }) => films.items);
  const totalFilms = useSelector(({ films }) => films.totalItems);
  const load = useSelector(({ films }) => films.isLoaded);
  const pagination = useSelector(({ pagination }) => pagination);

  function renderFilms() {
    return films.map((film) => {
      return (
        <FilmCard
          key={film.id}
          title={film.title}
          poster={film.poster}
          filmName={film.title}
          filmYear={film.year}
        />
      );
    });
  }

  const handlePageClick = (pageNumber) => {
    if (pageNumber === pagination.page) return false;
    dispatch(setPage(pageNumber));
  };

  const template = (
    <div className="container">
      <div className={classes.FilmLibWrapper}>{renderFilms()}</div>
      <Pagination
        activePage={pagination.page}
        itemsCountPerPage={pagination.pageSize}
        totalItemsCount={totalFilms}
        hideFirstLastPages={true}
        hideNavigation={true}
        onChange={handlePageClick.bind(this)}
      />
    </div>
  );

  const loadingTemplate = (
    <div className="loading">
      <div className="container">
        <Loader />
        <FilmCardPlaceholder />
        <FilmCardPlaceholder />
        <FilmCardPlaceholder />
        <FilmCardPlaceholder />
        <FilmCardPlaceholder />
        <FilmCardPlaceholder />
        <FilmCardPlaceholder />
        <FilmCardPlaceholder />
      </div>
    </div>
  );

  return (
    <div className={classes.FilmLib}>
      <section className="hero">
        <div className="container">
          <div className="hero__wrapper">
            <div className="hero__image-wrapper">
              <img className="hero__image" src={heroBackground} alt="Стетхем" />
            </div>
            <div className="hero__text-wrapper">
              <p className="hero__text">Пора начать смотреть</p>
              <p className="hero__big-text">
                <b>МУЖИЦКИЕ</b> ФИЛЬМЫ
              </p>
            </div>
          </div>
        </div>
      </section>
      {load ? template : loadingTemplate}
    </div>
  );
}

export default FilmLib;
