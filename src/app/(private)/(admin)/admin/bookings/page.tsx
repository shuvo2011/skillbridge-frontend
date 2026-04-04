import { AdminBookingsClient } from "@/components/module/admin/bookings/admin-bookings-client";
import { adminService } from "@/services/admin.service";
export const metadata = { title: "Bookings - Admin | SkillBridge" };
export default async function AdminBookingPage() {
	const res = await adminService.getAllBookings();
	const bookings = res.data || [];

	return <AdminBookingsClient bookings={bookings} />;
}
