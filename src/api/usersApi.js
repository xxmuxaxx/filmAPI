import axios from 'axios';
import {getCookie} from "../utils/functions";

const token = getCookie('token')

const instance = axios.create({
    baseURL: 'https://film-api-backend.herokuapp.com/api/v1/users/',
    headers: {
        Authorization: token && `Bearer ${token}`,
    },
});

const usersApi = {
    getCurrentUser: (token) => {
        return instance.get('/current', {headers: {'Authorization': `Bearer ${token}`}})
    },

    registerUser: (data) => {
        return instance.post('register', data)
    },

    updateUser: async ({id, ...data}) => {
        await instance.put(`${id}`, data)

        return data
    }
};

export default usersApi;
