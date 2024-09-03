/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/TDNHD7NJjE",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
