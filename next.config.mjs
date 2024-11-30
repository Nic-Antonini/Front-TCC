/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '172.20.10.13',
                port: '3333', // A porta do seu servidor back-end
                pathname: '/public/upload/**',
            },
        ],
    },
};

export default nextConfig;
