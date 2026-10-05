import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio",
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/portfolio",
  },
};

export default nextConfig;
