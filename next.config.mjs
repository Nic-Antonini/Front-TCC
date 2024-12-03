/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '10.67.23.6',
                port: '3333', // A porta do seu servidor back-end
                pathname: '/public/upload/**',
            },
        ],
    },
};

export default nextConfig;
