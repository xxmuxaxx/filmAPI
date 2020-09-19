import React from "react";
import classes from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={classes.LoaderWrapper}>
      <div className="container">
        <div className={classes.Loader}></div>
      </div>
    </div>
  );
}
