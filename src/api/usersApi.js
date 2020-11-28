import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://film-api-backend.herokuapp.com/api/v1/users/',
});

const usersApi = {
    getCurrentUser: (token) => {
        return  instance.get('/current', {headers: {'Authorization': `Bearer ${token}`}})
    }
};

export default usersApi;
