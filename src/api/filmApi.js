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
    getFilmById: async (id) => {
        return await instance.get(`/find/{id}?id=${id}`).then((res) => res.data.search[0]);
    },
    getFilmsPage: async (page, size) => {
        return await instance.get(`/page=${page}/size=${size}`).then((res) => res.data);
    },
    searchFilms: async title => {
        return await instance.get(`/find?title=${title}`).then((res) => res.data.search);
    },
    searchFilmsPageable: async (title, size, page = 1) => {
        return await instance.get(`/page=${page}/size=${size}/find?title=${title}`)
            .then((res) => res.data.search);
    },
    updateFilm: (id, movieItem) => {
        return instance.put(`/update/${id}`, movieItem)
    },
    deleteFilm: (id) => {
        return instance.delete(`delete/${id}`)
    }
};

export default filmApi;
