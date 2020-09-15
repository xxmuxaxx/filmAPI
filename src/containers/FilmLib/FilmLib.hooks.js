import React, { useState, useEffect } from "react";
import classes from "./FilmLib.module.css";
import FilmCard from "../../components/FilmCard/FilmCard";

export default function FilmLib() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://salty-lowlands-03006.herokuapp.com/movies"
        );
        const json = await response.json();

        setFilms([...json.search]);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  function renderFilms() {
    return films.map((film) => {
      return (
        <FilmCard
          key={film.id}
          id={film.id}
          poster={film.poster}
          filmName={film.title}
          filmYear={film.year}
        />
      );
    });
  }

  return (
    <div className={classes.FilmLib}>
      <div className={classes.FilmLibWrapper}>{renderFilms()}</div>
    </div>
  );
}
