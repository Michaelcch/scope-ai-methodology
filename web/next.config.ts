import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@ai-sdk/react", "ai"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
