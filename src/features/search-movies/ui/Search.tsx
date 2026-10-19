import { AutoComplete, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import {
  catalogParams,
  catalogUrl,
  movieUrl,
  readCatalogRoute,
  movieSuggestionsQuery,
} from "entities/movie";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const SearchInput = ({ initialQuery }: { initialQuery: string }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [draft, setDraft] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const timeout = window.setTimeout(
      () => setDebouncedQuery(draft.trim()),
      200
    );
    return () => window.clearTimeout(timeout);
  }, [draft]);

  const suggestions = useQuery(movieSuggestionsQuery(debouncedQuery));
  const options =
    draft.trim() === debouncedQuery
      ? (suggestions.data ?? []).map((movie) => ({
          label: movie.title,
          value: movie.title,
        }))
      : [];

  const submitSearch = (value: string) => {
    const route = readCatalogRoute(searchParams);
    navigate(catalogUrl(catalogParams({ ...route, q: value.trim(), page: 1 })));
  };

  return (
    <AutoComplete
      value={draft}
      onSearch={setDraft}
      options={options}
      onSelect={(title) => navigate(movieUrl(title, searchParams))}
    >
      <Input.Search
        placeholder="Введите название фильма"
        aria-label="Поиск фильма"
        onSearch={submitSearch}
        allowClear
      />
    </AutoComplete>
  );
};

const Search = () => {
  const [params] = useSearchParams();
  const query = readCatalogRoute(params).q;
  return <SearchInput key={query} initialQuery={query} />;
};
export default Search;
