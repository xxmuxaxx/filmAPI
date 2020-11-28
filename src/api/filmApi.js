import axios from 'axios';
import {getCookie} from "../utils/functions";

const token = getCookie('token')

const instance = axios.create({
    baseURL: 'https://film-api-backend.herokuapp.com/api/v1/movies/',
    headers: {
        Authorization: token && `Bearer ${token}`,
    },
});

const filmApi = {
    getAllFilms: async () => {
        const response = await instance.get('')

        return response.data
    },

    getFilmById: async (id) => {
        const response = await instance.get(`${id}`)

        return response.data.search[0];
    },

    getFilmsPage: async (page, size) => {
        const response = await instance.get(`pageable?pageNum=${page}&pageSize=${size}`)

        return response.data
    },

    searchFilmsByTitle: async (title) => {
        const response = await instance.get(`title=${title}`)

        return response.data.search
    },

    searchFilmsPageable: async (title, size, page = 1) => {
        const response = await instance.get(`pageable/pageNum=${page}&pageSize=${size}&title=${title}`)

        return response.data.search
    },

    createFilm: (movieItem) => {
        return instance.post('', movieItem)
    },

    deleteFilm: (id) => {
        return instance.delete(`${id}`)
    },

    updateFilm: (id, movieItem) => {
        return instance.put(`${id}`, movieItem)
    }
};

export default filmApi;
