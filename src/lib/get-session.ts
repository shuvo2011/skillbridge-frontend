import { cookies } from "next/headers";
import { env } from "@/env";

type Session = {
	user: {
		id: string;
		name: string;
		email: string;
		role: string;
		image?: string | null;
		banned?: boolean;
		banReason?: string;
	};
} | null;

export const getSession = async (): Promise<Session> => {
	const cookieStore = await cookies();
	const allCookies = cookieStore.getAll();
	console.log(
		"getSession cookies:",
		allCookies.map((c) => c.name),
	);
	const cookieHeader = cookieStore
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join("; ");

	try {
		const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-session`, {
			headers: { Cookie: cookieHeader },
		});

		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
};
