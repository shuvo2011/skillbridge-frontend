import { env } from "@/env";
import { Tutor } from "@/types/tutor.types";
import { cookies } from "next/headers";

export const tutorService = {
	getMyProfile: async () => {
		try {
			const cookieStore = await cookies();
			const cookieHeader = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join("; ");

			const res = await fetch(`${env.API_URL}/api/tutors/profile`, {
				headers: { Cookie: cookieHeader },
				next: { tags: ["tutorProfile"] },
			});

			const data = await res.json();
			return { data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},

	updateMyProfile: async (profileData: {
		bio?: string;
		qualification?: string;
		experienceYears?: number;
		phone?: string;
		address?: string;
		price?: number;
	}) => {
		try {
			const cookieStore = await cookies();
			const cookieHeader = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join("; ");

			const res = await fetch(`${env.API_URL}/api/tutors/profile`, {
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
	getAllTutors: async () => {
		try {
			const res = await fetch(`${env.API_URL}/api/tutors`, {
				next: { tags: ["tutors"] },
			});
			const data = await res.json();
			return { data: data as Tutor[], error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
	getTutorById: async (id: string) => {
		try {
			const res = await fetch(`${env.API_URL}/api/tutors/${id}`, {
				next: { tags: [`tutor-${id}`] },
			});
			if (!res.ok) return { data: null, error: { message: "Tutor not found" } };
			const data = await res.json();
			return { data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
	getMySessions: async () => {
		try {
			const cookieStore = await cookies();
			const cookieHeader = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join("; ");

			const res = await fetch(`${env.API_URL}/api/bookings`, {
				headers: { Cookie: cookieHeader },
				cache: "no-store",
				next: { tags: ["tutorSessions"] },
			});

			const json = await res.json();
			return { data: json.data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
	getTutorStats: async () => {
		try {
			const cookieStore = await cookies();
			const cookieHeader = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join("; ");

			const res = await fetch(`${env.API_URL}/api/tutors/stats`, {
				headers: { Cookie: cookieHeader },
				cache: "no-store",
			});
			const json = await res.json();
			if (json.success)
				return json.data as {
					totalSessions: number;
					confirmedSessions: number;
					completedSessions: number;
					cancelledSessions: number;
					totalRevenue: number;
					totalStudents: number;
				};
		} catch {}
		return null;
	},
};
