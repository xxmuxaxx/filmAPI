import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AutoComplete } from 'antd';
import {
  fetchSearchFilmsByTitle,
  setSearchItems,
  setSearchText,
} from '../../redux/actions/search';
import { useDebouncedEffect } from '../../services/useDebouncedEffect';
import { env } from '../../services/environment';

export const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { searchText, searchItems } = useSelector(({ search }) => search);

  useDebouncedEffect(
    () => {
      if (!searchText) return dispatch(setSearchItems([]));
      dispatch(fetchSearchFilmsByTitle(searchText));
    },
    200,
    [searchText]
  );

  const onSearch = (value) => {
    dispatch(setSearchText(value));
  };

  const onSelect = async (title) => {
    dispatch(setSearchText(''));
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
