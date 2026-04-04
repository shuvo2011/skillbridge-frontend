import { StatsGrid } from "@/components/module/student/studentDashboard/StatsGrid";
import { studentService } from "@/services/student.service";
export const metadata = { title: "Student Dashboard - SkillBridge" };
export default async function DashboardPage() {
	const stats = await studentService.getMyStats();
	return (
		<div className="p-6 max-w-6xl mx-auto">
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
				<p className="text-sm text-gray-500 mt-1">Welcome back! Here's an overview of your learning activity.</p>
			</div>
			<StatsGrid stats={stats} />
		</div>
	);
}
