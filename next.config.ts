import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      loader: "@svgr/webpack",
      options: {
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: { removeViewBox: false },
              },
            },
          ],
        },
      },
      test: /.svg$/,
    });
    return config;
  },
};

module.exports = nextConfig;
