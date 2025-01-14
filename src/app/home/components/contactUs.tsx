"use client";

import React from "react";
import styles from "./contactUs.module.scss";

const ContactUs: React.FC = () => {
  return (
    <section id="contact-us" className={styles.contactSection}>
      <div className={styles.contactContainer}>
        {/* Left Side - Text Content */}
        <div className={styles.contactText}>
          <h2>
            Tertarik mencari rumah atau butuh pembiayaan?{" "}
            <span className={styles.contactHighlight}>Hubungi kami</span>{" "}
            sekarang untuk{" "}
            <span className={styles.contactHighlight}>solusi terbaik!</span>
          </h2>
        </div>

        {/* Right Side - Form */}
        <div className={styles.contactFormContainer}>
          <form className={styles.contactForm}>
            {/* Nama Lengkap */}
            <div className="relative">
              <input
                type="text"
                placeholder="Nama Lengkap"
                className={styles.inputField}
              />
              <i className={styles.inputIcon}>👤</i>
            </div>
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Masukkan Email"
                className={styles.inputField}
              />
              <i className={styles.inputIcon}>✉️</i>
            </div>
            {/* No. Telepon */}
            <div className="relative">
              <input
                type="tel"
                placeholder="Masukkan No. Telepon"
                className={styles.inputField}
              />
              <i className={styles.inputIcon}>📞</i>
            </div>
            {/* Pesan */}
            <div>
              <textarea
                placeholder="Tulis pesan anda disini"
                rows={4}
                className={styles.inputField}
              />
            </div>
            {/* Checkbox */}
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="newsletter"
                className={styles.checkbox}
              />
              <label htmlFor="newsletter" className={styles.checkboxLabel}>
                Saya ingin menerima newsletter mengenai promo terbaru dari
                casaloka.id
              </label>
            </div>
            {/* Submit Button */}
            <button type="submit" className={styles.submitButton}>
              Kirim Ke Whatsapp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
