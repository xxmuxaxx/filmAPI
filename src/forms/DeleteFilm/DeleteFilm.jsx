import React, {useEffect, useState} from 'react';
import {blur, Field, reduxForm, reset} from "redux-form";
import {useDispatch} from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import {TextField} from '@jcoreio/redux-form-material-ui'

import filmApi from "../../api/filmApi";
import styles from './DeleteFilm.module.scss';

const Input = (props) => <Field className={styles.input} variant="outlined" component={TextField} {...props} />

let DeleteFilmForm = ({message, errorMessage, handleSubmit, initialId = null}) => {
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input name="id" label="ID" style={{'display': initialId ? 'none': ''}} required/>

            {message && <p className={styles.message}>{message}</p>}
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

            <Button type="submit" size="large" color="primary" variant="contained" startIcon={<DeleteIcon/>}>
                Удалить
            </Button>
        </form>
    )
};

DeleteFilmForm = reduxForm({form: 'deleteFilm'})(DeleteFilmForm)

const DeleteFilm = ({initialId = null, callback = null}) => {
    const dispatch = useDispatch()

    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        dispatch(blur('deleteFilm', 'id', initialId))
    }, [dispatch, initialId])

    const onSubmit = ({id}) => {
        filmApi.deleteFilm(id)
            .then(() => setMessage('Фильм удален'))
            .then(() => callback && setTimeout(() => callback.call(), 4000))
            .catch(() => setErrorMessage('Ошибка при удалении фильма'))

        dispatch(reset('deleteFilm'))
    }

    return <DeleteFilmForm onSubmit={onSubmit} initialId={initialId} message={message} errorMessage={errorMessage} />
};

export default DeleteFilm;
