import Card from "components/card";
import Link from "next/link";
import { MoviesProps } from "types/videoTypes";
import styles from "./section-list.module.css";

interface SectionListProps {
  title: string;
  videos: MoviesProps[];
  size?: "large" | "medium" | "small";
}

const SectionList = ({ title, videos, size }: SectionListProps) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, i) => (
          <Link href={`video/${video.id}`} key={video.id}>
            <a>
              <Card
                size={size}
                imgUrl={video.imgUrl}
                last={i === videos.length - 1}
                first={i === 0}
              />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionList;
