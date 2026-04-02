// components/module/admin/dashboard/booking-chart.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BRAND = "#210095";

type TrendData = {
	month: string;
	confirmed: number;
	completed: number;
	cancelled: number;
};

export function BookingChart({ data }: { data: TrendData[] }) {
	return (
		<Card className="border-gray-100 shadow-sm">
			<CardHeader>
				<CardTitle className="text-base font-semibold text-gray-800">Booking Trends</CardTitle>
				<p className="text-xs text-gray-400">Last 6 months</p>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={280}>
					<AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
						<defs>
							<linearGradient id="confirmedGrad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={BRAND} stopOpacity={0.2} />
								<stop offset="95%" stopColor={BRAND} stopOpacity={0} />
							</linearGradient>
							<linearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
								<stop offset="95%" stopColor="#10b981" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="cancelledGrad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
								<stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
						<XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
						<YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
						<Tooltip
							contentStyle={{
								borderRadius: "12px",
								border: "1px solid #e5e7eb",
								fontSize: "12px",
								boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
							}}
						/>
						<Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
						<Area
							type="monotone"
							dataKey="confirmed"
							name="Confirmed"
							stroke={BRAND}
							strokeWidth={2}
							fill="url(#confirmedGrad)"
						/>
						<Area
							type="monotone"
							dataKey="completed"
							name="Completed"
							stroke="#10b981"
							strokeWidth={2}
							fill="url(#completedGrad)"
						/>
						<Area
							type="monotone"
							dataKey="cancelled"
							name="Cancelled"
							stroke="#ef4444"
							strokeWidth={2}
							fill="url(#cancelledGrad)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
