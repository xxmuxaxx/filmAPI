import { App, Modal, Pagination, Tabs } from "antd";
import { getErrorMessage } from "core/http";
import movieApi from "core/modules/movie/api/movieApi";
import { Movie, MovieType } from "core/modules/movie/types/movieTypes";
import Loader from "core/components/loader/Loader";
import { useActions } from "core/hooks/useActions";
import DeleteMovieForm from "core/modules/movie/components/deleteMovieForm/DeleteMovieForm";
import EditMovieForm from "core/modules/movie/components/editMovieForm/EditMovieForm";
import { selectMovieState } from "core/modules/movie/selectors/movieSelectors";
import { selectCurrentUserIsAdmin } from "core/modules/users/selectors/usersSelectors";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Hero from "../../core/components/hero/Hero";
import FilmCardPlaceholder from "./components/movieCard/FilmCardPlaceholder";
import MoviesList from "./components/moviesList/MoviesList";
import classes from "./moviesPage.module.scss";

const renderFilmCardPlaceholders = (count: number) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(<FilmCardPlaceholder key={i} />);
  }
  return result;
};

const MoviesPage: FC = () => {
  const { message } = App.useApp();
  const [filter, setFilter] = useState<MovieType | "all">("all");
  const [allMovies, setAllMovies] = useState<Movie[] | null>(null);
  const [revision, setRevision] = useState(0);
  const { setPage, setPageSize, fetchMovies } = useActions();
  const { page, pageSize, items, totalItems, isLoaded } =
    useSelector(selectMovieState);
  const isAdmin = useSelector(selectCurrentUserIsAdmin);
  // Todo Завести отдельный стейт для модалок
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalInitialId, setModalInitialId] = useState(0);

  const clickEditButtonHandler = (id: number, title: string) => {
    setModalInitialId(id);
    setModalTitle(`Изменить фильм: ${title}`);
    setModalType("film-edit");
    setIsModalVisible(true);
  };

  const clickDeleteButtonHandler = (id: number, title: string) => {
    setModalInitialId(id);
    setModalTitle(`Удалить фильм: ${title}`);
    setModalType("film-delete");
    setIsModalVisible(true);
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== page) setPage(pageNumber);
  };

  const onPageSizeChange = (value: number) => {
    setPage(1);
    setPageSize(value);
  };

  const onSubmit = useCallback(() => {
    setIsModalVisible(false);
    setAllMovies(null);
    setRevision(value => value + 1);
    fetchMovies(page, pageSize);
  }, [fetchMovies, page, pageSize]);

  useEffect(() => {
    if (filter === "all") fetchMovies(page, pageSize);
  }, [fetchMovies, page, pageSize, filter]);

  useEffect(() => {
    if (filter === "all") return;
    let cancelled = false;
    movieApi.getAllMovies().then(({ search }) => {
      if (!cancelled) setAllMovies(search);
    }).catch((error: unknown) => {
      if (!cancelled) {
        setAllMovies([]);
        message.error(getErrorMessage(error));
      }
    });
    return () => { cancelled = true; };
  }, [filter, revision, message]);

  const filteredMovies = allMovies?.filter(movie => movie.type === filter) ?? [];
  const visibleItems = filter === "all" ? items : filteredMovies.slice((page - 1) * pageSize, page * pageSize);
  const visibleTotal = filter === "all" ? totalItems : filteredMovies.length;
  const loaded = filter === "all" ? isLoaded : allMovies !== null;

  return (
    <>
      <Hero>
        <p className="hero__text">Не круто пить, не круто врать</p>
        <p className="hero__big-text">А круто маме <b>помогать</b></p>
      </Hero>
      <div className={`container ${classes.container}`}>
        <div className={classes.catalog}>
          {!(loaded && visibleItems.length === 0 && filter === "all") && (
            <>
              <div className={classes.heading}>
                <h1>Фильмы</h1>
                <p>Ваша коллекция хорошего кино</p>
              </div>
              <Tabs activeKey={filter} onChange={key => {
                if (key === "all" || key === "movie" || key === "series") {
                  setFilter(key);
                  setAllMovies(null);
                  setPage(1);
                }
              }} items={[
                { key: "all", label: "Все фильмы" },
                { key: "movie", label: "Фильмы" },
                { key: "series", label: "Сериалы" },
              ]} />
            </>
          )}
          {loaded && visibleItems.length === 0 ? (
            <section className={classes.empty} aria-labelledby="empty-movies-title">
              <span className={classes.emptyLabel}>Кинотека</span>
              <h1 id="empty-movies-title" className={classes.emptyTitle}>
                Фильмы пока за кадром
              </h1>
              <p className={classes.emptyDescription}>
                Здесь пока нет фильмов. Загляните чуть позже.
              </p>
            </section>
          ) : loaded ? (
            <>
              <MoviesList
                films={visibleItems}
                onClickDeleteButton={clickDeleteButtonHandler}
                onClickEditButton={clickEditButtonHandler}
                showButtons={isAdmin}
              />

              <div className={classes.bottom}>
                <Pagination
                  align="center"
                  current={page}
                  total={visibleTotal}
                  pageSize={pageSize}
                  pageSizeOptions={[12, 24]}
                  onChange={(nextPage, nextSize) => {
                    if (nextSize !== pageSize) onPageSizeChange(nextSize);
                    else handlePageClick(nextPage);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <Loader />
              <div className="movies-list">{renderFilmCardPlaceholders(pageSize)}</div>
            </>
          )}
        </div>
        <Modal
          title={modalTitle}
          footer={false}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          centered
        >
          {modalType === "film-edit" && (
            <EditMovieForm
              initialId={modalInitialId}
              onSubmit={onSubmit}
            />
          )}
          {modalType === "film-delete" && (
            <DeleteMovieForm
              initialId={modalInitialId}
              onSubmit={onSubmit}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default MoviesPage;
