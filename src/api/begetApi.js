import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://w91691o1.beget.tech/api/v1/',
});

const begetApi = {
  getUser: async (login, password) => {
    return await instance.get(`users/?u=${login}&p=${password}`).then((response) => {
      switch (response.data.status) {
        case 0:
          return alert(response.data.message);
        case 1:
          return response.data;
        default:
          break;
      }
    });
  },

  setUserAvatar: async (data) => {
    return await instance.post('users/', data).then((response) => response.data.url);
  },
};

export default begetApi;
