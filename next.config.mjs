/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.0.17',
                port: '3333', // A porta do seu servidor back-end
                pathname: '/public/upload/**',
            },
        ],
    },
};

export default nextConfig;
