import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import cls from "classnames";
import styles from "./card.module.css";

interface CardProps {
  imgUrl?: string;
  size?: keyof Size;
}

interface Size {
  large: string;
  medium: string;
  small: string;
}

const defaultImg =
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80";

const Card = ({ imgUrl = defaultImg, size = "medium" }: CardProps) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  let key: keyof Size;
  const classes = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const onError = () => {
    setImgSrc(defaultImg);
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classes[size])}
        whileHover={{ scale: 1.1, left: -12 }}
      >
        <Image
          src={imgSrc}
          layout="fill"
          alt=""
          className={styles.cardImg}
          onError={onError}
        />
      </motion.div>
    </div>
  );
};

export default Card;
