import { studentBookingService } from "@/services/booking.service";
import StudentBookingsClient from "@/components/module/student/studentBookings/student-bookings-client";

export default async function StudentBookingPage() {
	const { data } = await studentBookingService.getMyBookings();

	return <StudentBookingsClient bookings={data ?? []} />;
}
