import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/upgrade-config-next" : "";

const nextConfig: NextConfig = {
  ...(isProd && {
    output: "export",
    trailingSlash: true,
  }),
  basePath,
  assetPrefix: basePath,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
