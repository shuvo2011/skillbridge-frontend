"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const createBooking = async (data: { availabilityId: string; sessionDate: string; categoryId: string }) => {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify(data),
		});

		const resData = await res.json();

		if (!res.ok) {
			return { data: null, error: { message: resData.message || "Booking failed" } };
		}

		revalidateTag("myBookings", "layout");
		return { data: resData.data, error: null };
	} catch {
		return { data: null, error: { message: "Something Went Wrong" } };
	}
};

export const cancelBookingAction = async (bookingId: string) => {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${bookingId}/cancel`, {
			method: "PATCH",
			headers: { Cookie: cookieStore.toString() },
		});

		const json = await res.json();

		if (!res.ok) {
			return { success: false, message: json.message || "Failed to cancel booking" };
		}

		revalidateTag("studentBookings", "layout");
		return { success: true, message: "Booking cancelled successfully" };
	} catch {
		return { success: false, message: "Something went wrong" };
	}
};

export const completeSessionAction = async (sessionId: string) => {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${sessionId}/complete`, {
			method: "PATCH",
			headers: { Cookie: cookieStore.toString() },
		});

		const json = await res.json();

		if (!res.ok) {
			return { success: false, message: json.message || "Failed to complete session" };
		}

		revalidateTag("tutorSessions", "layout");
		return { success: true, message: "Session marked as completed" };
	} catch {
		return { success: false, message: "Something went wrong" };
	}
};
