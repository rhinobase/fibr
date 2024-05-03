import { composePlugins, withNx } from "@nx/next";

import pk from "../../package.json" assert { type: "json" };

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  experimental: {
    optimizePackageImports: ["@rafty/ui"],
  },
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_VERSION: pk.version,
  },
};

const plugins = [withNx];

export default composePlugins(...plugins)(nextConfig);
