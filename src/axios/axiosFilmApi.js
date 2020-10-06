import axios from "axios";

const filmApi = axios.create({
  baseURL: "https://film-api-backend.herokuapp.com/movies/",
});

export default filmApi;
