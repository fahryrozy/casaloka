"use client";

import { useRouter } from "next/navigation";
import { AnchorHTMLAttributes } from "react";

interface SmoothScrollLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  onClick?: () => void;
}

const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({
  href,
  children,
  onClick,
  ...props
}) => {
  const router = useRouter();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (onClick) {
      onClick();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const [path, hash] = href.split("#");

    if (hash) {
      if (window.location.pathname === path) {
        // Same page navigation
        handleScroll(hash);
      } else {
        // Navigate to the new page, then scroll
        router.push(path);
        // Use a timeout to ensure the page has loaded before scrolling
        setTimeout(() => handleScroll(hash), 100); // Adjust timeout as needed
      }
    } else {
      // No hash, just navigate
      router.push(path);
    }
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default SmoothScrollLink;
