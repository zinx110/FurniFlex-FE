/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https", // Or 'http' if that's your case
                hostname: "localhost",
                port: "44344", // Port number where your API is running
                pathname: "*", // Adjust the pathname to match your API route
            },
        ],
    },
};

export default nextConfig;
