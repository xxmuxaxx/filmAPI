import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://film-api-backend.herokuapp.com/api/v1/auth/',
});

const authApi = {
    login: (data) => {
        return instance.post('login', data)
    }
};

export default authApi;
