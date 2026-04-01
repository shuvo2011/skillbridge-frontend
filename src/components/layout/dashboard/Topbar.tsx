"use client";

import { Menu, Bell, ChevronDown, Users, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Role } from "./nav-config";
import Link from "next/link";

interface TopbarProps {
	onMenuClick: () => void;
	user: {
		name: string;
		email: string;
		role: Role;
		avatar?: string;
	};
	onLogout?: () => void;
}

export default function Topbar({ onMenuClick, user, onLogout }: TopbarProps) {
	return (
		<header className="h-16 border-b border-border bg-white flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-20">
			{/* Mobile menu toggle */}
			<button onClick={onMenuClick} className="lg:hidden text-brand-slate hover:text-brand-navy">
				<Menu className="w-5 h-5" />
			</button>

			{/* Welcome message */}
			<div className="flex-1">
				<h1 className="text-sm font-semibold text-brand-navy hidden sm:block">
					Welcome back, {user.name.split(" ")[0]} 👋
				</h1>
			</div>

			{/* Right side */}
			<div className="flex items-center gap-2">
				{/* Notifications */}
				{/* <Button variant="ghost" size="icon" className="relative text-brand-slate hover:text-brand-navy">
					<Bell className="w-4 h-4" />
					<span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-violet" />
				</Button> */}

				{/* User dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-brand-peach transition-colors outline-none">
							<Avatar className="w-7 h-7">
								<AvatarImage src={user.avatar} />
								<AvatarFallback className="bg-brand-violet text-white text-[10px] font-bold">
									{user.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div className="hidden sm:flex flex-col items-start">
								<span className="text-xs font-semibold text-brand-navy leading-none">{user.name}</span>
								<span className="text-[10px] text-brand-slate leading-none mt-0.5 capitalize">{user.role}</span>
							</div>
							<ChevronDown className="w-3.5 h-3.5 text-brand-slate hidden sm:block" />
						</button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end" className="w-52">
						<div className="px-3 py-2">
							<p className="text-sm font-semibold text-brand-navy">{user.name}</p>
							<p className="text-xs text-brand-slate">{user.email}</p>
							<Badge className="mt-1.5 text-[10px] bg-brand-violet/10 text-brand-violet border-0 capitalize">
								{user.role}
							</Badge>
						</div>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-sm cursor-pointer" asChild>
							<Link
								href={
									user.role === "admin" ? "/admin" : user.role === "tutor" ? "/tutor/profile" : "/dashboard/profile"
								}
							>
								<Users className="w-4 h-4" /> Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="gap-2 text-sm cursor-pointer">
							<Settings className="w-4 h-4" /> Settings
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={onLogout}
							className="gap-2 text-sm text-red-500 focus:text-red-500 cursor-pointer"
						>
							<LogOut className="w-4 h-4" /> Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
