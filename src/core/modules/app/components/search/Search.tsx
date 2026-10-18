import { AutoComplete, Input } from "antd";
import {
  catalogParams,
  catalogUrl,
  movieUrl,
  readCatalogRoute,
} from "core/helpers/catalogRouting";
import { useActions } from "core/hooks/useActions";
import {
  selectSearchItems,
  selectSearchText,
} from "core/modules/movie/selectors/movieSelectors";
import { FC, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

import { useDebouncedEffect } from "../../../../hooks/useDebouncedEffect";

const Search: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = readCatalogRoute(searchParams).q;
  const searchText = useSelector(selectSearchText);
  const searchItems = useSelector(selectSearchItems);

  const { setSearchText, setSearchItems, fetchSearchFilmsByTitle } =
    useActions();

  useEffect(() => {
    setSearchText(query);
  }, [query, setSearchText]);

  useDebouncedEffect(
    () => {
      if (!searchText) return setSearchItems([]);
      fetchSearchFilmsByTitle(searchText);
    },
    200,
    [searchText]
  );

  const onSearch = (value: string) => {
    setSearchText(value);
  };

  const onSelect = async (title: string) => {
    setSearchText("");
    navigate(movieUrl(title, searchParams));
  };

  const submitSearch = (value: string) => {
    const route = readCatalogRoute(searchParams);
    setSearchItems([]);
    navigate(catalogUrl(catalogParams({ ...route, q: value.trim(), page: 1 })));
  };

  const options = useMemo(() => {
    if (!searchItems) return [];
    return searchItems.map((d) => ({ label: d.title, value: d.title }));
  }, [searchItems]);

  return (
    <AutoComplete
      value={searchText}
      onSearch={onSearch}
      onSelect={onSelect}
      options={options}
    >
      <Input.Search
        placeholder="Введите название фильма"
        aria-label="Поиск фильма"
        onSearch={submitSearch}
        allowClear
      />
    </AutoComplete>
  );
};

export default Search;
