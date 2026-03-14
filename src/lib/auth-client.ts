import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: process.env.API_URL ?? "http://localhost:5050",
	plugins: [
		inferAdditionalFields({
			user: {
				role: { type: "string" },
				status: { type: "string" },
				banned: { type: "boolean" },
				banReason: { type: "string" },
				banExpires: { type: "date" },
			},
		}),
	],
});
