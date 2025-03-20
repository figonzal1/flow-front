import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "*.flow.cl",
        "*.enormously-rapid-duckling.ngrok-free.app",
      ],
    },
  },
};
export default nextConfig;
