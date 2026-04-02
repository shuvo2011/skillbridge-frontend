import { LucideIcon } from "lucide-react";

interface StatCardProps {
	label: string;
	value: string | number;
	icon: LucideIcon;
	bg: string;
	iconColor: string;
	valueColor: string;
}

export function StatCard({ label, value, icon: Icon, bg, iconColor, valueColor }: StatCardProps) {
	return (
		<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
			<div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
				<Icon size={18} className={iconColor} />
			</div>
			<div>
				<p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
				<p className="text-xs text-gray-500 mt-0.5 leading-tight">{label}</p>
			</div>
		</div>
	);
}
