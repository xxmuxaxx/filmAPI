import React, { Component } from 'react'
import classes from './Layout.module.css'
import Search from '../../components/Nav/Search/Search'

class Layout extends Component {
  render() {
    return (

      <div className={classes.Layout}>

        <Search />

        <main>
          {this.props.children}
        </main>

      </div>

    )
  }
}

export default Layout