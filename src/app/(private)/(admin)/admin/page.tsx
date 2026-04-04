import { AdminDashboardClient } from "@/components/module/admin/dashboard/admin-dashboard-client";
import { adminService } from "@/services/admin.service";
export const metadata = { title: "Admin Dashboard - SkillBridge" };
export default async function AdminDashboardPage() {
	const res = await adminService.getStats();

	const [statsRes, trendsRes] = await Promise.all([adminService.getStats(), adminService.getBookingTrends()]);

	const stats = statsRes.data;
	const trends = trendsRes.data || [];
	return <AdminDashboardClient stats={stats} trends={trends} />;
}
