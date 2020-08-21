import React from "react";
import classes from "./Search.module.css";
import Input from "../../UI/Input/Input";

const Search = (props) => {
  return (
    <div className={classes.Search}>
      <form>
        <Input
          type={"text"}
          placeholder={props.placeholder}
          inputChangeHundler={props.inputChangeHundler}
        />
        <button></button>
      </form>
    </div>
  );
};

export default Search;
