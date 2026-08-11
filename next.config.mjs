/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/services/core-pillars',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/specialty-hub',
        destination: '/clinic-specialties',
        permanent: true,
      },
      {
        // Page slugs only — do not catch /specialty-hub/*.png assets
        source: '/specialty-hub/:slug([^/.]+)',
        destination: '/clinic-specialties/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
