import React from "react";
import styles from "./blog.module.scss";
import Image from "next/image";

interface BlogCardProps {
  image: string;
  author: string;
  title: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, author, title }) => {
  return (
    <div className={styles.blogCard}>
      <Image
        width={500}
        height={500}
        src={image}
        alt={title}
        className={styles.blogCardImage}
      />
      <div className={styles.blogCardContent}>
        <p className={styles.blogCardAuthor}>{author}</p>
        <h3 className={styles.blogCardTitle}>{title}</h3>
      </div>
    </div>
  );
};

const Blog: React.FC = () => {
  const blogs = [
    {
      image: "/assets/images/blog.png",
      author: "Admin Tampan",
      title: "10 Rekomendasi akun tiktok yang bisa meningkatkan penjualanmu",
    },
    {
      image: "/assets/images/blog.png",
      author: "Admin Tampan",
      title: "10 Rekomendasi akun tiktok yang bisa meningkatkan penjualanmu",
    },
    {
      image: "/assets/images/blog.png",
      author: "Admin Tampan",
      title: "10 Rekomendasi akun tiktok yang bisa meningkatkan penjualanmu",
    },
  ];

  return (
    <section id="blog" className={styles.blogSection}>
      <div className={styles.blogContainer}>
        <div className={styles.blogHeader}>
          <h2 className={styles.blogTitle}>Blog Kami</h2>
          <a href="#" className={styles.blogLink}>
            Lihat Semua
          </a>
        </div>
        <div className={styles.blogGrid}>
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              image={blog.image}
              author={blog.author}
              title={blog.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
