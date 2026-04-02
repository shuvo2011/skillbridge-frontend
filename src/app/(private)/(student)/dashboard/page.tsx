import { StatsGrid } from "@/components/module/student/studentDashboard/StatsGrid";

export default async function DashboardPage() {
	return (
		<div className="p-6 max-w-6xl mx-auto">
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
				<p className="text-sm text-gray-500 mt-1">Welcome back! Here's an overview of your learning activity.</p>
			</div>
			<StatsGrid />
		</div>
	);
}
