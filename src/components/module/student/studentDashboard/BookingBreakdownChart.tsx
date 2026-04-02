"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
	confirmed: number;
	completed: number;
	cancelled: number;
}

const COLORS = [
	{ key: "Confirmed", color: "#4F46E5" },
	{ key: "Completed", color: "#10B981" },
	{ key: "Cancelled", color: "#EF4444" },
];

export function BookingBreakdownChart({ confirmed, completed, cancelled }: Props) {
	const data = [
		{ name: "Confirmed", value: confirmed },
		{ name: "Completed", value: completed },
		{ name: "Cancelled", value: cancelled },
	].filter((d) => d.value > 0);

	const total = confirmed + completed + cancelled;

	if (total === 0) {
		return (
			<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-center h-64 text-sm text-gray-400">
				No booking data yet
			</div>
		);
	}

	return (
		<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
			<h2 className="text-base font-semibold text-gray-800 mb-1">Booking Breakdown</h2>
			<p className="text-xs text-gray-400 mb-4">Distribution of your bookings by status</p>

			<div className="flex flex-col sm:flex-row items-center gap-6">
				<div className="w-full sm:w-64 h-56">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
								{data.map((entry) => {
									const color = COLORS.find((c) => c.key === entry.name)?.color ?? "#ccc";
									return <Cell key={entry.name} fill={color} stroke="none" />;
								})}
							</Pie>
							<Tooltip
								formatter={(value: number, name: string) => [value, name]}
								contentStyle={{
									borderRadius: "12px",
									border: "1px solid #f0f0f0",
									fontSize: "13px",
									boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
								}}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>

				<div className="flex flex-col gap-3 flex-1">
					{COLORS.map(({ key, color }) => {
						const val = data.find((d) => d.name === key)?.value ?? 0;
						const pct = total > 0 ? Math.round((val / total) * 100) : 0;
						return (
							<div key={key}>
								<div className="flex items-center justify-between mb-1">
									<div className="flex items-center gap-2">
										<span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: color }} />
										<span className="text-sm text-gray-600">{key}</span>
									</div>
									<span className="text-sm font-semibold text-gray-800">
										{val} <span className="text-xs font-normal text-gray-400">({pct}%)</span>
									</span>
								</div>
								<div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
									<div
										className="h-full rounded-full transition-all duration-700"
										style={{ width: `${pct}%`, background: color }}
									/>
								</div>
							</div>
						);
					})}

					<div className="mt-2 pt-3 border-t border-gray-100 flex justify-between">
						<span className="text-xs text-gray-400">Total Bookings</span>
						<span className="text-sm font-bold text-gray-800">{total}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
