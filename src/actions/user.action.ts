"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const updateUserInfo = async (data: { name: string; email: string }) => {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			const errorData = await res.json();
			return { data: null, error: { message: errorData.message || "Failed to update" } };
		}

		const resData = await res.json();
		revalidateTag("userSession", "layout");
		return { data: resData, error: null };
	} catch {
		return { data: null, error: { message: "Something Went Wrong" } };
	}
};

export const changePassword = async (data: { currentPassword: string; newPassword: string }) => {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/change-password`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
				Origin: process.env.NEXT_PUBLIC_APP_URL!,
			},
			body: JSON.stringify({
				currentPassword: data.currentPassword,
				newPassword: data.newPassword,
				revokeOtherSessions: false,
			}),
		});

		if (!res.ok) {
			const errorData = await res.json();
			return { data: null, error: { message: errorData.message || "Failed to update password" } };
		}

		const resData = await res.json();
		return { data: resData, error: null };
	} catch {
		return { data: null, error: { message: "Something Went Wrong" } };
	}
};
