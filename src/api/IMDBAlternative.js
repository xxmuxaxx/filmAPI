import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
  headers: {
    'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
    'x-rapidapi-key': '421df21564mshec026f33dbed2d1p17da9djsn5014d3c84f92',
  },
});

const IMDBAlternative = {
  getFilm: (imdbID) => {
    return instance.get(`?i=${imdbID}&r=json`).then((data) => data.data);
  },
};

export default IMDBAlternative;
