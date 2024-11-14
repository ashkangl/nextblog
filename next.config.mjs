/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
        {
        source: '/(.*)',
        headers: [
        {
        key: 'Cache-Control',
        value: 's-maxage=31536000, stale-while-revalidate',
        },
        ],
        },
        ];
        },
};

export default nextConfig;
