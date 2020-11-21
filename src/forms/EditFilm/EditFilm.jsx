import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useDebouncedEffect} from "../../utils/useDebouncedEffect";

import filmApi from "../../api/filmApi";
import {Field, reduxForm, getFormValues,  stopSubmit, blur, reset} from "redux-form";
import {Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import {TextField} from '@jcoreio/redux-form-material-ui'
import styles from './EditFilm.module.css';

const Input = (props) => <Field className={styles.input} variant="outlined" component={TextField} {...props} />

const validate = values => {
    const errors = {}

    if (!values.id) {
        errors.id = 'Обязательное поле';
        errors._error = 'ID - Обязательное поле';
    }

    return errors
}

let EditFilmForm = ({message, error, handleSubmit, pristine, submitting, initialId = null}) => {
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input name="id" label="ID" style={{'display': initialId ? 'none': ''}}/>
            <Input name="imdbID" label="imdbID" disabled={!!error}/>
            <Input name="title" label="Название" disabled={!!error}/>
            <Input name="titleEn" label="Название на английском" disabled={!!error}/>
            <Input name="year" label="Год" disabled={!!error}/>
            <Input name="country" label="Страна" disabled={!!error}/>
            <Input name="poster" label="Обложка (url)" disabled={!!error}/>
            <Input name="video" label="Трейлер (youtube id)" disabled={!!error}/>
            <Input name="genres" label="Жанры (через запятую)" disabled={!!error}/>
            <Input name="type" label="Тип (movie, series)" disabled={!!error}/>
            <Input name="description" label="Описание" disabled={!!error} rows={5} multiline/>

            {message && <p className={styles.message}>{message}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
            <Button type="submit" size="large" color="primary" variant="contained" startIcon={<SaveIcon/>}
                    disabled={!!error}>
                Сохранить
            </Button>
        </form>
    );
};

EditFilmForm = reduxForm({form: 'editFilm', validate})(EditFilmForm)

const fields = ['imdbID', 'title', 'titleEn', 'year', 'country', 'poster', 'video', 'type', 'description']

const EditFilm = ({initialId = null, delayDebounce = 1000, callback = null}) => {
    const dispatch = useDispatch()
    const values = useSelector(getFormValues('editFilm'));
    const [message, setMessage] = useState(null)

    useEffect(() => {
        dispatch(blur('editFilm', 'id', initialId))
    }, [dispatch, initialId])

    useEffect(() => {
        message && setTimeout(() => setMessage(null), 5000)

    }, [message])

    useDebouncedEffect(async () => {
        const data = values?.id && await filmApi.getFilmById(values.id)

        if (data) {
            dispatch(blur('editFilm', 'genres', [...data.genres.map((item) => item.name)].join(', ')))
            fields.forEach(field => dispatch(blur('editFilm', `${field}`, data[field])))
        } else {
            dispatch(blur('editFilm', 'genres', ''))
            fields.forEach(field => dispatch(blur('editFilm', `${field}`, '')))
        }
    }, delayDebounce, [values?.id])

    const onSubmit = (formData) => {
        const data = {...formData}
        data.genres = data?.genres ? data.genres.split(',').map((genre) => ({name: genre})) : []
        data.year = Number(data.year)

        filmApi.updateFilm(data.id, data)
            .then(() => setMessage('Изменения сохранены'))
            .then(() => callback && callback.call())
            .catch(() => dispatch(stopSubmit('editFilm', {_error: 'Ошибка при изменении фильма'})))
    }

    return <EditFilmForm onSubmit={onSubmit} initialId={initialId} message={message}/>
}

export default EditFilm;
