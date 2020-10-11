import axios from "axios";

const host = "movie-database-imdb-alternative.p.rapidapi.com";
const key = "421df21564mshec026f33dbed2d1p17da9djsn5014d3c84f92";

const IMDBAlternative = axios.create({
  baseURL: "https://movie-database-imdb-alternative.p.rapidapi.com/",
  headers: { "x-rapidapi-host": host, "x-rapidapi-key": key },
});

export default IMDBAlternative;
