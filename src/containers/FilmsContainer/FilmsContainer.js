import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Films from "../../components/Films/Films";
import FilmCardPlaceholder from '../../components/FilmCard/FilmCardPlaceholder';
import Loader from '../../components/Loader/Loader';
import withModal from "../../hoc/withModal/withModal";
import PaginationComponent from "../../components/Common/Pagination/Pagination";
import EditFilm from "../../forms/EditFilm/EditFilm";
import DeleteFilm from "../../forms/DeleteFilm/DeleteFilm";

import {setPage} from '../../redux/actions/pagination';
import {fetchFilms} from '../../redux/actions/films';
import {getFilms, getTotalFilms} from "../../redux/selectors/films";
import {getUser} from "../../redux/selectors/users";

import classes from './FilmsContainer.module.scss';

const renderFilmCardPlaceholders = (count) => {
    const result = []
    for (let i = 0; i < count; i++) {
        result.push(<FilmCardPlaceholder key={i} />)
    }
    return result
}

const FilmsContainer = React.memo(function FilmsContainer({createModal, closeModal, modalIsOpen}) {
    const dispatch = useDispatch();

    const films = useSelector(state => getFilms(state))
    const totalFilms = useSelector(state => getTotalFilms(state));
    const {page, pageSize} = useSelector(({pagination}) => pagination);
    const loaded = useSelector(({films}) => films.isLoaded);
    const user = useSelector(state => getUser(state))
    const isAdmin = user?.rolePermissions.includes('USER_ADMIN')

    React.useEffect(() => {
        !modalIsOpen && dispatch(fetchFilms(page, pageSize));
    }, [modalIsOpen, dispatch, page, pageSize]);

    const closeModalHandler = () => closeModal()

    const clickEditButtonHandler = (id, title) => {
        createModal(<EditFilm initialId={id} delayDebounce={0} callback={closeModalHandler}/>, `Изменить фильм: ${title}`)
    }

    const clickDeleteButtonHandler = (id, title) => {
        createModal(<DeleteFilm initialId={id} callback={closeModalHandler}/>, `Удалить фильм: ${title}`)
    }

    const handlePageClick = (pageNumber) => {
        if (pageNumber === page) return false;
        dispatch(setPage(pageNumber));
    };

    return (
        <div className={classes.FilmsContainer}>
            <div className="container">
                {
                    loaded
                        ?
                        <>
                            <PaginationComponent
                                page={page}
                                pageSize={pageSize}
                                totalFilms={totalFilms}
                                handlePageClick={handlePageClick.bind(this)}
                            />
                            <Films
                                films={films}
                                onClickDeleteButton={clickDeleteButtonHandler}
                                onClickEditButton={clickEditButtonHandler}
                                showButtons={isAdmin}
                            />
                            <PaginationComponent
                                page={page}
                                pageSize={pageSize}
                                totalFilms={totalFilms}
                                handlePageClick={handlePageClick.bind(this)}
                            />
                        </>
                        :
                        <>
                            <Loader/>
                            {renderFilmCardPlaceholders(pageSize)}
                        </>
                }
            </div>
        </div>
    );
})

export default withModal(FilmsContainer);
