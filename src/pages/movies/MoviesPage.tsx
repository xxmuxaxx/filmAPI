import { useQuery } from "@tanstack/react-query";
import { catalogQuery } from "entities/movie";
import { Alert, Button, Modal, Pagination, Tabs } from "antd";
import { useSearchParams } from "react-router";
import { catalogParams, readCatalogRoute } from "entities/movie";
import { getErrorMessage } from "shared/api";
import { DeleteMovieForm } from "features/manage-movie";
import { EditMovieForm } from "features/manage-movie";
import { useCurrentUser, isUserAdmin } from "entities/user";
import { FC, useEffect, useState } from "react";

import Hero from "./ui/hero/Hero";
import { FilmCardPlaceholder } from "entities/movie";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const route = readCatalogRoute(searchParams);
  const { type: filter, page, size: pageSize, q } = route;
  const canonicalSearch = catalogParams(route).toString();
  const catalog = useQuery(catalogQuery(route));
  const items = catalog.data?.items ?? [];
  const totalItems = catalog.data?.totalItems ?? 0;
  const isAdmin = isUserAdmin(useCurrentUser().data);
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
  };

  useEffect(() => {
    if (searchParams.toString() !== canonicalSearch) {
      setSearchParams(canonicalSearch, { replace: true });
    }
  }, [searchParams, canonicalSearch, setSearchParams]);

  const resolvedPage = catalog.data?.page;
  useEffect(() => {
    if (resolvedPage !== undefined && resolvedPage !== page) {
      const currentRoute = readCatalogRoute(
        new URLSearchParams(canonicalSearch)
      );
      setSearchParams(catalogParams({ ...currentRoute, page: resolvedPage }), {
        replace: true,
      });
    }
  }, [resolvedPage, page, canonicalSearch, setSearchParams]);

  const loaded = !catalog.isPending;
  const error = catalog.error ? getErrorMessage(catalog.error) : undefined;
  const isEmpty = loaded && Boolean(catalog.data) && items.length === 0;
  const hasMovies = items.length > 0;
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
    void catalog.refetch();
  };

  return (
    <>
      <Hero />
      <div className={`container ${classes.container}`}>
        <div className={classes.catalog}>
          {catalog.isRefetchError && catalog.data && (
            <Alert
              type="warning"
              title="Не удалось обновить каталог"
              description={error}
              showIcon
            />
          )}
          {catalog.isFetching && catalog.data && (
            <span role="status">Обновляем каталог…</span>
          )}
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
          {error && !catalog.data && (
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
          open={isAdmin && isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          centered
          destroyOnHidden
        >
          {isAdmin && modalType === "film-edit" && (
            <EditMovieForm initialId={modalInitialId} onSubmit={onSubmit} />
          )}
          {isAdmin && modalType === "film-delete" && (
            <DeleteMovieForm initialId={modalInitialId} onSubmit={onSubmit} />
          )}
        </Modal>
      </div>
    </>
  );
};

export default MoviesPage;
