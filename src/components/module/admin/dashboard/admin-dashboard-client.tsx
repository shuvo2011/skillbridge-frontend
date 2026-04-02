"use client";

import {
	Users,
	GraduationCap,
	BookOpen,
	CalendarDays,
	CheckCircle2,
	XCircle,
	Clock,
	Tag,
	TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingChart } from "./booking-chart";

const BRAND = "#210095";

type Stats = {
	totalStudents: number;
	totalTutors: number;
	totalUsers: number;
	totalBookings: number;
	confirmedBookings: number;
	completedBookings: number;
	cancelledBookings: number;
	totalCategories: number;
	totalRevenue: number;
};

type TrendData = {
	month: string;
	confirmed: number;
	completed: number;
	cancelled: number;
};

const StatCard = ({
	title,
	value,
	icon: Icon,
	color,
	description,
}: {
	title: string;
	value: string | number;
	icon: any;
	color: string;
	description?: string;
}) => (
	<Card className="border-gray-100 shadow-sm">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
			<div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
				<Icon size={17} style={{ color }} />
			</div>
		</CardHeader>
		<CardContent>
			<p className="text-2xl font-bold text-gray-900">{value}</p>
			{description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
		</CardContent>
	</Card>
);

export function AdminDashboardClient({ stats, trends }: { stats: Stats | null; trends: TrendData[] }) {
	if (!stats)
		return (
			<div className="flex items-center justify-center h-40">
				<p className="text-sm text-gray-400">Failed to load statistics</p>
			</div>
		);

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
				<p className="text-sm text-gray-500 mt-0.5">Platform overview and statistics</p>
			</div>

			<div
				className="rounded-2xl p-6 text-white flex items-center justify-between"
				style={{ background: `linear-gradient(135deg, ${BRAND}, #4f35c2)` }}
			>
				<div>
					<p className="text-sm font-medium opacity-80">Total Revenue</p>
					<p className="text-3xl font-bold mt-1">৳ {stats.totalRevenue.toLocaleString()}</p>
					<p className="text-xs opacity-60 mt-1">From completed sessions</p>
				</div>
				<div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/15">
					<TrendingUp size={26} className="text-white" />
				</div>
			</div>

			<div>
				<h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Users</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<StatCard
						title="Total Users"
						value={stats.totalUsers}
						icon={Users}
						color={BRAND}
						description="Students + Tutors"
					/>
					<StatCard
						title="Students"
						value={stats.totalStudents}
						icon={GraduationCap}
						color="#0ea5e9"
						description="Registered students"
					/>
					<StatCard
						title="Tutors"
						value={stats.totalTutors}
						icon={BookOpen}
						color="#8b5cf6"
						description="Registered tutors"
					/>
				</div>
			</div>

			<BookingChart data={trends} />

			<div>
				<h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Bookings</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<StatCard title="Total Bookings" value={stats.totalBookings} icon={CalendarDays} color={BRAND} />
					<StatCard title="Confirmed" value={stats.confirmedBookings} icon={Clock} color="#f59e0b" />
					<StatCard title="Completed" value={stats.completedBookings} icon={CheckCircle2} color="#10b981" />
					<StatCard title="Cancelled" value={stats.cancelledBookings} icon={XCircle} color="#ef4444" />
				</div>
			</div>

			<div>
				<h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Other</h2>
				<div className="grid grid-cols-1 gap-4">
					<StatCard
						title="Categories"
						value={stats.totalCategories}
						icon={Tag}
						color="#06b6d4"
						description="Active categories"
					/>
				</div>
			</div>
		</div>
	);
}
