import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userService = {
	getSession: async function () {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${AUTH_URL}/get-session`, {
				method: "GET",
				headers: {
					Cookie: cookieStore.toString(),
				},
				cache: "no-store",
			});

			if (!res.ok) {
				return { data: null, error: "Failed to fetch session" };
			}

			const session = await res.json();
			return { data: session, error: null };
		} catch (error) {
			return { data: null, error: "Something went wrong" };
		}
	},
};
