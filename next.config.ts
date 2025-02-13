import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
  i18n: { locales: ["pt-BR", "en-US"], defaultLocale: "en-US" },
};

export default nextConfig;
