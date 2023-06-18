/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/comatch-7fbe0.appspot.com/**",
      },
    ],
  },
};

module.exports = nextConfig;
