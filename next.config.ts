import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.crowdspring.com",
      "newapidev.casaloka.id",
      "react-slick.neostack.com",
      "i.pinimg.com",
      "encrypted-tbn0.gstatic.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Add this line to ignore ESLint during builds
  },
};

export default nextConfig;
