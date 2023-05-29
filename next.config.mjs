import nextMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },

  images: {
    domains: ["cdn.discordapp.com"],
  },
};

const withMDX = nextMDX();

export default withMDX(nextConfig);
