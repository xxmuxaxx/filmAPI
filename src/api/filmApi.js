import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://film-api-backend.herokuapp.com/movies/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

const filmApi = {
    instance: instance,
    getFilmsPage: async (page, size) => {
        return await instance.get(`/page=${page}/size=${size}`).then((res) => res.data);
    },

    searchFilms: async title => {
        return await instance.get(`/find?title=${title}`).then((res) => res.data.search);
    },

    searchFilmsPageable: async (title, size, page = 1) => {
        return await instance.get(`/page=${page}/size=${size}//find?title=${title}`)
            .then((res) => res.data.search);
    },
};

export default filmApi;
