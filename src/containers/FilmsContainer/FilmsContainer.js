import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Films from '../../components/Films/Films';
import FilmCardPlaceholder from '../../components/FilmCard/FilmCardPlaceholder';
import Loader from '../../components/Loader/Loader';
import { EditFilm, DeleteFilm } from '../../components/Forms/';
import { setPage, setPageSize } from '../../redux/actions/pagination';
import { fetchFilms } from '../../redux/actions/films';
import { getFilms, getTotalFilms } from '../../redux/selectors/films';
import { selectCurrentUserIsAdmin } from '../../redux/selectors/users';
import classes from './FilmsContainer.module.scss';
import { Modal, Pagination } from 'antd';

const renderFilmCardPlaceholders = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(<FilmCardPlaceholder key={i} />);
  }
  return result;
};

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

  const onPageSizeChange = (value) => {
    dispatch(setPageSize(value));
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
              <Pagination
                current={page}
                total={totalFilms}
                pageSize={pageSize}
                pageSizeOptions={[12, 24]}
                onShowSizeChange={(_, number) => onPageSizeChange(number)}
                onChange={handlePageClick}
              />
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
