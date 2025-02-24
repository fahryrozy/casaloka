import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import styles from "./style.module.scss";
import { Thumb } from "./propertyImageThumb";

interface PropertyImage {
  log_number: string;
  properti_id: number;
  image_url: string;
  image_url_real: string;
}

interface PropertyImageCarouselProps {
  images: PropertyImage[];
}

const PropertyImageCarousel: React.FC<PropertyImageCarouselProps> = ({
  images,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaMainRef}>
        <div className={styles.embla__container}>
          {images &&
            images.map((image, index) => (
              <div className={styles.embla__slide} key={index}>
                <Image
                  width={1366}
                  height={768}
                  src={`https://newapidev.casaloka.id${image.image_url_real}`}
                  // src={
                  //   "https://i.pinimg.com/736x/41/8c/ec/418cecaf8aa658b09f9161205ea46568.jpg"
                  // }
                  alt={`image-${index}`}
                  className={styles["embla__slide__image"]}
                />
              </div>
            ))}
        </div>
      </div>

      <div className={styles["embla-thumbs"]}>
        <div className={styles["embla-thumbs__viewport"]} ref={emblaThumbsRef}>
          <div className={styles["embla-thumbs__container"]}>
            {images &&
              images.map((image, index) => (
                <Thumb
                  key={index}
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  index={index}
                  // imgSrc={
                  //   "https://i.pinimg.com/736x/4c/55/3b/4c553b4f46ca691ecbe32d06c6c4d85a.jpg"
                  // }
                  imgSrc={`https://newapidev.casaloka.id${image.image_url_real}`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyImageCarousel;
