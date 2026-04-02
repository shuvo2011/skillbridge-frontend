import { BookOpen, CheckCircle, XCircle, Clock, Users } from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { BookingBreakdownChart } from "./BookingBreakdownChart";

type Stats = {
	totalBookings: number;
	confirmedBookings: number;
	completedBookings: number;
	cancelledBookings: number;
	uniqueTutors: number;
} | null;

export function StatsGrid({ stats }: { stats: Stats }) {
	if (stats === null) {
		return (
			<div className="bg-red-50 border border-red-100 rounded-xl px-5 py-4 text-sm text-red-500">
				Failed to load statistics. Please try again later.
			</div>
		);
	}

	const cards = [
		{
			label: "Total Bookings",
			value: stats.totalBookings,
			icon: BookOpen,
			bg: "bg-indigo-50",
			iconColor: "text-indigo-600",
			valueColor: "text-indigo-700",
		},
		{
			label: "Confirmed",
			value: stats.confirmedBookings,
			icon: Clock,
			bg: "bg-blue-50",
			iconColor: "text-blue-600",
			valueColor: "text-blue-700",
		},
		{
			label: "Completed",
			value: stats.completedBookings,
			icon: CheckCircle,
			bg: "bg-emerald-50",
			iconColor: "text-emerald-600",
			valueColor: "text-emerald-700",
		},
		{
			label: "Cancelled",
			value: stats.cancelledBookings,
			icon: XCircle,
			bg: "bg-red-50",
			iconColor: "text-red-500",
			valueColor: "text-red-600",
		},
		{
			label: "Tutors Booked",
			value: stats.uniqueTutors,
			icon: Users,
			bg: "bg-purple-50",
			iconColor: "text-purple-600",
			valueColor: "text-purple-700",
		},
	];

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
				{cards.map((card) => (
					<StatCard key={card.label} {...card} />
				))}
			</div>
			<BookingBreakdownChart
				confirmed={stats.confirmedBookings}
				completed={stats.completedBookings}
				cancelled={stats.cancelledBookings}
			/>
		</div>
	);
}
