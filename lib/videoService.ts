import { ResponseMovieProps, MoviesProps, MovieProps } from "types/videoTypes";
import { BASE_URL, PATH, IMG_URL } from "constants/routes";

const API_KEY = process.env.API_KEY;
const FE_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const getMovies = async (query?: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${PATH(query)}&api_key=${API_KEY}&language=en-US`
    );

    if (!res.ok) {
      console.log(await res.json());
    }

    const data: ResponseMovieProps = await res.json();

    const parsedData: MoviesProps[] = data?.results.map((item) => ({
      title: item.title,
      imgUrl: IMG_URL + item.poster_path,
      id: item.id,
    }));

    return parsedData;
  } catch (err) {
    console.log(err);
  }
};

const getMovie = async (id: string): Promise<MovieProps | null | undefined> => {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${FE_API_KEY}&append_to_response=videos`
    );

    if (!res.ok) {
      return null;
    }

    const data: MovieProps = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export { getMovies, getMovie };
