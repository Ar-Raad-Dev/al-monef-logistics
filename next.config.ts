
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* Next.js configuration options */
  images: {
    // No remote patterns needed if all images are local
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'placehold.co',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
};

export default nextConfig;
