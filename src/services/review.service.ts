"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const getReviewableBookings = async (tutorId: string) => {
	try {
		const cookieStore = await cookies();
				const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/reviewable?tutorId=${tutorId}`, {
			headers: { Cookie: cookieStore.toString() },
			cache: "no-store",
		});

		const json = await res.json();
		if (!res.ok) return { data: null, error: json.message };
		return { data: json.data, error: null };
	} catch {
		return { data: null, error: "Something went wrong" };
	}
};

export const createReview = async (bookingId: string, rating: number, reviewText: string) => {
	try {
		const cookieStore = await cookies();
				const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/reviews`, {
			method: "POST",
			headers: {
				Cookie: cookieStore.toString(),
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ bookingId, rating, reviewText }),
		});

		const json = await res.json();
		if (!res.ok) return { success: false, message: json.message };

		revalidatePath(`/tutors/[id]`, "page");
		return { success: true, message: "Review submitted successfully" };
	} catch {
		return { success: false, message: "Something went wrong" };
	}
};
