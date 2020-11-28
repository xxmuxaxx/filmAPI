import React from "react";
import classes from "./Loader.module.scss";

export default function Loader() {
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '17px';

        return (() => {
            document.body.style.overflow = ''
            document.body.style.paddingRight = '';
        })
    })

    return (
        <div className={classes.LoaderWrapper}>
            <div className={classes.Loader} />
        </div>
    );
}
