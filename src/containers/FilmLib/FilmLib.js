import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

import classes from "./FilmLib.module.css";
import FilmCard from "../../components/FilmCard/FilmCard";
import Loader from "../../components/Loader/Loader";

import heroBackground from "../../img/hero-img.png";

export default function FilmLib() {
  const [films, setFilms] = useState([]);
  const [load, setload] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 8,
    totalResults: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const url = "https://film-api-backend.herokuapp.com/movies";
        const response = await fetch(
          `${url}/page=${pagination.page}/size=${pagination.pageSize}`
        );
        const json = await response.json();

        setFilms([...json.search]);
        setload(true);
        setPagination((prevState) => {
          return {
            ...prevState,
            totalResults: json.totalResults,
          };
        });
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [pagination.page, pagination.pageSize]);

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

  function handlePageClick(pageNumber) {
    if (pageNumber === pagination.page) return false;
    setload(false);
    setPagination((prevState) => {
      return {
        ...prevState,
        page: pageNumber,
      };
    });
  }

  const template = (
    <div className="container">
      <div className={classes.FilmLibWrapper}>{renderFilms()}</div>
      <Pagination
        activePage={pagination.page}
        itemsCountPerPage={pagination.pageSize}
        totalItemsCount={pagination.totalResults}
        hideFirstLastPages={true}
        hideNavigation={true}
        onChange={handlePageClick.bind(this)}
      />
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

      {load ? template : <Loader />}
    </div>
  );
}
