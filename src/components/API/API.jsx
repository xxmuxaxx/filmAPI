import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';

import withModal from '../../hoc/withModal/withModal';
import CreateFilm from '../../forms/CreateFilm/CreateFilm';
import EditFilm from '../../forms/EditFilm/EditFilm';
import DeleteFilm from '../../forms/DeleteFilm/DeleteFilm';

const ButtonWrapper = (props) => (
  <Box component="span" m={1}>
    <Button size="large" variant="outlined" {...props} />
  </Box>
);

const API = ({ createModal }) => {
  const createFilmsHandler = () =>
    createModal(<CreateFilm />, 'Добавить фильм');
  const editFilmHandler = () => createModal(<EditFilm />, 'Изменить фильм');
  const deleteFilmHandler = () => createModal(<DeleteFilm />, 'Удалить фильм');

  return (
    <div>
      <h2>Редактирование фильмов</h2>
      <div>
        <ButtonWrapper startIcon={<SaveIcon />} onClick={createFilmsHandler}>
          Добавить фильм
        </ButtonWrapper>
        <ButtonWrapper
          color="primary"
          startIcon={<CloudUploadIcon />}
          onClick={editFilmHandler}
        >
          Изменить фильм
        </ButtonWrapper>
        <ButtonWrapper
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={deleteFilmHandler}
        >
          Удалить фильм
        </ButtonWrapper>
      </div>
    </div>
  );
};

export default withModal(API);
