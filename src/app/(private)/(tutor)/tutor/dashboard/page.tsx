import { getSession } from "@/lib/get-session";
import { ShieldX, Mail } from "lucide-react";
import { StatsGrid } from "@/components/module/tutor/tutorDashboard/StatsGrid";

export default async function TutorDashboardPage() {
	const session = await getSession();

	if (session?.user?.banned) {
		return (
			<div className="flex items-center justify-center min-h-[60vh] px-4">
				<div className="bg-white rounded-2xl border border-red-100 shadow-sm p-8 max-w-md w-full text-center">
					<div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
						<ShieldX size={28} className="text-red-500" />
					</div>
					<h1 className="text-xl font-bold text-gray-900 mb-2">Account Banned</h1>
					<p className="text-sm text-gray-500 mb-6 leading-relaxed">
						Your account has been suspended. Please contact the site administrator for more information.
					</p>
					{session.user.banReason && (
						<div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6 text-left">
							<p className="text-xs font-semibold text-red-600 mb-1">Reason:</p>
							<p className="text-sm text-red-500">{session.user.banReason}</p>
						</div>
					)}

					<a
						href="mailto:admin@skillbridge.com"
						className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
						style={{ background: "#210095" }}
					>
						<Mail size={14} /> Contact Admin
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 max-w-6xl mx-auto">
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
				<p className="text-sm text-gray-500 mt-1">Welcome back! Here's an overview of your tutoring activity.</p>
			</div>
			<StatsGrid />
		</div>
	);
}
