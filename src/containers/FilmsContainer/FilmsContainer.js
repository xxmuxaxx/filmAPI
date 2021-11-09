import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Films from '../../components/Films/Films';
import FilmCardPlaceholder from '../../components/FilmCard/FilmCardPlaceholder';
import Loader from '../../components/Loader/Loader';
import PaginationComponent from '../../components/shared/Pagination/Pagination';
import { EditFilm, DeleteFilm } from '../../components/Forms/';
import { setPage, setPageSize } from '../../redux/actions/pagination';
import { fetchFilms } from '../../redux/actions/films';
import { getFilms, getTotalFilms } from '../../redux/selectors/films';
import { selectCurrentUserIsAdmin } from '../../redux/selectors/users';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classes from './FilmsContainer.module.scss';
import { Modal } from 'antd';

const renderFilmCardPlaceholders = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(<FilmCardPlaceholder key={i} />);
  }
  return result;
};

const pagination = (page, pageSize, totalFilms, handlePageClick) => (
  <PaginationComponent
    page={page}
    pageSize={pageSize}
    totalFilms={totalFilms}
    handlePageClick={handlePageClick}
  />
);

export const FilmsContainer = React.memo(() => {
  const dispatch = useDispatch();
  const films = useSelector((state) => getFilms(state));
  const totalFilms = useSelector((state) => getTotalFilms(state));
  const { page, pageSize } = useSelector(({ pagination }) => pagination);
  const loaded = useSelector(({ films }) => films.isLoaded);
  const isAdmin = useSelector(selectCurrentUserIsAdmin);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalInitialId, setModalInitialId] = useState(0);
  const [age, setAge] = useState(pageSize);

  const clickEditButtonHandler = (id, title) => {
    setModalInitialId(id);
    setModalTitle(`Изменить фильм: ${title}`);
    setModalType('film-edit');
    setIsModalVisible(true);
  };

  const clickDeleteButtonHandler = (id, title) => {
    setModalInitialId(id);
    setModalTitle(`Удалить фильм: ${title}`);
    setModalType('film-delete');
    setIsModalVisible(true);
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber === page) return false;
    dispatch(setPage(pageNumber));
  };

  const changePageSizeSelectHandler = (event) => {
    dispatch(setPageSize(event.target.value));
    setAge(event.target.value);
  };

  const onSubmit = useCallback(() => {
    setIsModalVisible(false);
    dispatch(fetchFilms(page, pageSize));
  }, [page, pageSize]);

  useEffect(() => {
    dispatch(fetchFilms(page, pageSize));
  }, [page, pageSize]);

  return (
    <div className={classes.container}>
      <div className="container">
        {loaded ? (
          <>
            <Films
              films={films}
              onClickDeleteButton={clickDeleteButtonHandler}
              onClickEditButton={clickEditButtonHandler}
              showButtons={isAdmin}
            />

            <div className={classes.bottom}>
              {pagination(page, pageSize, totalFilms, handlePageClick)}

              <FormControl variant="outlined" className={classes.control}>
                <InputLabel id="pageLengthLabel">Выводить по:</InputLabel>
                <Select
                  labelId="pageLengthLabel"
                  label="Выводить по:"
                  onChange={changePageSizeSelectHandler}
                  value={age}
                >
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                  <MenuItem value={48}>48</MenuItem>
                </Select>
              </FormControl>
            </div>
          </>
        ) : (
          <>
            <Loader />
            {renderFilmCardPlaceholders(pageSize)}
          </>
        )}
      </div>
      <Modal
        title={modalTitle}
        footer={false}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        centered
      >
        {modalType === 'film-edit' && (
          <EditFilm initialId={modalInitialId} onSubmit={onSubmit} />
        )}
        {modalType === 'film-delete' && (
          <DeleteFilm initialId={modalInitialId} onSubmit={onSubmit} />
        )}
      </Modal>
    </div>
  );
});
