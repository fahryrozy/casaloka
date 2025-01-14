"use client";

import React from "react";
import Image from "next/image";
import styles from "./testimonial.module.scss";

const Testimonial: React.FC = () => {
  const testimonials = [
    {
      quote:
        "Casaloka.id membuat pembelian properti syariah sangat mudah dan terpercaya. Layanan mereka sangat profesional. Sangat puas!",
      author: "Maell",
      image: "/assets/images/image 15.png",
    },
  ];

  return (
    <section id="testimonial" className={styles.testimonialSection}>
      <h3 className={styles.testimonialHeader}>Testimoni</h3>
      <div className={styles.testimonialContainer}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonialContentWrapper}>
            <div className={styles.testimonialContent}>
              <div className={styles.quoteContainer}>
                <Image
                  src="/assets/icons/bxs_quote-right.svg"
                  alt="Quote"
                  width={24}
                  height={24}
                />
              </div>
              <p className={styles.quoteText}>{testimonial.quote}</p>
              <p className={styles.quoteAuthor}>- {testimonial.author}</p>
            </div>
            <div className={styles.testimonialImageContainer}>
              <Image
                className={styles.testimonialImage}
                src={testimonial.image}
                alt="Testimonial Person"
                width={300}
                height={300}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
