import React from 'react';

import Input from '../../UI/Input/Input';
import styles from './DeleteFilm.module.css';

const DeleteFilm = (props) => {
  return (
    <form className={styles.form} onSubmit={props.formSubmit} name="delete">
      {props.message && <p className={styles.message}>{props.message}</p>}
      <Input name="id" placeholder="id" required />
      <Input type="submit" />
    </form>
  );
};

export default DeleteFilm;
