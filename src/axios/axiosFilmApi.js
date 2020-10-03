import axios from "axios";

export default axios.create({
  baseURL: "https://film-api-backend.herokuapp.com/movies/",
});
