import React from "react";
import classes from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={classes.LoaderWrapper}>
      <div className={classes.Loader}></div>
    </div>
  );
}
