import { Modal, Pagination } from 'antd';
import Loader from 'core/components/loader/Loader';
import { useActions } from 'core/hooks/useActions';
import DeleteMovieForm from 'core/modules/movie/components/deleteMovieForm/DeleteMovieForm';
import EditMovieForm from 'core/modules/movie/components/editMovieForm/EditMovieForm';
import { selectMovieState } from 'core/modules/movie/selectors/movieSelectors';
import { selectCurrentUserIsAdmin } from 'core/modules/users/selectors/usersSelectors';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Hero from '../../core/components/hero/Hero';
import FilmCardPlaceholder from './components/movieCard/FilmCardPlaceholder';
import MoviesList from './components/moviesList/MoviesList';
import classes from './moviesPage.module.scss';

const renderFilmCardPlaceholders = (count: any) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(<FilmCardPlaceholder key={i} />);
  }
  return result;
};

const MoviesPage: FC<any> = () => {
  const { setPage, setPageSize, fetchMovies } = useActions();
  const { page, pageSize, items, totalItems, isLoaded } =
    useSelector(selectMovieState);
  const isAdmin = useSelector(selectCurrentUserIsAdmin);
  // Todo Завести отдельный стейт для модалок
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalInitialId, setModalInitialId] = useState(0);

  const clickEditButtonHandler = (id: any, title: any) => {
    setModalInitialId(id);
    setModalTitle(`Изменить фильм: ${title}`);
    setModalType('film-edit');
    setIsModalVisible(true);
  };

  const clickDeleteButtonHandler = (id: any, title: any) => {
    setModalInitialId(id);
    setModalTitle(`Удалить фильм: ${title}`);
    setModalType('film-delete');
    setIsModalVisible(true);
  };

  const handlePageClick = (pageNumber: any) => {
    if (pageNumber === page) return false;
    setPage(pageNumber);
  };

  const onPageSizeChange = (value: any) => {
    setPageSize(value);
  };

  const onSubmit = useCallback(() => {
    setIsModalVisible(false);
    fetchMovies(page, pageSize);
  }, [page, pageSize]);

  useEffect(() => {
    fetchMovies(page, pageSize);
  }, [page, pageSize]);

  return (
    <>
      <Hero />
      <div className={classes.container}>
        <div className="container">
          {isLoaded ? (
            <>
              <MoviesList
                films={items}
                onClickDeleteButton={clickDeleteButtonHandler}
                onClickEditButton={clickEditButtonHandler}
                showButtons={isAdmin}
              />

              <div className={classes.bottom}>
                <Pagination
                  current={page}
                  total={totalItems}
                  pageSize={pageSize}
                  pageSizeOptions={[12, 24] as any}
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
            <EditMovieForm
              initialId={modalInitialId as any}
              onSubmit={onSubmit}
            />
          )}
          {modalType === 'film-delete' && (
            <DeleteMovieForm
              initialId={modalInitialId as any}
              onSubmit={onSubmit}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default MoviesPage;
