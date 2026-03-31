// components/layout/navbar-user-menu.tsx
"use client";

import { LayoutDashboard, LogOut, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const BRAND = "#210095";

type UserMenuProps = {
	user: { name: string; email: string; role: string; image?: string | null }; // ← image add
	dashboardHref: string;
};

const initials = (name: string) =>
	name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

export function NavbarUserMenu({ user, dashboardHref }: UserMenuProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	const handleLogout = async () => {
		await authClient.signOut();
		toast.success("Logged out successfully");
		router.push("/");
		router.refresh();
	};

	return (
		<div ref={ref} className="relative hidden sm:block">
			<button
				onClick={() => setOpen((p) => !p)}
				className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-black/5 transition-colors"
			>
				{/* Avatar */}
				<div
					className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm"
					style={{ background: BRAND }}
				>
					{user.image ? (
						<img src={user.image} alt={user.name} className="w-full h-full object-cover" />
					) : (
						initials(user.name)
					)}
				</div>

				{/* Name + role */}
				<div className="flex flex-col items-start leading-tight">
					<span className="text-sm font-semibold text-gray-800">{user.name}</span>
					<span className="text-[0.65rem] text-gray-400 capitalize">{user.role.toLowerCase()}</span>
				</div>

				<ChevronDown
					size={14}
					className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
				/>
			</button>

			{/* Dropdown */}
			{open && (
				<div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50 overflow-hidden">
					{/* User info */}
					<div className="px-4 py-2.5 border-b border-gray-50">
						<p className="text-xs font-semibold text-gray-800 truncate">{user.name}</p>
						<p className="text-[0.7rem] text-gray-400 truncate">{user.email}</p>
					</div>

					{/* Menu items */}
					<div className="py-1">
						<Link
							href={dashboardHref}
							onClick={() => setOpen(false)}
							className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
						>
							<LayoutDashboard size={14} style={{ color: BRAND }} />
							Dashboard
						</Link>
						<Link
							href={user.role === "TUTOR" ? "/tutor/profile" : user.role === "ADMIN" ? "/admin" : "/dashboard/profile"}
							onClick={() => setOpen(false)}
							className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
						>
							<User size={14} style={{ color: BRAND }} />
							My Profile
						</Link>
					</div>

					{/* Logout */}
					<div className="border-t border-gray-50 pt-1">
						<button
							onClick={handleLogout}
							className="flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors w-full"
						>
							<LogOut size={14} />
							Logout
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
