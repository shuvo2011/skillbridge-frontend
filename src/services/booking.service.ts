import { env } from "@/env";
import { cookies } from "next/headers";

export const studentBookingService = {
	getMyBookings: async () => {
		try {
			const cookieStore = await cookies();
						const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`, {
				headers: { Cookie: cookieStore.toString() },
				next: { tags: ["studentBookings"] },
			});

			const json = await res.json();
			return { data: json.data, error: null };
		} catch {
			return { data: null, error: { message: "Something Went Wrong" } };
		}
	},
};
