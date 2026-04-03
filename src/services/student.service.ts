import { env } from "@/env";
import { cookies } from "next/headers";

export const studentService = {
	getMyProfile: async () => {
		try {
			const cookieStore = await cookies();
						const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/students/profile`, {
				headers: { Cookie: cookieStore.toString() },
				next: { tags: ["studentProfile"] },
			});

			const data = await res.json();
			return { data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},

	updateMyProfile: async (profileData: { phone?: string; address?: string; bio?: string }) => {
		try {
			const cookieStore = await cookies();
						const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/students/profile`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},
				body: JSON.stringify(profileData),
			});

			if (!res.ok) {
				const errorData = await res.json();
				return { data: null, error: { message: errorData.message || "Failed to update" } };
			}

			const data = await res.json();
			return { data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
	getMyStats: async () => {
		try {
			const cookieStore = await cookies();
						const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/students/stats`, {
				headers: { Cookie: cookieStore.toString() },
				cache: "no-store",
			});
			const json = await res.json();
			if (json.success)
				return json.data as {
					totalBookings: number;
					confirmedBookings: number;
					completedBookings: number;
					cancelledBookings: number;
					uniqueTutors: number;
				};
		} catch {}
		return null;
	},
};
