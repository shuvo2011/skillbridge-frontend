"use client";

import { useState } from "react";
import {
	CalendarDays,
	Clock,
	Search,
	X,
	CheckCircle2,
	XCircle,
	ChevronLeft,
	ChevronRight,
	Loader2,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { completeSessionAction } from "@/actions/booking.action";

const BRAND = "#210095";
const PER_PAGE = 10;

// ─── Types ────────────────────────────────────────────────────────────────────
type BookingStatus = "CONFIRMED" | "COMPLETED" | "CANCELLED";

type Session = {
	id: string;
	sessionDate: string;
	slotFrom: string;
	slotTo: string;
	status: BookingStatus;
	student: {
		id: string;
		user: { name: string; email: string; image?: string };
	};
	availability: {
		dayOfWeek: string;
		availableFrom: string;
		availableTo: string;
	};
	category?: { id: string; name: string };
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatTime = (time: string) => {
	const [hours, minutes] = time.split(":").map(Number);
	const period = hours >= 12 ? "PM" : "AM";
	const displayHours = hours % 12 || 12;
	return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const formatDate = (dateStr: string) =>
	new Date(dateStr).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

const STATUS_CONFIG: Record<BookingStatus, { label: string; icon: any; className: string }> = {
	CONFIRMED: { label: "Confirmed", icon: CheckCircle2, className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
	COMPLETED: { label: "Completed", icon: CheckCircle2, className: "bg-violet-50 text-violet-700 border-violet-200" },
	CANCELLED: { label: "Cancelled", icon: XCircle, className: "bg-red-50 text-red-600 border-red-200" },
};

const STATUS_FILTERS = ["All", "CONFIRMED", "COMPLETED", "CANCELLED"] as const;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TeachingSessionsClient({ sessions }: { sessions: Session[] }) {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<"All" | BookingStatus>("All");
	const [page, setPage] = useState(1);
	const [completingId, setCompletingId] = useState<string | null>(null);

	const handleComplete = async (sessionId: string) => {
		setCompletingId(sessionId);
		const result = await completeSessionAction(sessionId);
		setCompletingId(null);
		if (result.success) {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
	};

	const filtered = sessions.filter((s) => {
		const q = search.toLowerCase();
		const matchSearch =
			!q ||
			s.student.user.name.toLowerCase().includes(q) ||
			s.student.user.email.toLowerCase().includes(q) ||
			s.category?.name.toLowerCase().includes(q);
		const matchStatus = statusFilter === "All" || s.status === statusFilter;
		return matchSearch && matchStatus;
	});

	const totalPages = Math.ceil(filtered.length / PER_PAGE);
	const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

	const handleFilterChange = (val: typeof statusFilter) => {
		setStatusFilter(val);
		setPage(1);
	};

	const handleSearch = (val: string) => {
		setSearch(val);
		setPage(1);
	};

	const hasActive = !!search || statusFilter !== "All";

	return (
		<div className="space-y-5">
			{/* Page header */}
			<div>
				<h1 className="text-xl font-bold text-gray-900">Teaching Sessions</h1>
				<p className="text-sm text-gray-500 mt-0.5">
					{sessions.length} session{sessions.length !== 1 ? "s" : ""} total
				</p>
			</div>

			{/* Filter bar */}
			<div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
				<div className="flex flex-col sm:flex-row gap-3">
					{/* Search */}
					<div className="relative flex-1">
						<Search
							size={14}
							className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
						/>
						<input
							className="w-full h-9 pl-9 pr-9 rounded-lg border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 outline-none transition-all"
							onFocus={(e) => {
								e.target.style.borderColor = `${BRAND}50`;
								e.target.style.boxShadow = `0 0 0 3px ${BRAND}12`;
							}}
							onBlur={(e) => {
								e.target.style.borderColor = "";
								e.target.style.boxShadow = "";
							}}
							placeholder="Search by student name or subject..."
							value={search}
							onChange={(e) => handleSearch(e.target.value)}
						/>
						{search && (
							<button
								onClick={() => handleSearch("")}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								<X size={13} />
							</button>
						)}
					</div>

					{/* Status pills */}
					<div className="flex gap-1.5 flex-wrap items-center">
						{STATUS_FILTERS.map((s) => (
							<button
								key={s}
								onClick={() => handleFilterChange(s)}
								className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap"
								style={
									statusFilter === s
										? { background: BRAND, color: "#fff", borderColor: BRAND }
										: { background: "#fff", color: "#6b7280", borderColor: "#e5e7eb" }
								}
							>
								{s === "All" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
							</button>
						))}
						{hasActive && (
							<button
								onClick={() => {
									handleSearch("");
									handleFilterChange("All");
								}}
								className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors"
							>
								<X size={11} /> Clear
							</button>
						)}
					</div>
				</div>

				{hasActive && (
					<p className="text-xs text-gray-500">
						<span className="font-semibold text-gray-800">{filtered.length}</span> result
						{filtered.length !== 1 ? "s" : ""} found
					</p>
				)}
			</div>

			{/* Table */}
			<div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
							<TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-5 w-[220px]">
								Student
							</TableHead>
							<TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subject</TableHead>
							<TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</TableHead>
							<TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Time</TableHead>
							<TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Day</TableHead>
							<TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</TableHead>
							<TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide pr-5 text-right">
								Action
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginated.length === 0 ? (
							<TableRow>
								<TableCell colSpan={7} className="py-16 text-center">
									<div className="flex flex-col items-center gap-2">
										<div
											className="w-12 h-12 rounded-xl flex items-center justify-center"
											style={{ background: `${BRAND}10` }}
										>
											<CalendarDays size={20} style={{ color: BRAND }} />
										</div>
										<p className="font-semibold text-gray-800 text-sm">No sessions found</p>
										<p className="text-xs text-gray-400">
											{hasActive ? "Try adjusting your filters" : "You don't have any teaching sessions yet"}
										</p>
									</div>
								</TableCell>
							</TableRow>
						) : (
							paginated.map((session) => {
								const status = STATUS_CONFIG[session.status];
								const StatusIcon = status.icon;

								return (
									<TableRow key={session.id} className="hover:bg-gray-50/60 transition-colors">
										{/* Student */}
										<TableCell className="pl-5 py-3.5">
											<div className="flex items-center gap-2.5">
												{session.student.user.image ? (
													<img
														src={session.student.user.image}
														alt={session.student.user.name}
														className="w-8 h-8 rounded-lg object-cover shrink-0"
													/>
												) : (
													<div
														className="w-8 h-8 rounded-lg flex items-center justify-center text-[0.68rem] font-bold shrink-0"
														style={{ background: `${BRAND}12`, color: BRAND }}
													>
														{session.student.user.name
															.split(" ")
															.map((n) => n[0])
															.join("")
															.slice(0, 2)
															.toUpperCase()}
													</div>
												)}
												<div className="min-w-0">
													<p className="text-sm font-semibold text-gray-800 leading-tight truncate">
														{session.student.user.name}
													</p>
													<p className="text-[0.72rem] text-gray-400 truncate">{session.student.user.email}</p>
												</div>
											</div>
										</TableCell>

										{/* Subject */}
										<TableCell className="py-3.5">
											{session.category ? (
												<span
													className="text-[0.72rem] font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap"
													style={{ background: `${BRAND}10`, color: BRAND, borderColor: `${BRAND}20` }}
												>
													{session.category.name}
												</span>
											) : (
												<span className="text-xs text-gray-400">—</span>
											)}
										</TableCell>

										{/* Date */}
										<TableCell className="py-3.5">
											<div className="flex items-center gap-1.5 text-sm text-gray-700 whitespace-nowrap">
												<CalendarDays size={12} style={{ color: BRAND }} />
												{formatDate(session.sessionDate)}
											</div>
										</TableCell>

										{/* Time */}
										<TableCell className="py-3.5">
											<div className="flex items-center gap-1.5 text-sm text-gray-700 whitespace-nowrap">
												<Clock size={12} style={{ color: BRAND }} />
												{formatTime(session.slotFrom)} – {formatTime(session.slotTo)}
											</div>
										</TableCell>

										{/* Day */}
										<TableCell className="py-3.5">
											<span className="text-sm text-gray-600 font-medium">
												{session.availability.dayOfWeek.charAt(0) +
													session.availability.dayOfWeek.slice(1).toLowerCase()}
											</span>
										</TableCell>

										{/* Status */}
										<TableCell className="py-3.5">
											<span
												className={`inline-flex items-center gap-1.5 text-[0.72rem] font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${status.className}`}
											>
												<StatusIcon size={10} />
												{status.label}
											</span>
										</TableCell>

										{/* Actions */}
										<TableCell className="py-3.5 pr-5 text-right">
											{session.status === "CONFIRMED" && new Date(session.sessionDate) < new Date() ? (
												<button
													onClick={() => handleComplete(session.id)}
													disabled={completingId === session.id}
													className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
													style={{ background: completingId === session.id ? "#16a34a99" : "#16a34a" }}
												>
													{completingId === session.id ? (
														<Loader2 size={12} className="animate-spin" />
													) : (
														<CheckCircle2 size={12} />
													)}
													{completingId === session.id ? "Completing..." : "Complete"}
												</button>
											) : session.status === "CONFIRMED" ? (
												<span className="inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-semibold text-gray-400 border-gray-200 bg-gray-50 whitespace-nowrap">
													Upcoming
												</span>
											) : (
												<span className="inline-block h-7" />
											)}
										</TableCell>
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-gray-50/50">
						<p className="text-xs text-gray-500">
							Showing <span className="font-semibold text-gray-800">{(page - 1) * PER_PAGE + 1}</span>–
							<span className="font-semibold text-gray-800">{Math.min(page * PER_PAGE, filtered.length)}</span> of{" "}
							<span className="font-semibold text-gray-800">{filtered.length}</span>
						</p>

						<div className="flex items-center gap-1">
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								disabled={page === 1}
								onClick={() => setPage((p) => p - 1)}
							>
								<ChevronLeft size={15} />
							</Button>

							{Array.from({ length: totalPages }, (_, i) => i + 1)
								.filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
								.reduce<(number | "...")[]>((acc, p, idx, arr) => {
									if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
									acc.push(p);
									return acc;
								}, [])
								.map((p, i) =>
									p === "..." ? (
										<span key={`ellipsis-${i}`} className="px-2 text-xs text-gray-400">
											...
										</span>
									) : (
										<button
											key={p}
											onClick={() => setPage(p as number)}
											className="h-8 w-8 rounded-lg text-xs font-semibold transition-all"
											style={page === p ? { background: BRAND, color: "#fff" } : { color: "#6b7280" }}
										>
											{p}
										</button>
									),
								)}

							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								disabled={page === totalPages}
								onClick={() => setPage((p) => p + 1)}
							>
								<ChevronRight size={15} />
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
