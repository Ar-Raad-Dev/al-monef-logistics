
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* Next.js configuration options */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
