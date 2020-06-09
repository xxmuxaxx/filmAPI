import React from 'react'
import classes from './Search.module.css'

const Search = props => {
  return (
    <div className={classes.Search}>
      <input
        type={'text'}
        placeholder={'Поиск'}
        onChange={props.inputChangeHandler}
      />
      <button></button>
    </div>
  )
}

export default Search
