const BASE_URL = "https://api.themoviedb.org/3";

const PATH = (query?: string) => `discover/movie?with_genres=${query}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const VIDEO_URL = (id: string) =>
  `http://www.youtube.com/embed/${id}?enablejsapi=1&origin=http://example.com&modestbranding=1`;

const GRAPHQL_URL = "https://correct-humpback-76.hasura.app/v1/graphql";

export { BASE_URL, PATH, IMG_URL, VIDEO_URL, GRAPHQL_URL };
