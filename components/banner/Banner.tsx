import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./banner.module.css";

interface BannerProps {
  title: string;
  subTitle: string;
  imgUrl: string;
  id: number;
}

const Banner = ({ title, subTitle, imgUrl, id }: BannerProps) => {
  const router = useRouter();

  const handlePlay = () => {
    router.push(`/video/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>K</p>
            <p className={styles.series}>SERIES</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.playButtonWrapper}>
            <button className={styles.btnWithIcon} onClick={handlePlay}>
              <Image
                src="/static/play_icon.svg"
                height="32px"
                width="32px"
                alt="play icon"
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          background: `url(${imgUrl})`,
          height: "100%",
          width: "100%",
          position: "absolute",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
        }}
      ></div>
    </div>
  );
};

export default Banner;
