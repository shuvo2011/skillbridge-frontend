// services/tutor-category.service.ts
import { env } from "@/env";
import { cookies } from "next/headers";

export const tutorCategoryService = {
	getMyCategories: async () => {
		try {
			const cookieStore = await cookies();
			const cookieHeader = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join("; ");

			const res = await fetch(`${env.API_URL}/api/tutor/categories`, {
				headers: { Cookie: cookieHeader },
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
			const cookieHeader = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join("; ");

			const res = await fetch(`${env.API_URL}/api/tutor/categories`, {
				method: "POST",
				headers: { "Content-Type": "application/json", Cookie: cookieHeader },
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
			const cookieHeader = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join("; ");

			const res = await fetch(`${env.API_URL}/api/tutor/categories/${id}`, {
				method: "DELETE",
				headers: { Cookie: cookieHeader },
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
