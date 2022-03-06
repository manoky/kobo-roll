import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "styles/video.module.css";
import { getMovie, getMovies } from "lib/videoService";
import { MovieProps } from "types/videoTypes";
import { IMG_URL, VIDEO_URL } from "constants/routes";
import cls from "classnames";
import NavBar from "components/navbar";
import { Like, Dislike } from "components/icons";
import { updateFavourite, getMoviestats } from "lib/generalService";

const Video: NextPage<{ movie: MovieProps }> = ({ movie: initialMovie }) => {
  const router = useRouter();
  const { id } = router.query;
  const videoId = Number(id);
  const [movie, setMovie] = useState<MovieProps | null>(initialMovie);
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisliked] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await getMoviestats(videoId);
      if (stats) {
        if (stats.favourited === 1) {
          setLiked(true);
        } else if (stats.favourited === 2) {
          setDisliked(true);
        }
      }
    };

    fetchStats();
  }, [videoId]);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovie(videoId);

      if (data) {
        setMovie(data);
      }
    };

    if (!movie) {
      fetchMovie();
    }
  }, [videoId, movie]);

  if (!movie) {
    return null;
  }

  const updateData = {
    watched: true,
    videoId: Number(id),
    imgUrl: IMG_URL + movie.poster_path,
  };

  const toggleLike = async () => {
    setLiked((like) => !like);
    if (disLiked) {
      setDisliked(false);
    }

    await updateFavourite({
      favourited: liked ? 0 : 1,
      ...updateData,
    });
  };

  const toggleDislike = async () => {
    setDisliked(!disLiked);
    if (liked) {
      setLiked(false);
    }

    await updateFavourite({
      favourited: disLiked ? 0 : 2,
      ...updateData,
    });
  };

  const key = movie.videos.results.length > 0 ? movie.videos.results[0].key : "";
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.modal}>
        <iframe
          id="player"
          width="100%"
          height="390"
          src={VIDEO_URL(key)}
          frameBorder="0"
          className={styles.videoPlayer}
        ></iframe>
        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={toggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={liked} />
              </div>
            </button>
          </div>
          <button onClick={toggleDislike}>
            <div className={styles.btnWrapper}>
              <Dislike selected={disLiked} />
            </div>
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{movie.release_date}</p>
              <p className={styles.title}>{movie.title}</p>
              <p className={styles.description}>{movie.overview}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await getMovies();

  const paths = movies
    ? movies.map((movie) => ({
        params: { id: movie.id.toString() },
      }))
    : [];

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const movie = await getMovie(Number(context.params?.id));
  return { props: { movie }, revalidate: 10 };
};

export default Video;
