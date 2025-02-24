"use client";

import React, { useState } from "react";
import styles from "./contact.module.scss";
import { FaEnvelope, FaPhoneAlt, FaUserAlt } from "react-icons/fa";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    newsletter: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      newsletter: e.target.checked,
    });
    setIsFormValid(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, message, newsletter } = formData;
    const whatsappMessage = `Nama: ${name}\nEmail: ${email}\nTelepon: ${phone}\nPesan: ${message}\n`;
    const whatsappUrl = `https://wa.me/628161691414?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

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

        <div className={styles.contactFormContainer}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                className={styles.inputField}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FaUserAlt className={styles.inputIcon} />
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Masukkan Email"
                className={styles.inputField}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <FaEnvelope className={styles.inputIcon} />
            </div>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                placeholder="Masukkan No. Telepon"
                className={styles.inputField}
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <FaPhoneAlt className={styles.inputIcon} />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Tulis pesan anda disini"
                rows={4}
                className={styles.inputField}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                className={styles.checkbox}
                checked={formData.newsletter}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="newsletter" className={styles.checkboxLabel}>
                Saya ingin menerima newsletter mengenai promo terbaru dari
                casaloka.id
              </label>
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isFormValid}
            >
              Kirim Ke Whatsapp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
