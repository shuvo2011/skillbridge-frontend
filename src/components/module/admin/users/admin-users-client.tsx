// components/module/admin/users/admin-users-client.tsx
"use client";

import { useState } from "react";
import { Search, X, Shield, ShieldOff, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { updateUserStatusAction } from "@/actions/admin.action";
import Swal from "sweetalert2";

const BRAND = "#210095";
const PER_PAGE = 10;

type User = {
	id: string;
	name: string;
	email: string;
	role: string;
	banned: boolean;
	banReason?: string | null;
	emailVerified: boolean;
	createdAt: string;
	image?: string | null;
};

const ROLE_FILTERS = ["All", "STUDENT", "TUTOR"] as const;

const formatDate = (dateStr: string) =>
	new Date(dateStr).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

const initials = (name: string) =>
	name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

export function AdminUsersClient({ users: initialUsers }: { users: User[] }) {
	const [users, setUsers] = useState(initialUsers);
	const [search, setSearch] = useState("");
	const [roleFilter, setRoleFilter] = useState<(typeof ROLE_FILTERS)[number]>("All");
	const [page, setPage] = useState(1);
	const [loadingId, setLoadingId] = useState<string | null>(null);

	const filtered = users.filter((u) => {
		const q = search.toLowerCase();
		const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
		const matchRole = roleFilter === "All" || u.role === roleFilter;
		return matchSearch && matchRole;
	});

	const totalPages = Math.ceil(filtered.length / PER_PAGE);
	const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
	const hasActive = !!search || roleFilter !== "All";

	const handleSearch = (val: string) => {
		setSearch(val);
		setPage(1);
	};
	const handleRoleFilter = (val: typeof roleFilter) => {
		setRoleFilter(val);
		setPage(1);
	};

	const handleBanToggle = async (user: User) => {
		if (!user.banned) {
			// Ban করার সময় reason নাও
			const { value: banReason, isConfirmed } = await Swal.fire({
				title: `Ban ${user.name}?`,
				input: "text",
				inputLabel: "Reason (optional)",
				inputPlaceholder: "Enter ban reason...",
				showCancelButton: true,
				confirmButtonColor: "#ef4444",
				cancelButtonColor: "#6b7280",
				confirmButtonText: "Ban User",
			});

			if (!isConfirmed) return;

			setLoadingId(user.id);
			const res = await updateUserStatusAction(user.id, true, banReason || undefined);
			setLoadingId(null);

			if (res.error) {
				toast.error(res.error.message);
				return;
			}
			setUsers((prev) =>
				prev.map((u) => (u.id === user.id ? { ...u, banned: true, banReason: banReason || null } : u)),
			);
			toast.success(`${user.name} has been banned`);
		} else {
			// Unban
			const result = await Swal.fire({
				title: `Unban ${user.name}?`,
				text: "This user will be able to access the platform again.",
				icon: "question",
				showCancelButton: true,
				confirmButtonColor: "#210095",
				cancelButtonColor: "#6b7280",
				confirmButtonText: "Yes, unban",
			});

			if (!result.isConfirmed) return;

			setLoadingId(user.id);
			const res = await updateUserStatusAction(user.id, false);
			setLoadingId(null);

			if (res.error) {
				toast.error(res.error.message);
				return;
			}
			setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, banned: false, banReason: null } : u)));
			toast.success(`${user.name} has been unbanned`);
		}
	};

	return (
		<div className="space-y-5">
			{/* Header */}
			<div>
				<h1 className="text-xl font-bold text-gray-900">Users</h1>
				<p className="text-sm text-gray-500 mt-0.5">
					{users.length} user{users.length !== 1 ? "s" : ""} total
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
							placeholder="Search by name or email..."
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

					{/* Role filter */}
					<div className="flex gap-1.5 flex-wrap items-center">
						{ROLE_FILTERS.map((r) => (
							<button
								key={r}
								onClick={() => handleRoleFilter(r)}
								className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap"
								style={
									roleFilter === r
										? { background: BRAND, color: "#fff", borderColor: BRAND }
										: { background: "#fff", color: "#6b7280", borderColor: "#e5e7eb" }
								}
							>
								{r === "All" ? "All" : r.charAt(0) + r.slice(1).toLowerCase()}
							</button>
						))}
						{hasActive && (
							<button
								onClick={() => {
									handleSearch("");
									handleRoleFilter("All");
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
							<TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-5">User</TableHead>
							<TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</TableHead>
							<TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</TableHead>
							<TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Joined</TableHead>
							<TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide pr-5 text-right">
								Action
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginated.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} className="py-16 text-center">
									<p className="text-sm text-gray-400">No users found</p>
								</TableCell>
							</TableRow>
						) : (
							paginated.map((user) => (
								<TableRow key={user.id} className="hover:bg-gray-50/60 transition-colors">
									{/* User */}
									<TableCell className="pl-5 py-3.5">
										<div className="flex items-center gap-2.5">
											{user.image ? (
												<img src={user.image} alt={user.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
											) : (
												<div
													className="w-8 h-8 rounded-lg flex items-center justify-center text-[0.68rem] font-bold shrink-0"
													style={{ background: `${BRAND}12`, color: BRAND }}
												>
													{initials(user.name)}
												</div>
											)}
											<div className="min-w-0">
												<p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
												<p className="text-[0.72rem] text-gray-400 truncate">{user.email}</p>
												{user.banned && user.banReason && (
													<p className="text-[0.68rem] text-red-400 truncate">Reason: {user.banReason}</p>
												)}
											</div>
										</div>
									</TableCell>

									{/* Role */}
									<TableCell className="py-3.5">
										<Badge
											variant="outline"
											className={
												user.role === "TUTOR"
													? "bg-blue-50 text-blue-700 border-blue-200 text-xs"
													: "bg-green-50 text-green-700 border-green-200 text-xs"
											}
										>
											{user.role.charAt(0) + user.role.slice(1).toLowerCase()}
										</Badge>
									</TableCell>

									{/* Status */}
									<TableCell className="py-3.5">
										{user.banned ? (
											<Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs">
												Banned
											</Badge>
										) : (
											<Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
												Active
											</Badge>
										)}
									</TableCell>

									{/* Joined */}
									<TableCell className="py-3.5">
										<span className="text-sm text-gray-600">{formatDate(user.createdAt)}</span>
									</TableCell>

									{/* Action */}
									<TableCell className="py-3.5 pr-5 text-right">
										<button
											onClick={() => handleBanToggle(user)}
											disabled={loadingId === user.id}
											className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
											style={
												user.banned
													? { background: "#f0fdf4", color: "#15803d", borderColor: "#bbf7d0" }
													: { background: "#fef2f2", color: "#dc2626", borderColor: "#fecaca" }
											}
										>
											{loadingId === user.id ? (
												<Loader2 size={12} className="animate-spin" />
											) : user.banned ? (
												<ShieldOff size={12} />
											) : (
												<Shield size={12} />
											)}
											{loadingId === user.id ? "Processing..." : user.banned ? "Unban" : "Ban"}
										</button>
									</TableCell>
								</TableRow>
							))
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
										<span key={`e-${i}`} className="px-2 text-xs text-gray-400">
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
