import React, { useState, useEffect } from "react";
import classes from "./FilmLib.module.css";
import FilmCard from "../../components/FilmCard/FilmCard";
import Loader from "../../components/Loader/Loader";
import Pagination from "react-js-pagination";

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
        const url = "https://salty-lowlands-03006.herokuapp.com/movies";
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

  return <div className={classes.FilmLib}>{load ? template : <Loader />}</div>;
}
