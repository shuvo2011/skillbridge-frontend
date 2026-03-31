// lib/get-session.ts
import { cookies } from "next/headers";
import { env } from "@/env";

type Session = {
	user: {
		id: string;
		name: string;
		email: string;
		role: string;
		image?: string | null;
	};
} | null;

export const getSession = async (): Promise<Session> => {
	const cookieStore = await cookies();
	const cookieHeader = cookieStore
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join("; ");

	try {
		const res = await fetch(`${env.AUTH_URL}/get-session`, {
			headers: { Cookie: cookieHeader },
		});

		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
};
