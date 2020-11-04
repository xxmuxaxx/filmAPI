import React from 'react';
import filmApi from '../../../axios/axiosFilmApi';
import Input from '../../UI/Input/Input';

/*
{
  "country": "string",
  "description": "string",
  "genres": [
    {
      "name": "string"
    }
  ],
  "id": "string",
  "imdbID": "string",
  "poster": "string",
  "title": "string",
  "titleEn": "string",
  "type": "string",
  "year": 0
}
*/

const CreateFilm = () => {
  const formSubmit = (event) => {
    event.preventDefault();

    const movieItem = {
      country: event.target.country.value,
      description: event.target.description.value,
      genres: event.target.genres.value.split(',').map((genre) => ({ name: genre })),
      id: event.target.id.value,
      imdbID: event.target.imdbID.value,
      poster: event.target.poster.value,
      title: event.target.title.value,
      titleEn: event.target.titleEn.value,
      type: event.target.type.value,
      year: +event.target.year.value,
    };

    filmApi.post('create', movieItem).then((response) => console.log(response));
  };

  return (
    <div className="container" style={{ margin: '0 auto', maxWidth: '600px' }}>
      <h1>Добавить фильм</h1>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={formSubmit}>
        <Input name="country" placeholder="Страна" required />
        <Input name="description" placeholder="Описание" required />
        <Input name="genres" placeholder="Жанры (через запятую)" required />
        <Input name="id" placeholder="id (сделать автоинкремент)" required />
        <Input name="imdbID" placeholder="imdbID" required />
        <Input name="poster" placeholder="Обложка (url)" required />
        <Input name="title" placeholder="Название" required />
        <Input name="titleEn" placeholder="Название на английском" required />
        <Input name="type" placeholder="type (movie, series)" required />
        <Input name="year" placeholder="Год" required />
        <Input type="submit" />
      </form>
    </div>
  );
};

export default CreateFilm;
