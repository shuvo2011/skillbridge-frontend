// actions/booking.action.ts
"use server";

import { cookies } from "next/headers";
import { env } from "@/env";
import { revalidateTag } from "next/cache";

export const createBooking = async (data: { availabilityId: string; sessionDate: string; categoryId: string }) => {
	try {
		const cookieStore = await cookies();
		const cookieHeader = cookieStore
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join("; ");

		const res = await fetch(`${env.API_URL}/api/bookings`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieHeader,
			},
			body: JSON.stringify(data),
		});

		const resData = await res.json();

		if (!res.ok) {
			return { data: null, error: { message: resData.message || "Booking failed" } };
		}

		revalidateTag("myBookings", "max");
		return { data: resData.data, error: null };
	} catch {
		return { data: null, error: { message: "Something Went Wrong" } };
	}
};
export const cancelBookingAction = async (bookingId: string) => {
	try {
		const cookieStore = await cookies();
		const cookieHeader = cookieStore
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join("; ");

		const res = await fetch(`${env.API_URL}/api/bookings/${bookingId}/cancel`, {
			method: "PATCH",
			headers: { Cookie: cookieHeader },
		});

		const json = await res.json();

		if (!res.ok) {
			return { success: false, message: json.message || "Failed to cancel booking" };
		}

		revalidateTag("studentBookings", "max");
		return { success: true, message: "Booking cancelled successfully" };
	} catch {
		return { success: false, message: "Something went wrong" };
	}
};

export const completeSessionAction = async (sessionId: string) => {
	try {
		const cookieStore = await cookies();
		const cookieHeader = cookieStore
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join("; ");

		const res = await fetch(`${env.API_URL}/api/bookings/${sessionId}/complete`, {
			method: "PATCH",
			headers: { Cookie: cookieHeader },
		});

		const json = await res.json();

		if (!res.ok) {
			return { success: false, message: json.message || "Failed to complete session" };
		}

		revalidateTag("tutorSessions", "max");
		return { success: true, message: "Session marked as completed" };
	} catch {
		return { success: false, message: "Something went wrong" };
	}
};
