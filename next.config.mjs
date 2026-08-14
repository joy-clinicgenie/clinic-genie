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
      {
        source: '/clinic-specialties/aquatic-physio',
        destination: '/portfolio/aquaphysio',
        permanent: true,
      },
      {
        source: '/clinic-specialties/endocrinology',
        destination: '/portfolio/cedar-endocrine-clinic',
        permanent: true,
      },
      {
        source: '/clinic-specialties/dermatology',
        destination: '/portfolio/msdc',
        permanent: true,
      },
      {
        source: '/clinic-specialties/dental',
        destination: '/portfolio/singapore-dental-implant-centre',
        permanent: true,
      },
      {
        source: '/clinic-specialties/neurology',
        destination: '/portfolio/singapore-brain-spine-nerves',
        permanent: true,
      },
      {
        source: '/clinic-specialties/cardiology',
        destination: '/portfolio/sunrise-heart',
        permanent: true,
      },
      {
        source: '/clinic-specialties/acne',
        destination: '/portfolio/the-acne-clinic',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
