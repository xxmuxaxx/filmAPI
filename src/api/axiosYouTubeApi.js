import axios from "axios";

const youTubeApi = axios.create({
  baseURL: `https://youtube.googleapis.com/youtube/v3/`,
});

export default youTubeApi;
