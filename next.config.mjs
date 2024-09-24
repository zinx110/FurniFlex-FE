/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '44344', // Add the correct port here
           
          },
        ],
      },
};

export default nextConfig;
