import Card from "components/card";
import Link from "next/link";
import cls from "classnames";
import { MoviesProps } from "types/videoTypes";
import styles from "./section-list.module.css";

interface SectionListProps {
  title: string;
  videos: MoviesProps[];
  size?: "large" | "medium" | "small";
  inList?: boolean;
}

const SectionList = ({ title, videos, size, inList }: SectionListProps) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, inList && styles.wrap)}>
        {videos.map((video, i) => (
          <Link href={`video/${video.id}`} key={video.id}>
            <a>
              <Card
                size={size}
                imgUrl={video.imgUrl}
                last={i === videos.length - 1}
                first={i === 0}
                inList
              />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionList;
