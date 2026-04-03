import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
	server: {
		FRONTEND_URL: z.string().url(),
		API_URL: z.string().url(),
		AUTH_URL: z.string().url(),
		CLOUDINARY_CLOUD_NAME: z.string(),
		CLOUDINARY_API_KEY: z.string(),
		CLOUDINARY_API_SECRET: z.string(),
	},
	client: {
		NEXT_PUBLIC_BACKEND_URL: z.string().url(),
		NEXT_PUBLIC_APP_URL: z.string().url(),
	},
	runtimeEnv: {
		FRONTEND_URL: process.env.FRONTEND_URL,
		API_URL: process.env.API_URL,
		AUTH_URL: process.env.AUTH_URL,
		CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
		CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
		CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
		NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	},
});
