import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // better-sqlite3 is a native module and must be bundled as external
  // in both the server runtime and when using Turbopack.
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
