
module.exports = {
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