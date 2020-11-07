import axios from 'axios';

const begetApi = axios.create({
  baseURL: 'http://w91691o1.beget.tech/api/v1/',
});

export default begetApi;
