import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Plyr from 'plyr-react';

import classes from './FilmDetail.module.scss';
import Loader from '../../components/Loader/Loader';
import FilmDetailFieldItem from './FilmDetailFieldItem';
import { fetchFilmByTitle, setActiveFilm } from '../../redux/actions/films';
import IMDBAlternative from '../../axios/axiosIMDBAlternative';
import youTubeApi from '../../axios/axiosYouTubeApi';

function random(n) {
  return Math.floor(Math.random() * (Math.floor(n - 1) - 0 + 1)) + 0;
}

const YOUTUBE_API = false;

const FilmDetail = React.memo(function FilmDetail(props) {
  const dispatch = useDispatch();

  const { activeItem } = useSelector(({ films }) => films);
  const [imdb, setImdb] = React.useState({ item: [], loaded: false });
  const [youTube, setYouTube] = React.useState(null);
  const linkToImdb = `https://www.imdb.com/title/${activeItem?.imdbID}`;

  React.useEffect(() => {
    if (activeItem) {
      IMDBAlternative.get(`?i=${activeItem.imdbID}&r=json`).then(({ data }) => setImdb({ item: data, loaded: true }));

      const str = `${activeItem.title} ${activeItem.year} трейлер`;

      YOUTUBE_API &&
        youTubeApi
          .get(`search?key=AIzaSyDW-Vh6IQeAmmSfszFyWZ3kobYjrUXUM7w&maxResults=1&q=${str}`)
          .then(({ data }) => setYouTube(data.items));
    }
  }, [activeItem]);

  React.useEffect(() => {
    dispatch(fetchFilmByTitle(props.match.params.title));

    return () => dispatch(setActiveFilm(null));
  }, [dispatch, props.match.params.title]);

  const renderGenres = () => activeItem.genres.map((genre) => genre.name).join(', ');

  const template = () => (
    <div className="container">
      <div className={classes.FilmDetailWrapper}>
        <div className={classes.FilmDetailTop}>
          <div className={classes.FilmDetailImageWrapper}>
            <img className={classes.FilmDetailImage} src={activeItem.poster} alt={activeItem.title} />
          </div>

          <div className={classes.FilmDetailRight}>
            <h1>{activeItem.title}</h1>
            <p>{activeItem.titleEn}</p>
            <span className={classes.id}>id: {activeItem.id}</span>

            <div className={classes.FilmDetailField}>
              <FilmDetailFieldItem name="Год">{activeItem.year}</FilmDetailFieldItem>
              <FilmDetailFieldItem name="Страна">{activeItem.country}</FilmDetailFieldItem>
              <FilmDetailFieldItem name="Актеры">{imdb.loaded ? imdb.item.Actors : 'Загрузка...'}</FilmDetailFieldItem>
              <FilmDetailFieldItem name="IMDb">
                <a href={linkToImdb} target="_blank" rel="noopener noreferrer">
                  Перейти
                </a>
              </FilmDetailFieldItem>
              <FilmDetailFieldItem name="Рейтинг IMDb">
                {imdb.loaded ? imdb.item.imdbRating : 'Загрузка...'}
              </FilmDetailFieldItem>
              <FilmDetailFieldItem name="Metascore">
                {imdb.loaded ? imdb.item.Metascore : 'Загрузка...'}
              </FilmDetailFieldItem>
              <FilmDetailFieldItem name="Жанры">{activeItem && renderGenres()}</FilmDetailFieldItem>
              <FilmDetailFieldItem name="Длительность">
                {imdb.loaded ? imdb.item.Runtime : 'Загрузка...'}
              </FilmDetailFieldItem>
              <FilmDetailFieldItem name="Рейтинг">{imdb.loaded ? imdb.item.Rated : 'Загрузка...'}</FilmDetailFieldItem>
            </div>

            <Link to="/" className={classes.FilmDetailLink}>
              Назад
            </Link>
          </div>
        </div>

        <div className={classes.FilmDetailBottom}>
          <div className={classes.FilmDetailDescription}>
            <p>Описание:</p>
            <br />
            <p>{activeItem.description}</p>
          </div>
        </div>

        <div className="plyr-wrapper">
          {youTube ? (
            <Plyr
              source={{
                type: 'video',
                sources: [
                  {
                    src: youTube[random(youTube.length)].id.videoId,
                    provider: 'youtube',
                  },
                ],
              }}
            />
          ) : (
            <Plyr />
          )}
        </div>
      </div>
    </div>
  );

  return <div className={classes.FilmDetail}>{activeItem ? template() : <Loader />}</div>;
});

export default FilmDetail;
