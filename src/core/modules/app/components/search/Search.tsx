import { AutoComplete } from 'antd';
import { useActions } from 'core/hooks/useActions';
import {
  selectSearchItems,
  selectSearchText,
} from 'core/modules/movie/selectors/movieSelectors';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { env } from '../../../../helpers/environment';
import { useDebouncedEffect } from '../../../../hooks/useDebouncedEffect';

const Search: FC = () => {
  const history = useHistory();
  const searchText = useSelector(selectSearchText);
  const searchItems = useSelector(selectSearchItems);

  const { setSearchText, setSearchItems, fetchSearchFilmsByTitle } =
    useActions();

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
    setSearchText('');
    history.push(`${env.films.baseUrl}/${title}`);
  };

  const options = useMemo(() => {
    if (!searchItems) return [];
    return searchItems.map((d) => ({ label: d.title, value: d.title }));
  }, [searchItems]);

  return (
    <AutoComplete
      value={searchText}
      placeholder="Введите название фильма"
      onSearch={onSearch}
      onSelect={onSelect}
      options={options}
    />
  );
};

export default Search;
