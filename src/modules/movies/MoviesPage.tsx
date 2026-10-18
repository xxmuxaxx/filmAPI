import { Button, Modal, Pagination, Tabs } from "antd";
import { useSearchParams } from "react-router";
import { useAppDispatch } from "core/configureStore";
import { catalogParams, readCatalogRoute } from "core/helpers/catalogRouting";
import { fetchCatalog } from "core/modules/movie/actions/movieActions";
import { getErrorMessage } from "core/http";
import DeleteMovieForm from "core/modules/movie/components/deleteMovieForm/DeleteMovieForm";
import EditMovieForm from "core/modules/movie/components/editMovieForm/EditMovieForm";
import { selectMovieState } from "core/modules/movie/selectors/movieSelectors";
import { selectCurrentUserIsAdmin } from "core/modules/users/selectors/usersSelectors";
import { FC, useEffect, useState } from "react";
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

interface CatalogRequest {
  key: string;
  error?: string;
}

const MoviesPage: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const route = readCatalogRoute(searchParams);
  const { type: filter, page, size: pageSize, q } = route;
  const canonicalSearch = catalogParams(route).toString();
  const [request, setRequest] = useState<CatalogRequest | null>(null);
  const [revision, setRevision] = useState(0);
  const { items, totalItems } = useSelector(selectMovieState);
  const requestKey = `${canonicalSearch}:${revision}`;
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
    if (pageNumber !== page) {
      setSearchParams(catalogParams({ ...route, page: pageNumber }));
    }
  };

  const onPageSizeChange = (value: number) => {
    if (value === 12 || value === 24) {
      setSearchParams(catalogParams({ ...route, page: 1, size: value }));
    }
  };

  const onSubmit = () => {
    setIsModalVisible(false);
    setRevision((value) => value + 1);
  };

  useEffect(() => {
    if (searchParams.toString() !== canonicalSearch) {
      setSearchParams(canonicalSearch, { replace: true });
    }
  }, [searchParams, canonicalSearch, setSearchParams]);

  useEffect(() => {
    const controller = new AbortController();
    const currentRoute = readCatalogRoute(new URLSearchParams(canonicalSearch));
    dispatch(fetchCatalog(currentRoute, controller.signal))
      .then((result) => {
        if (controller.signal.aborted || !result) {
          return;
        }

        if (result.page !== currentRoute.page) {
          setSearchParams(
            catalogParams({ ...currentRoute, page: result.page }),
            { replace: true }
          );
        } else {
          setRequest({ key: requestKey });
        }
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setRequest({ key: requestKey, error: getErrorMessage(error) });
        }
      });
    return () => controller.abort();
  }, [dispatch, canonicalSearch, requestKey, setSearchParams]);

  const loaded = request?.key === requestKey;
  const error = loaded ? request.error : undefined;
  const isEmpty = loaded && !error && items.length === 0;
  const hasMovies = loaded && !error && items.length > 0;
  const isFilteredEmpty = isEmpty && filter !== "all" && !q;
  const showCatalogNavigation = !loaded || hasMovies || isFilteredEmpty;

  const handleFilterChange = (type: string) => {
    if (type === "all" || type === "movie" || type === "series") {
      setSearchParams(catalogParams({ ...route, type, page: 1 }));
    }
  };

  const handlePaginationChange = (nextPage: number, nextSize: number) => {
    if (nextSize !== pageSize) {
      onPageSizeChange(nextSize);
    } else {
      handlePageClick(nextPage);
    }
  };

  const handleResetSearch = () => {
    setSearchParams(catalogParams({ ...route, q: "", page: 1 }));
  };

  const handleRetry = () => {
    setRevision((value) => value + 1);
  };

  return (
    <>
      <Hero />
      <div className={`container ${classes.container}`}>
        <div className={classes.catalog}>
          {showCatalogNavigation && (
            <>
              <div className={classes.heading}>
                <h1>Фильмы</h1>
                <p>
                  {q
                    ? `Результаты поиска: «${q}»`
                    : "Ваша коллекция хорошего кино"}
                </p>
              </div>
              <Tabs
                activeKey={filter}
                onChange={handleFilterChange}
                items={[
                  { key: "all", label: "Все фильмы" },
                  { key: "movie", label: "Фильмы" },
                  { key: "series", label: "Сериалы" },
                ]}
              />
            </>
          )}
          {error && (
            <section className={classes.empty} role="alert">
              <span className={`${classes.emptyLabel} ${classes.resultLabel}`}>
                Не удалось получить данные
              </span>
              <h1 className={classes.emptyTitle}>
                Не удалось загрузить фильмы
              </h1>
              <p className={classes.emptyDescription}>{error}</p>
              <Button type="primary" onClick={handleRetry}>
                Попробовать снова
              </Button>
            </section>
          )}
          {isEmpty && (
            <section
              className={classes.empty}
              aria-labelledby="empty-movies-title"
            >
              <span
                className={`${classes.emptyLabel} ${q ? classes.resultLabel : ""}`}
              >
                {q ? `Поиск по запросу «${q}»` : "Кинотека"}
              </span>
              <h1 id="empty-movies-title" className={classes.emptyTitle}>
                {q ? "Ничего не нашлось" : "Фильмы пока за кадром"}
              </h1>
              <p className={classes.emptyDescription}>
                {q
                  ? "Попробуйте другое название или сбросьте фильтры."
                  : "Здесь пока нет фильмов. Загляните чуть позже."}
              </p>
              {q && (
                <Button type="primary" onClick={handleResetSearch}>
                  Сбросить поиск
                </Button>
              )}
            </section>
          )}
          {hasMovies && (
            <>
              <MoviesList
                films={items}
                onClickDeleteButton={clickDeleteButtonHandler}
                onClickEditButton={clickEditButtonHandler}
                showButtons={isAdmin}
              />

              <div className={classes.bottom}>
                <Pagination
                  align="center"
                  current={page}
                  total={totalItems}
                  pageSize={pageSize}
                  pageSizeOptions={[12, 24]}
                  onChange={handlePaginationChange}
                />
              </div>
            </>
          )}
          {!loaded && (
            <div className="movies-list">
              {renderFilmCardPlaceholders(pageSize)}
            </div>
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
            <EditMovieForm initialId={modalInitialId} onSubmit={onSubmit} />
          )}
          {modalType === "film-delete" && (
            <DeleteMovieForm initialId={modalInitialId} onSubmit={onSubmit} />
          )}
        </Modal>
      </div>
    </>
  );
};

export default MoviesPage;
