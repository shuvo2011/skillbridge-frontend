import { env } from "@/env";
import { cookies } from "next/headers";

export const studentBookingService = {
	getMyBookings: async () => {
		try {
			const cookieStore = await cookies();
			const cookieHeader = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join("; ");

			const res = await fetch(`${env.API_URL}/api/bookings`, {
				headers: { Cookie: cookieHeader },
				next: { tags: ["studentBookings"] },
			});

			const json = await res.json();
			return { data: json.data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
};
