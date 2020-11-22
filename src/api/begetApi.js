import axios from 'axios';

const instance = axios.create({baseURL: 'http://w91691o1.beget.tech/api/v1/'});

const begetApi = {
    getUser: async (login, password) => {
        return await instance.get(`users/?u=${login}&p=${password}`).then((res) => res.data);
    },
    setUserAvatar: async (data) => {
        return await instance.post('users/', data).then((response) => response.data.url);
    },
};

export default begetApi;
