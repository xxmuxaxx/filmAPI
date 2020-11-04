import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { fetchSearchFilmsByTitle, setSearchItems, setSearchText } from '../../../redux/actions/search';
import Input from '../../UI/Input/Input';
import classes from './Search.module.css';

const Search = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const history = useHistory();

  const { searchText, searchItems } = useSelector(({ search }) => search);

  React.useEffect(() => {
    if (searchText) {
      console.log('API GET SEARCH');
      dispatch(fetchSearchFilmsByTitle(searchText));
    } else {
      dispatch(setSearchItems([]));
    }
  }, [dispatch, searchText]);

  function renderFilmList() {
    return searchItems.map((filmLink) => {
      return (
        <li key={filmLink.id} data-title={filmLink.title}>
          <Link to={`/film/${filmLink.title}`} className={classes.Link} onClick={linkClickHandler}>
            {filmLink.title}
          </Link>
        </li>
      );
    });
  }

  const linkClickHandler = async () => {
    dispatch(setSearchText(''));
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (searchItems.length) {
      const title = searchItems[0].title;
      dispatch(setSearchText(''));
      history.push(`/film/${title}`);
    }
  };

  const inputChangeHandler = (event) => {
    dispatch(setSearchText(event.target.value));
  };

  return (
    <div className={classes.Search}>
      <form onSubmit={formSubmitHandler}>
        <Input value={searchText} placeholder={'Введите название фильма'} onChange={inputChangeHandler} />
        <ul className={classes.Dropdown} ref={ref}>
          {renderFilmList()}
        </ul>
        <button></button>
      </form>
    </div>
  );
};

export default Search;
