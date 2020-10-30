import axios from "axios";

// const maxResults = "5";
// const key = "AIzaSyDW-Vh6IQeAmmSfszFyWZ3kobYjrUXUM7w";

const youTubeApi = axios.create({
  baseURL: `https://youtube.googleapis.com/youtube/v3/`,
});

export default youTubeApi;

//GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]
