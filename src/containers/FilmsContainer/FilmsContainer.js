import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Films from '../../components/Films/Films';
import FilmCardPlaceholder from '../../components/FilmCard/FilmCardPlaceholder';
import Loader from '../../components/Loader/Loader';
import withModal from '../../hoc/withModal/withModal';
import PaginationComponent from '../../components/shared/Pagination/Pagination';
import EditFilm from '../../forms/EditFilm/EditFilm';
import DeleteFilm from '../../forms/DeleteFilm/DeleteFilm';

import { setPage, setPageSize } from '../../redux/actions/pagination';
import { fetchFilms } from '../../redux/actions/films';
import { getFilms, getTotalFilms } from '../../redux/selectors/films';
import { selectCurrentUserIsAdmin } from '../../redux/selectors/users';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import classes from './FilmsContainer.module.scss';

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

const FilmsContainer = React.memo(
  ({ createModal, closeModal, modalIsOpen }) => {
    const dispatch = useDispatch();

    const films = useSelector((state) => getFilms(state));
    const totalFilms = useSelector((state) => getTotalFilms(state));
    const { page, pageSize } = useSelector(({ pagination }) => pagination);
    const loaded = useSelector(({ films }) => films.isLoaded);
    const isAdmin = useSelector(selectCurrentUserIsAdmin);

    const [age, setAge] = React.useState(pageSize);

    React.useEffect(() => {
      !modalIsOpen && dispatch(fetchFilms(page, pageSize));
    }, [modalIsOpen, dispatch, page, pageSize]);

    const closeModalHandler = () => closeModal();

    const clickEditButtonHandler = (id, title) => {
      createModal(
        <EditFilm
          initialId={id}
          delayDebounce={0}
          callback={closeModalHandler}
        />,
        `Изменить фильм: ${title}`
      );
    };

    const clickDeleteButtonHandler = (id, title) => {
      createModal(
        <DeleteFilm initialId={id} callback={closeModalHandler} />,
        `Удалить фильм: ${title}`
      );
    };

    const handlePageClick = (pageNumber) => {
      if (pageNumber === page) return false;
      dispatch(setPage(pageNumber));
    };

    const changePageSizeSelectHandler = (event) => {
      dispatch(setPageSize(event.target.value));
      setAge(event.target.value);
    };

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
      </div>
    );
  }
);

export default withModal(FilmsContainer);
