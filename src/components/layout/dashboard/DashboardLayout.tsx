"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { Role } from "./nav-config";

interface DashboardLayoutProps {
	children: ReactNode;
	user: {
		name: string;
		email: string;
		role: Role;
		avatar?: string;
	};
	onLogout?: () => void;
}

export default function DashboardLayout({ children, user, onLogout }: DashboardLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden bg-background">
			<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} />
			<div className="flex flex-col flex-1 overflow-hidden">
				<Topbar onMenuClick={() => setSidebarOpen(true)} user={user} onLogout={onLogout} />
				<main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
			</div>
		</div>
	);
}
