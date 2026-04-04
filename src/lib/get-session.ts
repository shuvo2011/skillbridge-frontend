import { cookies } from "next/headers";

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
	console.log("getSession cookie length:", cookieStore.toString().length);
	console.log(
		"getSession cookies:",
		cookieStore.getAll().map((c) => c.name),
	);

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-session`, {
			headers: { Cookie: cookieStore.toString() },
			cache: "no-store",
		});

		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
};
