"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import styles from "./hero.module.scss";

const Hero: React.FC = () => {
  const [propertyCount, setPropertyCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const images = [
    {
      src: "/assets/images/hero-1.png",
      alt: "Random House 1",
    },
    {
      src: "/assets/images/hero-1.png",
      alt: "Random House 2",
    },
    {
      src: "/assets/images/hero-1.png",
      alt: "Random House 3",
    },
  ];
  useEffect(() => {
    // Animation for Property Ready counter
    const propertyInterval = setInterval(() => {
      setPropertyCount((prev) => (prev < 69 ? prev + 1 : 69));
    }, 20); // Adjust speed by changing the interval time

    // Animation for Pelanggan counter
    const customerInterval = setInterval(() => {
      setCustomerCount((prev) => (prev < 89 ? prev + 1 : 89));
    }, 20);

    return () => {
      clearInterval(propertyInterval);
      clearInterval(customerInterval);
    };
  }, []);

  return (
    <section id="home" className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroHeader}>
          <div className={styles.heroTitle}>
            <h1>
              AYO TEMUKAN
              <span className={styles.heroHighlight}> RUMAH IMPIAN</span>
            </h1>
            <h1>
              ANDA BERSAMA
              <span className={styles.heroHighlight}> CASALOKA</span>
            </h1>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{propertyCount}+</span>
              <p className={styles.statLabel}>Property Ready</p>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{customerCount}+</span>
              <p className={styles.statLabel}>Pelanggan</p>
            </div>
          </div>
        </div>
        {/* Carousel Section */}
        <div className={styles.carouselContainer}>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            loop={true}
            className={`${styles.swiper} custom-swiper`}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1296}
                  height={430}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Hero;
