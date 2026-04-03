import { env } from "@/env";
import { cookies } from "next/headers";

const NEXT_PUBLIC_BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

interface GetCategoriesParams {
	search?: string;
	page?: string;
	limit?: string;
}

interface ServiceOptions {
	cache?: RequestCache;
	revalidate?: number;
}

export const categoryService = {
	getCategories: async function (params?: GetCategoriesParams, options?: ServiceOptions) {
		try {
			const url = new URL(`${NEXT_PUBLIC_BACKEND_URL}/api/categories`);

			if (params) {
				Object.entries(params).forEach(([key, value]) => {
					if (value !== undefined && value !== null && value !== "") {
						url.searchParams.append(key, value);
					}
				});
			}

			const cookieStore = await cookies();
						const config: RequestInit = {};

			if (options?.cache) {
				config.cache = options.cache;
			}

			if (options?.revalidate) {
				config.next = { revalidate: options.revalidate };
			}

			config.next = { ...config.next, tags: ["categoryItems"] };

			const res = await fetch(url.toString(), {
				...config,
				headers: {
					Cookie: cookieStore.toString(),
				},
			});

			const data = await res.json();
			return { data: data, error: null };
		} catch (err) {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},

	createCategory: async (categoryData: { name: string; status: string }) => {
		try {
			const cookieStore = await cookies();

						const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},
				body: JSON.stringify(categoryData),
			});

			if (!res.ok) {
				const errorData = await res.json();

				return {
					data: null,
					error: { message: errorData.message || errorData.error || "Category not created" },
				};
			}

			const data = await res.json();
			return { data: data, error: null };
		} catch (err) {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
	updateCategory: async (id: string, categoryData: { name: string; status: string }) => {
		try {
			const cookieStore = await cookies();
						const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/categories/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},
				body: JSON.stringify(categoryData),
			});

			if (!res.ok) {
				const errorData = await res.json();
				return {
					data: null,
					error: { message: errorData.message || "Category not updated" },
				};
			}

			const data = await res.json();
			return { data: data, error: null };
		} catch (err) {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
	deleteCategory: async (id: string) => {
		try {
			const cookieStore = await cookies();
						const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/categories/${id}`, {
				method: "DELETE",
				headers: {
					Cookie: cookieStore.toString(),
				},
			});

			if (!res.ok) {
				const errorData = await res.json();
				return {
					data: null,
					error: { message: errorData.message || "Category not deleted" },
				};
			}

			return { data: true, error: null };
		} catch (err) {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
};
