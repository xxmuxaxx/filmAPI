import React, { Component } from "react";
import classes from "./Layout.module.css";
import Search from "../../components/Nav/Search/Search";

class Layout extends Component {
  state = {
    responseFilms: [],
  };

  inputChangeHundler = async (e) => {
    const request = `https://salty-lowlands-03006.herokuapp.com/movies/find?title=${e.target.value}`;

    fetch(request)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          responseFilms: result.search,
        });
      });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Search
          placeholder={"Поиск фильма"}
          inputChangeHundler={this.inputChangeHundler}
        />
        <ul className={classes.Dropdown}>{this.renderfilms()}</ul>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
