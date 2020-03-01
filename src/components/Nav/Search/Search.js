import React from 'react'
import classes from './Search.module.css'

const Search = props => {
  return (
    <div className={classes.Search}>
      <input
        type={'text'}
        placeholder={'Поиск'}
      />
      <button></button>

    </div>
  )
}

export default Search