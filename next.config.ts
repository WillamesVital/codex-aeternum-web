import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Desabilitar Turbopack em produção devido a timeouts na Vercel */
  experimental: {
    turbopack: false,
  },
};

export default nextConfig;
