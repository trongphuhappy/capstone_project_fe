import type { NextConfig } from "next";
import NextI18NextConfig from "./next-i18next.config";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: NextI18NextConfig.i18n,
};

export default nextConfig;
