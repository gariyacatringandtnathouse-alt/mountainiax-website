/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // builds plain static files into the "out" folder
  images: { unoptimized: true },
};

module.exports = nextConfig;
