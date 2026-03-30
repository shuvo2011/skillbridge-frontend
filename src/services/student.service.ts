// services/student.service.ts
import { env } from "@/env";
import { cookies } from "next/headers";

export const studentService = {
	getMyProfile: async () => {
		try {
			const cookieStore = await cookies();
			const cookieHeader = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join("; ");

			const res = await fetch(`${env.API_URL}/api/students/profile`, {
				headers: { Cookie: cookieHeader },
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
			const cookieHeader = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join("; ");

			const res = await fetch(`${env.API_URL}/api/students/profile`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieHeader,
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
};
