import { BookOpen, CheckCircle, XCircle, Clock, DollarSign, Users } from "lucide-react";
import { StatCard } from "./StatCard";
import { SessionBreakdownChart } from "./SessionBreakdownChart";
import { tutorService } from "@/services/tutor.service";

export async function StatsGrid() {
	const stats = await tutorService.getTutorStats();

	if (stats === null) {
		return (
			<div className="bg-red-50 border border-red-100 rounded-xl px-5 py-4 text-sm text-red-500">
				Failed to load statistics. Please try again later.
			</div>
		);
	}

	const cards = [
		{
			label: "Total Sessions",
			value: stats.totalSessions,
			icon: BookOpen,
			bg: "bg-indigo-50",
			iconColor: "text-indigo-600",
			valueColor: "text-indigo-700",
		},
		{
			label: "Confirmed Sessions",
			value: stats.confirmedSessions,
			icon: Clock,
			bg: "bg-blue-50",
			iconColor: "text-blue-600",
			valueColor: "text-blue-700",
		},
		{
			label: "Completed Sessions",
			value: stats.completedSessions,
			icon: CheckCircle,
			bg: "bg-emerald-50",
			iconColor: "text-emerald-600",
			valueColor: "text-emerald-700",
		},
		{
			label: "Cancelled Sessions",
			value: stats.cancelledSessions,
			icon: XCircle,
			bg: "bg-red-50",
			iconColor: "text-red-500",
			valueColor: "text-red-600",
		},
		{
			label: "Total Revenue",
			value: `$${stats.totalRevenue}`,
			icon: DollarSign,
			bg: "bg-amber-50",
			iconColor: "text-amber-600",
			valueColor: "text-amber-700",
		},
		{
			label: "Total Students",
			value: stats.totalStudents,
			icon: Users,
			bg: "bg-purple-50",
			iconColor: "text-purple-600",
			valueColor: "text-purple-700",
		},
	];

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
				{cards.map((card) => (
					<StatCard key={card.label} {...card} />
				))}
			</div>

			<SessionBreakdownChart
				confirmed={stats.confirmedSessions}
				completed={stats.completedSessions}
				cancelled={stats.cancelledSessions}
			/>
		</div>
	);
}
