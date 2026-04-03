import { env } from "@/env";
import { cookies } from "next/headers";

const NEXT_PUBLIC_BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export const availabilityService = {
	getAvailabilities: async (params?: { page?: string; search?: string }) => {
		try {
			const cookieStore = await cookies();
						const url = new URL(`${NEXT_PUBLIC_BACKEND_URL}/api/tutor/availability`);
			if (params?.page) url.searchParams.append("page", params.page);
			if (params?.search) url.searchParams.append("search", params.search);

			const res = await fetch(url.toString(), {
				headers: { Cookie: cookieStore.toString() },
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
						const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/tutor/availability`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
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
						const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/tutor/availability/${id}`, {
				method: "DELETE",
				headers: { Cookie: cookieStore.toString() },
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
						const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/tutor/availability/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
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
