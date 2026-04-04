import type { NextConfig } from "next";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5050";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},

	async rewrites() {
		return [
			{
				source: "/api/auth/:path*",
				destination: `${BACKEND_URL}/api/auth/:path*`,
			},
		];
	},
};

export default nextConfig;
