import { env } from "@/env";
import { cookies } from "next/headers";

export const adminService = {
	getAllUsers: async (params?: { search?: string; role?: string }) => {
		try {
			const cookieStore = await cookies();
			const url = new URL(`${env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users`);
			if (params?.search) url.searchParams.append("search", params.search);
			if (params?.role) url.searchParams.append("role", params.role);

			const res = await fetch(url.toString(), {
				headers: { Cookie: cookieStore.toString() },
				next: { tags: ["adminUsers"] },
			});

			const data = await res.json();
			return { data: data.data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},

	updateUserStatus: async (id: string, banned: boolean, banReason?: string) => {
		try {
			const cookieStore = await cookies();
			const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json", Cookie: cookieStore.toString() },
				body: JSON.stringify({ banned, banReason }),
			});

			const data = await res.json();
			if (!res.ok) return { data: null, error: { message: data.message || "Failed" } };
			return { data: data.data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
	getAllBookings: async (params?: { search?: string; status?: string }) => {
		try {
			const cookieStore = await cookies();
			const url = new URL(`${env.NEXT_PUBLIC_BACKEND_URL}/api/admin/bookings`);
			if (params?.search) url.searchParams.append("search", params.search);
			if (params?.status) url.searchParams.append("status", params.status);

			const res = await fetch(url.toString(), {
				headers: { Cookie: cookieStore.toString() },
				next: { tags: ["adminBookings"] },
			});

			const data = await res.json();
			return { data: data.data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
	getStats: async () => {
		try {
			const cookieStore = await cookies();
			const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/admin/stats`, {
				headers: { Cookie: cookieStore.toString() },
				next: { tags: ["adminStats"] },
			});

			const data = await res.json();
			return { data: data.data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
	getBookingTrends: async () => {
		try {
			const cookieStore = await cookies();
			const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/admin/booking-trends`, {
				headers: { Cookie: cookieStore.toString() },
				next: { tags: ["bookingTrends"] },
			});

			const data = await res.json();
			return { data: data.data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
	toggleTutorFeatured: async (tutorProfileId: string) => {
		try {
			const cookieStore = await cookies();
			const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/tutors/${tutorProfileId}/featured`, {
				method: "PATCH",
				headers: { Cookie: cookieStore.toString() },
			});

			const data = await res.json();
			if (!res.ok) return { data: null, error: { message: data.message || "Failed" } };
			return { data: data.data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
};
