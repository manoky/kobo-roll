import Card from "components/card";
import { VideoProps } from "types/videoTypes";
import styles from "./section-list.module.css";

interface SectionListProps {
  title: string;
  videos: VideoProps[];
  size?: "large" | "medium" | "small";
}

const SectionList = ({ title, videos, size }: SectionListProps) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video) => (
          <Card key={video.id} size={size} imgUrl={video.imgUrl} />
        ))}
      </div>
    </section>
  );
};

export default SectionList;
