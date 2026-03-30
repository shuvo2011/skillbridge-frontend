// services/availability.service.ts
import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const availabilityService = {
	getAvailabilities: async (params?: { page?: string; search?: string }) => {
		try {
			const cookieStore = await cookies();
			const cookieHeader = cookieStore
				.getAll()
				.map((cookie) => `${cookie.name}=${cookie.value}`)
				.join("; ");

			const url = new URL(`${API_URL}/api/tutor/availability`);
			if (params?.page) url.searchParams.append("page", params.page);
			if (params?.search) url.searchParams.append("search", params.search);

			const res = await fetch(url.toString(), {
				headers: { Cookie: cookieHeader },
				next: { tags: ["availabilityItems"] },
			});

			if (!res.ok) {
				const errorData = await res.json();
				return { data: null, error: { message: errorData.message || "Failed to fetch" } };
			}

			const data = await res.json();
			return { data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},

	createAvailability: async (payload: { dayOfWeek: string; availableFrom: string; availableTo: string }) => {
		try {
			const cookieStore = await cookies();
			const cookieHeader = cookieStore
				.getAll()
				.map((cookie) => `${cookie.name}=${cookie.value}`)
				.join("; ");

			const res = await fetch(`${API_URL}/api/tutor/availability`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieHeader,
				},
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const errorData = await res.json();
				return { data: null, error: { message: errorData.message || "Failed to create" } };
			}

			const data = await res.json();
			return { data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},

	deleteAvailability: async (id: string) => {
		try {
			const cookieStore = await cookies();
			const cookieHeader = cookieStore
				.getAll()
				.map((cookie) => `${cookie.name}=${cookie.value}`)
				.join("; ");

			const res = await fetch(`${API_URL}/api/tutor/availability/${id}`, {
				method: "DELETE",
				headers: { Cookie: cookieHeader },
			});

			if (!res.ok) {
				const errorData = await res.json();
				return { data: null, error: { message: errorData.message || "Failed to delete" } };
			}

			return { data: true, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},

	updateAvailability: async (
		id: string,
		payload: { dayOfWeek: string; availableFrom: string; availableTo: string },
	) => {
		try {
			const cookieStore = await cookies();
			const cookieHeader = cookieStore
				.getAll()
				.map((cookie) => `${cookie.name}=${cookie.value}`)
				.join("; ");

			const res = await fetch(`${API_URL}/api/tutor/availability/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieHeader,
				},
				body: JSON.stringify(payload),
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
