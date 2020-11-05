import React from 'react';

import Input from '../../UI/Input/Input';
import styles from './CreateFilm.module.css';

const CreateFilm = (props) => {
    return (
        <form className={styles.form} onSubmit={props.formSubmit} name="create">
            {props.message && <p className={styles.message}>{props.message}</p>}
            <Input name="imdbID" placeholder="imdbID" required/>
            <Input name="title" placeholder="Название" required/>
            <Input name="description" placeholder="Описание" required/>
            <Input type="submit"/>
        </form>
    )
};

export default CreateFilm;
