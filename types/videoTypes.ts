type ItemProps = {
  poster_path: string;
  title: string;
  id: number;
};

type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
};
interface ResponseMovieProps {
  results: ItemProps[];
}

interface Genre {
  id: number;
  name: string;
}

interface MoviesProps {
  title: string;
  id: number;
  imgUrl: string;
}

interface MovieProps {
  backdrop_path: string;
  id: number;
  genres: Genre[];
  title: string;
  overview: string;
  tagline: string;
  release_date: string;
  videos: {
    results: Video[];
  };
}

export type { ResponseMovieProps, MoviesProps, MovieProps };
