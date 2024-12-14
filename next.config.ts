import { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

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

module.exports = withPWA({
  ...nextConfig,
  devServer: {
    https: true,
    host: true,
    port: 3000,
  },
});
