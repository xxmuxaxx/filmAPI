import ContentLoader from 'react-content-loader';

const FilmCardPlaceholder = () => (
  <ContentLoader width="100%" height="388" viewBox="0 0 288 388" backgroundColor="#e1e3e5" foregroundColor="#f3f5f6" aria-label="Загрузка фильма">
    <rect x="0" y="0" width="288" height="304" />
    <rect x="16" y="320" width="200" height="20" />
    <rect x="16" y="352" width="120" height="14" />
  </ContentLoader>
);

export default FilmCardPlaceholder;
