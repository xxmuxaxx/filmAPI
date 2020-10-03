import React from "react";
import ContentLoader from "react-content-loader";

const FilmCardPlaceholder = () => (
  <ContentLoader className="film-card-placeholder" height="450">
    <rect x="0" y="0" rx="5" ry="5" height="100%" width="100%" />
  </ContentLoader>
);

export default FilmCardPlaceholder;
