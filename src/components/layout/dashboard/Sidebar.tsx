"use client";

import { useState } from "react";
import { X, GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navConfig, type Role } from "./nav-config";
import Link from "next/link";

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
	user: {
		name: string;
		email: string;
		role: Role;
		avatar?: string;
	};
}

export default function Sidebar({ isOpen, onClose, user }: SidebarProps) {
	const links = navConfig[user.role];
	const [active, setActive] = useState(links[0].href);

	return (
		<>
			{/* Mobile overlay */}
			{isOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />}

			<aside
				className={`
          fixed top-0 left-0 h-full w-64 z-40 flex flex-col
          bg-brand-midnight text-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
			>
				{/* Logo */}
				<Link href="/">
					<div className="flex items-center gap-2.5 px-6 py-5 border-b border-white/10">
						<div className="w-8 h-8 rounded-lg bg-brand-violet flex items-center justify-center">
							<GraduationCap className="w-4 h-4 text-white" />
						</div>
						<span className="text-lg font-extrabold tracking-tight">SkillBridge</span>
						<button onClick={onClose} className="ml-auto lg:hidden text-white/50 hover:text-white">
							<X className="w-5 h-5" />
						</button>
					</div>
				</Link>

				{/* Role badge */}
				<div className="px-6 py-3">
					<span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{user.role} Panel</span>
				</div>

				{/* Nav links */}
				<nav className="flex-1 px-3 pb-4 flex flex-col gap-1">
					{links.map((item) => {
						const Icon = item.icon;
						const isActive = active === item.href;
						return (
							<button
								key={item.href}
								onClick={() => setActive(item.href)}
								className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-150 text-left
                  ${
										isActive
											? "bg-brand-violet text-white shadow-lg shadow-brand-violet/30"
											: "text-white/60 hover:text-white hover:bg-white/8"
									}
                `}
							>
								<Icon className="w-4 h-4 shrink-0" />
								<span className="flex-1">{item.label}</span>
								{item.badge && (
									<span
										className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
											isActive ? "bg-white/20 text-white" : "bg-brand-violet/30 text-brand-violet"
										}`}
									>
										{item.badge}
									</span>
								)}
							</button>
						);
					})}
				</nav>

				{/* Bottom user card */}
				<div className="px-3 py-4 border-t border-white/10">
					<div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5">
						<Avatar className="w-8 h-8">
							<AvatarImage src={user.avatar} />
							<AvatarFallback className="bg-brand-violet text-white text-xs font-bold">
								{user.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0">
							<p className="text-xs font-semibold text-white truncate">{user.name}</p>
							<p className="text-[10px] text-white/40 truncate">{user.email}</p>
						</div>
					</div>
				</div>
			</aside>
		</>
	);
}
