/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/lend', destination: '/invest', permanent: true },
    ]
  },
}

export default nextConfig;
