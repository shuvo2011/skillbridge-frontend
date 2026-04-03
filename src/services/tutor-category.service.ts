import { env } from "@/env";
import { cookies } from "next/headers";

export const tutorCategoryService = {
	getMyCategories: async () => {
		try {
			const cookieStore = await cookies();
						const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/tutor/categories`, {
				headers: { Cookie: cookieStore.toString() },
				next: { tags: ["tutorCategories"] },
			});

			const data = await res.json();
			return { data: data.data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},

	addCategory: async (categoryId: string) => {
		try {
			const cookieStore = await cookies();
						const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/tutor/categories`, {
				method: "POST",
				headers: { "Content-Type": "application/json", Cookie: cookieStore.toString() },
				body: JSON.stringify({ categoryId }),
			});

			const data = await res.json();
			if (!res.ok) return { data: null, error: { message: data.message || "Failed to add" } };
			return { data: data.data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},

	removeCategory: async (id: string) => {
		try {
			const cookieStore = await cookies();
						const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/tutor/categories/${id}`, {
				method: "DELETE",
				headers: { Cookie: cookieStore.toString() },
			});

			if (!res.ok) {
				const data = await res.json();
				return { data: null, error: { message: data.message || "Failed to remove" } };
			}
			return { data: true, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
};
