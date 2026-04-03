import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ? process.env.NEXT_PUBLIC_BACKEND_URL : "/api/auth",
	fetchOptions: { credentials: "include" },
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
		{
			id: "next-cookies-request",
			fetchPlugins: [
				{
					id: "next-cookies-request-plugin",
					name: "next-cookies-request-plugin",
					hooks: {
						async onRequest(ctx) {
							if (typeof window === "undefined") {
								const { cookies } = await import("next/headers");
								const cookieStore = await cookies();
								ctx.headers.set("cookie", cookieStore.toString());
							}
						},
					},
				},
			],
		},
	],
});
