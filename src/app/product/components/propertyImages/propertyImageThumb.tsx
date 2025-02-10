import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  imgSrc: string;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, imgSrc } = props;

  return (
    <div
      className={`${styles["embla-thumbs__slide"]} ${
        selected ? styles["embla-thumbs__slide--selected"] : ""
      }`}
    >
      <button
        onClick={onClick}
        type="button"
        className={styles["thumbs__slide__number"]}
      >
        <Image
          width={1366}
          height={768}
          src={imgSrc}
          alt={`Thumbnail ${index + 1}`}
          className="w-full h-full"
        />
      </button>
    </div>
  );
};
export default Thumb;
